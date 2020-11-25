/** @flow */

import React from 'react';
import {SvgIcon} from '../utils/svg-icon/svg-icon.js';

type DefaultProps = {|
    title: string,
    size: string | number | null,
    color: string | null,
    backgroundColor: string | null
|};

type Props = {
    ...DefaultProps
};

function HTML(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={'M256 78.5h165v355H256zM91 78.5h165v355H91z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={'M91 78.5h165v355H91z'}
                opacity={'.1'}
                fill={color || '#000000'}
            />
            <g>
                <path
                    d={
                        'M30.27 0l41.09 460.82L255.72 512l184.88-51.25L481.73 0zm366.45 111.16l-2.58 28.65-1.14 12.7H175.92l5.18 57.87h206.74l-1.39 15.17-13.33 148.77-.85 9.55-116.1 32.05-.26.08-116.2-32.13-7.95-88.73h56.94l4.04 45.07 63.18 17 .05-.02 63.27-17.02 6.59-73.29h-196.6l-13.95-155.72L113.92 96h284.16z'
                    }
                    fill={color || '#e44f26'}
                />
                <g fill={color || '#f1662a'}>
                    <path d={'M325.83 266.88H256v90.29l63.24-17 6.59-73.29z'} />
                    <path
                        d={
                            'M256 37.68V96h142.08l-1.36 15.16-2.58 28.65-1.14 12.7H256v57.87h131.84l-1.39 15.17-13.33 148.77-.85 9.55L256 415.96v56.86l149.39-41.41 35.15-393.73H256z'
                        }
                    />
                </g>
            </g>
        </SvgIcon>
    );
}

HTML.defaultProps = ({
    title: 'HTMLIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {HTML};
