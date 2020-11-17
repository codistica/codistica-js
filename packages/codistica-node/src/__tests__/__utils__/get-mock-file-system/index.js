import {readFileSync, statSync} from 'fs';
import {resolve, join} from 'path';
import {Volume, createFsFromVolume} from 'memfs';
import {scanSync} from '../../../modules/file-utils/internals/scan-sync.js';

const realFileSystemPath = resolve(__dirname, './files');
const mockBasePath = join(process.cwd(), 'mock-root');
const volumeObject = {};

scanSync(realFileSystemPath).forEach((currentPath) => {
    if (statSync(currentPath).isFile()) {
        const mockRelativePath = currentPath.replace(realFileSystemPath, '');
        const mockPath = join(mockBasePath, mockRelativePath);
        volumeObject[mockPath] = readFileSync(currentPath, 'utf8');
    }
});

/**
 * @description Generates a new mock file system replicating ./files directory structure.
 * @returns {Object<string,*>} Mock file system.
 */
function getMockFileSystem() {
    const vol = Volume.fromJSON(volumeObject);
    const fs = createFsFromVolume(vol);

    fs.reset = function reset() {
        vol.reset();
        vol.fromJSON(volumeObject);
    };

    return fs;
}

export {getMockFileSystem};
