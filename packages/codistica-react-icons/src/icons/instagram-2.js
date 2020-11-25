/** @flow */

import {useGetUniqueID} from '@codistica/react';
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

function Instagram2(props: Props) {
    const getUniqueID = useGetUniqueID();
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <defs>
                <radialGradient
                    cx={'-2587.35'}
                    cy={'-3530.86'}
                    r={'1624.98'}
                    gradientTransform={
                        'matrix(.4 -.0002 -.0002 -.4 1067.69 -912.02)'
                    }
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('a')}>
                    <stop offset={'.09'} stopColor={'#fa8f21'} />
                    <stop offset={'.78'} stopColor={'#d82d7e'} />
                </radialGradient>
            </defs>
            <path
                d={'M46.08 46.08h419.84v419.84H46.08z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M256.06 387.47a131.45 131.45 0 10-.1-262.9 131.45 131.45 0 00-131.4 131.5 131.46 131.46 0 00131.5 131.4zM170.7 256.03a85.31 85.31 0 110 .02zM423.34 119.31a30.72 30.72 0 00-30.72-30.72 30.74 30.74 0 00-30.71 30.72h-.01a30.72 30.72 0 0061.44 0z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
            <path
                d={
                    'M260.95 512c65.1-.04 74.07-.35 100.71-1.6a187.74 187.74 0 0062.14-11.9 130.88 130.88 0 0074.85-74.92 187.28 187.28 0 0011.86-62.14c1.2-26.78 1.5-35.68 1.5-101.56l-.01-3.98v-4.68c-.04-65.25-.35-74.2-1.57-100.87a187.72 187.72 0 00-11.92-62.13 130.93 130.93 0 00-74.89-74.85 187.61 187.61 0 00-62.14-11.86C334.18.27 325.45-.03 255.94 0s-78.26.32-105.57 1.6h-.01a187.9 187.9 0 00-62.14 11.9 130.9 130.9 0 00-74.85 74.92 187.81 187.81 0 00-11.86 62.14C.26 177.86-.03 186.58 0 256.1s.32 78.25 1.6 105.55a187.81 187.81 0 0011.91 62.13 130.88 130.88 0 0074.91 74.85 187.88 187.88 0 0062.15 11.86c26.8 1.2 35.7 1.53 101.71 1.51h8.67zm-108.27-47.56l-.01-.02c-24.96-1.12-38.53-5.28-47.55-8.78a84.76 84.76 0 01-48.62-48.57c-3.52-9-7.68-22.57-8.83-47.54-1.25-26.98-1.5-35.09-1.53-103.45s.24-76.45 1.45-103.46c1.12-24.96 5.3-38.5 8.78-47.55a84.73 84.73 0 0148.6-48.59c9-3.52 22.57-7.68 47.54-8.82 26.98-1.26 35.09-1.5 103.42-1.54s76.45.23 103.46 1.45c24.96 1.13 38.5 5.32 47.55 8.8a84.73 84.73 0 0148.6 48.55c3.52 9.01 7.68 22.58 8.83 47.55 1.25 27 1.5 35.09 1.53 103.45s-.21 76.45-1.45 103.46c-1.12 24.95-5.3 38.52-8.78 47.55a84.76 84.76 0 01-48.56 48.6c-9.01 3.51-22.58 7.68-47.55 8.82-26.98 1.25-35.09 1.5-103.46 1.53s-76.45-.21-103.42-1.44z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
        </SvgIcon>
    );
}

Instagram2.defaultProps = ({
    title: 'Instagram2Icon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {Instagram2};
