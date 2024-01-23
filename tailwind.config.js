/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				black: {
					100: '#121212',
					200: '#181818',
					300: '#404040'
				}
			}
		}
	},
	plugins: []
};
