const esbuild = require('esbuild');
const fs = require('fs');
const http = require('http');
const static = require('node-static');
const path = require('path');

const BUNDLE_NAME = 'bundle.js';
const ENTRYPOINT_NAME = 'index.tsx';
const FAVICON_NAME = 'favicon.jpg';

const ROOT_DIR = path.join(__dirname, '../');

const ASSET_DIR = path.join(ROOT_DIR, 'assets');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SRC_DIR = path.join(ROOT_DIR, 'src');

const ENTRYPOINT_PATH = path.join(SRC_DIR, ENTRYPOINT_NAME);
const FAVICON_DIST_PATH = path.join(DIST_DIR, FAVICON_NAME)
const FAVICON_SRC_PATH = path.join(ASSET_DIR, FAVICON_NAME)

const bundle = () => esbuild.build({
    bundle: true,
    entryPoints: [
        ENTRYPOINT_PATH
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

const copyAssets = () => new Promise((res, rej) => {
    fs.cp(FAVICON_SRC_PATH, FAVICON_DIST_PATH, err => {
        if (err) {
            console.error(err);
            rej(err);
            return;
        }
        res();
    })
});

const serve = () => http.createServer((req, res) => {
    const distDir = new(static.Server)(DIST_DIR);
    distDir.serve(req, res);
}).listen(8081);

const writeIndex = () => new Promise((res, rej) => fs.writeFile(
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
    <link rel="icon" href="/${FAVICON_NAME}">
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

(async () => {
    await Promise.all([
        bundle(),
        copyAssets(),
        serve(),
        writeIndex(),
    ]);
})();
