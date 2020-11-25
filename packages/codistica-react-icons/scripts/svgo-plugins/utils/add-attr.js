// SEE https://github.com/svg/svgo/pull/546 FOR ADDING VALUELESS ATTRIBUTES.

function addAttr(item, attr) {
    const {name, value, ...other} = attr;
    const newAttr = `${name}={${value}}`;
    item.addAttr({
        ...other,
        name: newAttr,
        local: newAttr,
        prefix: ''
    });
}

export {addAttr};
