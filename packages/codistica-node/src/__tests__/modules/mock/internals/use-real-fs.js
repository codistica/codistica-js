import {resolve} from 'path';
import {getJSONSync} from '../../../../modules/file-utils/internals/get-json-sync.js';

const {content} = getJSONSync(resolve(__dirname, './data.json'));

export {content};
