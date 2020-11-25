import {addAttr} from './add-attr.js';

function parseAttr(item, attr) {
    const matchedName = attr.name.match(/^[^=]+/);
    const matchedValue = attr.name.match(/(?<=={).+(?=}$)/);
    const name = matchedName ? matchedName[0] : attr.name;
    const value = matchedValue ? matchedValue[0] : `'${attr.value}'`;
    return {
        ...attr,
        name,
        value,
        changeName(newName) {
            item.removeAttr(attr.name);
            addAttr(item, {
                name: newName,
                value
            });
        },
        changeValue(newValue) {
            item.removeAttr(attr.name);
            addAttr(item, {
                name,
                value: newValue
            });
        }
    };
}

export {parseAttr};
