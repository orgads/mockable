import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: true,
	entry: ['index.ts'],
	format: ['esm', 'cjs'],
	splitting: false,
});
