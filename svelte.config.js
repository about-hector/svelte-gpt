//default: import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel';
//in case I want to deploy on Deno/node:
//import adapter from 'svelte-adapter-deno';
//import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */

const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter({ runtime: 'edge'}),
		version: {
			// poll for the app version every n ms
			pollInterval: 20000
		},
		alias: {
			ui: './src/components/ui',
			components: './src/components',
			stores: './src/lib/stores.ts'
		}
	}
};

export default config;
