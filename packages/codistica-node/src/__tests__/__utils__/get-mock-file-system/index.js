import {readFileSync, statSync} from 'fs';
import {resolve, join} from 'path';
import {Volume, createFsFromVolume} from 'memfs';
import {scanSync} from '../../../modules/file-utils/internals/scan-sync.js';

const realFileSystemPath = resolve(__dirname, './files');
const mockBasePath = join(process.cwd(), 'mock-root');

const hiddenFiles = {
    '.hidden-file': '# THIS IS A MOCK FILE',
    'dir-a/.another-hidden-file': '# THIS IS A MOCK FILE',
    'dir-b/.another-hidden-file': '# THIS IS A MOCK FILE'
};

/**
 * @description Generates a new volume object.
 * @returns {*} Volume object.
 */
function getVolumeObject() {
    const output = {};

    scanSync(realFileSystemPath).forEach((currentPath) => {
        if (statSync(currentPath).isFile()) {
            const mockRelativePath = currentPath.replace(
                realFileSystemPath,
                ''
            );
            const mockPath = join(mockBasePath, mockRelativePath);
            output[mockPath] = readFileSync(currentPath, 'utf8');
        }
    });

    for (const mockRelativePath in hiddenFiles) {
        if (!Object.hasOwnProperty.call(hiddenFiles, mockRelativePath)) {
            continue;
        }
        const mockPath = join(mockBasePath, mockRelativePath);
        output[mockPath] = hiddenFiles[mockRelativePath];
    }

    return output;
}

/**
 * @description Generates a new mock file system.
 * @param {boolean} [addRandomDelay=false] - Apply random delay to some async methods.
 * @returns {Object<string,*>} Mock file system.
 */
function getMockFileSystem(addRandomDelay = false) {
    const volumeObject = getVolumeObject();
    const vol = Volume.fromJSON(volumeObject);
    const _fs = createFsFromVolume(vol);

    const {unlink: _unlink, rmdir: _rmdir, ...fs} = _fs;

    /**
     * @description Reset mock file system.
     * @returns {void} Void.
     */
    fs.reset = function reset() {
        vol.reset();
        vol.fromJSON(volumeObject);
    };

    /**
     * @description A HOF to simulate FS delay.
     * @param {function(...*): *} fn - Inner function.
     * @returns {function(...*): *} - Wrapped function.
     */
    const withRandomDelay = function withRandomDelay(fn) {
        return (...args) => {
            setTimeout(() => {
                fn(...args);
            }, 10 * Math.random());
        };
    };

    if (addRandomDelay) {
        fs.unlink = withRandomDelay(_unlink);
        fs.rmdir = withRandomDelay(_rmdir);
    } else {
        fs.unlink = _unlink;
        fs.rmdir = _rmdir;
    }

    return fs;
}

export {getMockFileSystem};
