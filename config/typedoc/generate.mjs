import { cp } from 'fs';
import { dirname, join } from 'path';
import rimraf from 'rimraf';
import { Application, TSConfigReader } from 'typedoc';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '../../');

const DOC_BUILD_DIR = join(ROOT_DIR, 'docbuild');
const DOC_DEST_DIR = join(ROOT_DIR, 'docs', 'api');

const PACKAGE_DIR = join(ROOT_DIR, 'packages');
const LEYDEN_INTERFACE_DIR = join(PACKAGE_DIR, 'leyden', 'src', 'interfaces');

const LEYDEN_INTERFACES = [
    'Cell',
    'Coordinates',
];

/* eslint-disable no-console */
const Console = {
    error: console.error,
    log: console.log,
    warn: console.warn,
};
/* eslint-enable no-console */

async function generate() {
    const app = new Application();

    app.options.addReader(new TSConfigReader());

    app.bootstrap({
        entryPoints: LEYDEN_INTERFACES.map(i => (
            join(LEYDEN_INTERFACE_DIR, `${i}.ts`)
        )),
    });

    const project = app.convert();

    if (!project) {
        return;
    }
    await app.generateDocs(project, DOC_BUILD_DIR);
}

async function processGeneratedDocs() {
    await Promise.all(LEYDEN_INTERFACES.map(i => {
        const sourcePath = join(DOC_BUILD_DIR, 'interfaces', `${i}.${i}Interface.md`);
        const destPath = join(DOC_DEST_DIR, 'leyden', `${i}.md`);
        return new Promise((res, rej) => {
            cp(sourcePath, destPath, err => {
                if (err) {
                    Console.error(err);
                    rej(err);
                    return;
                }
                res();
            });
        });
    }));
}

async function cleanBuildDir() {
    rimraf.sync(DOC_BUILD_DIR);
}

async function cleanDestDir() {
    rimraf.sync(DOC_DEST_DIR);
}

async function main() {
    await cleanBuildDir();
    await cleanDestDir();
    await generate();
    await processGeneratedDocs();
    await cleanBuildDir();
}

main().catch(Console.error);
