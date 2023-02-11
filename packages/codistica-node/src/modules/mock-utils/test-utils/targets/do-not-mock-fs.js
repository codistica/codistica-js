import {resolve} from 'path';
import {getJSONSync} from '../../../file-utils/internals/get-json-sync.js';

const {content} = getJSONSync(resolve(__dirname, '../data/data.json'));

export {content};
