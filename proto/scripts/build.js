const esbuild = require('esbuild');
const fs = require('fs');
const http = require('http');
const livereload = require('livereload');
const path = require('path');

const HOTRELOAD_PORT = 35729;
const SERVER_PORT = 8081;

const BUNDLE_NAME = 'bundle.js';
const ENTRYPOINT_NAME = 'index.tsx';
const FAVICON_NAME = 'favicon.jpg';

const ROOT_DIR = path.join(__dirname, '../');

const ASSET_DIR = path.join(ROOT_DIR, 'assets');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SRC_DIR = path.join(ROOT_DIR, 'src');

const ENTRYPOINT_PATH = path.join(SRC_DIR, ENTRYPOINT_NAME);
const FAVICON_DIST_PATH = path.join(DIST_DIR, FAVICON_NAME);
const FAVICON_SRC_PATH = path.join(ASSET_DIR, FAVICON_NAME);
const INDEX_PATH = path.join(DIST_DIR, `index.html`);

const bundle = () => esbuild.build({
    bundle: true,
    entryPoints: [
        ENTRYPOINT_PATH
    ],
    outfile: path.join(DIST_DIR, BUNDLE_NAME),
    watch: {
        onRebuild: err => {
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

const createDistDir = () => new Promise((res, rej) => {
    fs.mkdir(DIST_DIR, { recursive: true }, err => {
        if (err) {
            console.error(err);
            rej(err);
            return;
        }
        res();
    })
});

const hotReload = () => {
    const server = livereload.createServer({
        port: HOTRELOAD_PORT,
    });
    server.watch(DIST_DIR);
};

const serve = () => http.createServer((req, res) => {
    let reqPath = path.join(DIST_DIR, req.url);
    if (req.url === '/') {
        reqPath = INDEX_PATH;
    }
    fs.readFile(reqPath, (err,data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(SERVER_PORT);

const writeIndex = () => new Promise((res, rej) => fs.writeFile(INDEX_PATH, `<!DOCTYPE html>
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
    <script>
        document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
        ':${HOTRELOAD_PORT}/livereload.js?snipver=1"></' + 'script>')
    </script>
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
    await createDistDir();
    await Promise.all([
        bundle(),
        copyAssets(),
        hotReload(),
        serve(),
        writeIndex(),
    ]);
})();
