function getPayloadsData(source) {
    const output = [];
    for (const name in source.files) {
        if (!Object.hasOwnProperty.call(source.files, name)) {
            continue;
        }
        const availability = source.files[name];
        for (let fileNumber = 1; fileNumber <= availability; fileNumber++) {
            const additionalNameBytes = fileNumber.toString().length - 1;
            output.push({
                url: source.base + name + '-' + fileNumber + '.bin',
                payloadLength:
                    parseInt(source.sizes[name].gzip) + additionalNameBytes,
                assetLength:
                    parseInt(source.sizes[name].identity) + additionalNameBytes
            });
        }
    }
    return output;
}

export {getPayloadsData};
