import { build } from 'esbuild';
import { cp, mkdir, readFile, writeFile } from 'fs';
import { createServer as createHttpServer } from 'http';
import { createServer as createLivereloadServer } from 'livereload';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HOTRELOAD_PORT = 35729;
const SERVER_PORT = 8092;

const BUNDLE_NAME = 'bundle.js';
const ENTRYPOINT_NAME = 'index.tsx';
const FAVICON_NAME = 'favicon.jpg';

const ROOT_DIR = join(__dirname, '../');

const ASSET_DIR = join(ROOT_DIR, 'assets');
const DIST_DIR = join(ROOT_DIR, 'dist');
const SRC_DIR = join(ROOT_DIR, 'src');

const ENTRYPOINT_PATH = join(SRC_DIR, ENTRYPOINT_NAME);
const FAVICON_DIST_PATH = join(DIST_DIR, FAVICON_NAME);
const FAVICON_SRC_PATH = join(ASSET_DIR, FAVICON_NAME);
const INDEX_PATH = join(DIST_DIR, 'index.html');

/* eslint-disable no-console */
const Console = {
    error: console.error,
    log: console.log,
    warn: console.warn,
};
/* eslint-enable no-console */

const bundle = () => build({
    bundle: true,
    entryPoints: [
        ENTRYPOINT_PATH
    ],
    outfile: join(DIST_DIR, BUNDLE_NAME),
    sourcemap: 'inline',
    watch: {
        onRebuild: err => {
            if (err) {
                Console.error('WATCH REBUILD FAILED: ', err);
            } else {
                Console.log('WATCH REBUILD SUCCEEDED');
            }
        },
    },
});

const copyAssets = () => new Promise((res, rej) => {
    cp(FAVICON_SRC_PATH, FAVICON_DIST_PATH, err => {
        if (err) {
            Console.error(err);
            rej(err);
            return;
        }
        res();
    });
});

const createDistDir = () => new Promise((res, rej) => {
    mkdir(DIST_DIR, { recursive: true }, err => {
        if (err) {
            Console.error(err);
            rej(err);
            return;
        }
        res();
    });
});

const hotReload = () => {
    const server = createLivereloadServer({
        port: HOTRELOAD_PORT,
    });
    server.watch(DIST_DIR);
};

const serve = () => createHttpServer((req, res) => {
    let reqPath = join(DIST_DIR, req.url);
    if (req.url === '/') {
        reqPath = INDEX_PATH;
    }
    readFile(reqPath, (err,data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(SERVER_PORT);

const writeIndex = () => new Promise((res, rej) => writeFile(INDEX_PATH, `<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
        name="description"
        content="Leyden"
    />
    <title>Leyden</title>
    <link rel="icon" href="/${FAVICON_NAME}">
    <script>
        document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
        ':${HOTRELOAD_PORT}/livereload.js?snipver=1"></' + 'script>')
    </script>
    </head>
    <body style="margin: 0; padding: 0;">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="/${BUNDLE_NAME}"></script>
    </body>
</html>
`, err => {
    if (err) {
        Console.error(err);
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
