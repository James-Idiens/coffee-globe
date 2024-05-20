/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting(), viteCommonjs()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js']
	},
	ssr: { noExternal: ['globe.gl'] }
});
