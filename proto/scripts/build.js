const esbuild = require('esbuild');
const fs = require('fs');
const http = require('http');
const static = require('node-static');
const path = require('path');

const BUNDLE_NAME = 'bundle.js';
const DIST_DIR = path.join(__dirname, '../', 'dist');

const build = () => esbuild.build({
    bundle: true,
    entryPoints: [
        path.join(__dirname, '../', 'src', 'index.tsx')
    ],
    outfile: path.join(DIST_DIR, BUNDLE_NAME),
    watch: {
        onRebuild: (err, res) => {
            if (err) {
                console.error('WATCH REBUILD FAILED: ', err);
            } else {
                console.log('WATCH REBUILD SUCCEEDED');
            }
        },
    },
});

const copyIndex = () => new Promise((res, rej) => fs.writeFile(
    path.join(__dirname, '../', 'dist', `index.html`), `<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
        name="description"
        content="datum"
    />
    <title>datum</title>
    </head>
    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="/${BUNDLE_NAME}"></script>
    </body>
</html>
`, err => {
    if (err) {
        console.error(err);
        rej(err);
        return;
    }
    res();
}));

const serve = () => http.createServer((req, res) => {
    const distDir = new(static.Server)(DIST_DIR);
    distDir.serve(req, res);
}).listen(8081);

(async () => {
    await Promise.all([
        build(),
        copyIndex(),
        serve(),
    ]);
})();
