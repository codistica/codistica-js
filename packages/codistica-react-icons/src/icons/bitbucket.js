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

function Bitbucket(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={'M152.5 152.5h207v207h-207z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M504.45 26.82c-2.04-.1-4.09-.04-6.13-.04H256.19v-.12H13.45c-2.25 0-4.5-.03-6.74.08-5.1.25-7.45 2.75-6.5 8 1.08 6.03 2.08 12.08 3.07 18.12l36.35 221.2q16.08 97.6 32.24 195.2c2.27 13.83 4.64 16.02 18.73 16.02h172.86q83.06 0 166.12.06c5.65.01 9.35-1.32 10.36-7.64q12.86-80.13 25.96-160.22Q484 206.25 502.13 95.02q4.82-29.62 9.6-59.25c1.03-6.46-.77-8.64-7.28-8.95zM326.82 214.48c-5.95 34.87-12.03 69.72-17.94 104.6-1.62 9.59-1.43 9.64-11 9.64-27.12 0-54.25-.24-81.38.17-7.18.1-9.7-2.05-11-9.24-8.03-44.1-16.68-88.08-25.1-132.11a40.58 40.58 0 01-.3-4.43h151.8c-1.73 10.74-3.31 21.07-5.08 31.37z'
                }
                fill={color || '#2684ff'}
            />
        </SvgIcon>
    );
}

Bitbucket.defaultProps = ({
    title: 'BitbucketIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {Bitbucket};
