// const path = require('path');
// const esbuild = require('esbuild');

// const buildOptions = {
//   entryPoints: ["app/javascript/*.*"],
//   bundle: true,
//   sourcemap: true,
//   format: 'esm',
//   outdir: path.join(process.cwd(), "app/assets/builds"),
//   publicPath: '/assets',
//   watch: {
//     onRebuild(error, result) {
//       if (error) console.error('watch build failed:', error)
//       else { 
//         console.log('watch build succeeded:', result)
//         // HERE: somehow restart the server from here, e.g., by sending a signal that you trap and react to inside the server.
//       }
//     },
//   },
//   loader: {
//     '.js': 'jsx',
//     '.png': 'file',
//     '.svg': 'file',
//     '.jpeg': 'file',
//   }
// };

//   esbuild.build(buildOptions).catch(() => process.exit(1));

//  // "build": "esbuild app/javascript/*.* --bundle --sourcemap --format=esm --outdir=app/assets/builds --public-path=/assets",