import sveltePreprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-static"
import path from "path"
import { readdirSync } from "fs"

/**
 * Lists urls of all static routes in `path`.
 *
 * @param {string} p - The path to search
 *
 * @returns {string[]}
 */
function listRoutesIn(p) {
	const routesPath = path.join("./src/routes/", p)
	const dir = readdirSync(routesPath, { withFileTypes: true })

	const filenames = dir
		.filter(({ isFile, name }) => isFile && !name.startsWith("_"))
		.map((dirent) => dirent.name)

	if (filenames.length === 0) {
		throw new Error(`listRoutesIn: No static routes found in '${p}'`)
	}

	const routes = filenames.map((filename) => {
		const name = path.parse(filename).name
		return path.join("/", p, name)
	})

	return routes
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// an array of file extensions that should be treated as Svelte components
	extensions: [".svelte"],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: false
		}),
		paths: {
			base: '/type-kana'
		},
		prerender: {
			enabled: true,
			default: true,
			entries: ["*", ...listRoutesIn("/icon/")]
		},
		alias: {
			$: "src"
		}
	},

	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	preprocess: sveltePreprocess({ postcss: true, typescript: true })
}

export default config
