import { fileURLToPath, URL } from 'url';

import {
	defineConfig,
	loadConfigFromFile,
	mergeConfig,
	type UserConfigExport
} from 'vite';

// https://vitejs.dev/config/
export default defineConfig(async configEnv => {
	const baseConfig = (
		await loadConfigFromFile(configEnv, '../../vite.config.ts')
	)?.config;

	const config: UserConfigExport = {
		server: {
			port: 9090
		},
		base: '/vite-app/',
		build: {
			rollupOptions: {
				input: 'src/main.ts',
				preserveEntrySignatures: 'strict',
				output: {
					entryFileNames: 'index.js',
					format: 'systemjs',
					inlineDynamicImports: true,
					globals: {
						vue: 'Vue',
						'single-spa-vue': 'singleSpaVue'
					}
				},
				external: [
					'vue',
					'single-spa-vue'
				]
			}
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
	};

	return mergeConfig(baseConfig ?? {}, config);
});
