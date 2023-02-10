import {
	defineConfig,
	loadConfigFromFile,
	mergeConfig,
	PluginOption,
	type UserConfigExport
} from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig(async configEnv => {
	const baseConfig = (
		await loadConfigFromFile(configEnv, '../../vite.config.ts')
	)?.config;

	const config: UserConfigExport = {
		base: './',
		build: {
			rollupOptions: {
				input: {
					index: './index.html',
					'root-config': './src/root-config.ts'
				},
				output: {
					format: 'system',
					entryFileNames: '[name].js',
					assetFileNames: 'assets/[name].[ext]',
					globals: {
						'single-spa': 'singleSpa',
						'single-spa-layout': 'singleSpaLayout'
					}
				},
				preserveEntrySignatures: 'strict',
				external: ['single-spa', 'single-spa-layout']
			}
		},
		plugins: [
			handlebars({
				context: {
					isLocal: configEnv.mode === 'development'
				}
			}) as PluginOption
		]
	};

	return mergeConfig(baseConfig ?? {}, config);
});
