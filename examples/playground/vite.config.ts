import { defineConfig } from "vite";

// biome-ignore lint/nursery/noDefaultExport: <explanation>
export default defineConfig({
	resolve: {
		alias: {
			chibivue: `${process.cwd()}/../../packages/chibivue`,
		},
	},
});
