import {getJSONSync} from '../../../file-utils/internals/get-json-sync.js';

const {content} = getJSONSync('./mock-root/data.json');

export {content};
