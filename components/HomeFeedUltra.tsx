11:26:23.925 Running build in Washington, D.C., USA (East) – iad1
11:26:23.926 Build machine configuration: 2 cores, 8 GB
11:26:25.441 Cloning github.com/dedonopradonodedelivery-cloud/Novoagora (Branch: main, Commit: 1dff3ea)
11:26:26.500 Cloning completed: 1.059s
11:26:26.764 Restored build cache from previous deployment (Ab2vyPZCusuYXxt9RMV2MU4zh5A6)
11:26:27.273 Running "vercel build"
11:26:27.677 Vercel CLI 48.12.1
11:26:28.332 Installing dependencies...
11:26:32.569 
11:26:32.570 up to date in 4s
11:26:32.570 
11:26:32.571 28 packages are looking for funding
11:26:32.571   run `npm fund` for details
11:26:32.605 Running "npm run build"
11:26:32.718 
11:26:32.718 > 74-of-localizei-freguesia@0.0.0 build
11:26:32.719 > vite build
11:26:32.720 
11:26:34.731 [36mvite v6.4.1 [32mbuilding for production...[36m[39m
11:26:34.821 transforming...
11:26:36.348 [32m✓[39m 1066 modules transformed.
11:26:36.352 [31m✗[39m Build failed in 1.58s
11:26:36.353 [31merror during build:
11:26:36.353 [31mCould not resolve "./home/sections/NowHappeningSection" from "components/HomeFeedUltra.tsx"[31m
11:26:36.353 file: [36m/vercel/path0/components/HomeFeedUltra.tsx[31m
11:26:36.354     at getRollupError (file:///vercel/path0/node_modules/rollup/dist/es/shared/parseAst.js:401:41)
11:26:36.354     at error (file:///vercel/path0/node_modules/rollup/dist/es/shared/parseAst.js:397:42)
11:26:36.354     at ModuleLoader.handleInvalidResolvedId (file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:21590:24)
11:26:36.354     at ModuleLoader.resolveDynamicImport (file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:21650:58)
11:26:36.354     at async file:///vercel/path0/node_modules/rollup/dist/es/shared/node-entry.js:21534:32[39m
11:26:36.391 Error: Command "npm run build" exited with 1
