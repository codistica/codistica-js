/** @flow */

import React, {useEffect, useState} from 'react';
import {InputFile} from '../../../src/index.js';

/**
 * @description A custom input for images.
 * @returns {Object<string,*>} React component.
 */
function InputFileImage() {
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        setPreviewImage(null);
    }, []);

    return (
        <InputFile
            name={'file-image'}
            accept={'image/*'}
            style={{height: '180px', width: '400px'}}
            onChange={(e) => {
                setPreviewImage(
                    e.target.files.length
                        ? URL.createObjectURL(e.target.files[0])
                        : null
                );
            }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}>
                <img
                    src={previewImage}
                    alt={'UNAVAILABLE'}
                    style={{width: '90%', height: '90%'}}
                />
            </div>
        </InputFile>
    );
}

export {InputFileImage};

export default {
    title: 'Input File'
};
