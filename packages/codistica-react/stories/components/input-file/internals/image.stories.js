/** @flow */

import React, {useEffect, useState} from 'react';
import {InputFile} from '../../../../src/index.js';

function Image() {
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        setPreviewImage(null);
    }, []);

    return (
        <InputFile
            name={'image'}
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

export {Image};
