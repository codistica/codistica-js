import {parseAttr} from './utils/parse-attr.js';

const xlinkHrefPlugin = {
    xlinkHrefPlugin: {
        type: 'perItem',
        description: 'Replaces deprecated xlink:href attribute with href.',
        params: {},
        fn: function fn(item) {
            item.eachAttr((attr) => {
                const {name, changeName} = parseAttr(item, attr);
                if (name === 'xlink:href') {
                    changeName('href');
                }
            });
        }
    }
};

export {xlinkHrefPlugin};
