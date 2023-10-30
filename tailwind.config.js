/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
            colors: {
                border: "hsl(var(--border))",
            }
        }
	},
	plugins: [require('@tailwindcss/typography')]
};
