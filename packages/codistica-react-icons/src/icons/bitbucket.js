/** @flow */

import React from 'react';
import {SvgIcon} from '../utils/svg-icon/svg-icon.js';

type DefaultProps = {|
    title: string,
    size: string | number | null,
    color: string | null
|};

type Props = {
    ...DefaultProps
};

function Bitbucket(props: Props) {
    return (
        <SvgIcon {...props}>
            <path
                d={
                    'M504.45,26.82c-2-.1-4.09,0-6.13,0H256.19v-.12H13.45c-2.25,0-4.5,0-6.74.07-5.1.25-7.45,2.75-6.51,8,1.09,6,2.09,12.07,3.08,18.11q18.18,110.59,36.35,221.2,16.08,97.6,32.24,195.2c2.27,13.83,4.64,16,18.73,16H263.46q83.06,0,166.12.06c5.65,0,9.35-1.32,10.36-7.64q12.85-80.13,26-160.22Q484,206.26,502.13,95q4.81-29.61,9.6-59.25C512.76,29.31,511,27.13,504.45,26.82ZM326.82,214.48c-5.95,34.87-12,69.72-17.94,104.6-1.62,9.59-1.43,9.64-11,9.64-27.12,0-54.25-.24-81.38.17-7.18.1-9.69-2.05-11-9.24-8-44.1-16.68-88.08-25.09-132.11a39.75,39.75,0,0,1-.31-4.43H331.9C330.17,193.85,328.58,204.18,326.82,214.48Z'
                }
                fill={'#2684ff'}
            />
        </SvgIcon>
    );
}

Bitbucket.defaultProps = ({
    title: 'BitbucketIcon',
    size: null,
    color: null
}: DefaultProps);

export {Bitbucket};
