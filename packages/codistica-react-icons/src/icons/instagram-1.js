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

function Instagram1(props: Props) {
    const getUniqueID = useGetUniqueID();
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <defs>
                <radialGradient
                    cx={'200.82'}
                    cy={'-1145.91'}
                    r={'161'}
                    gradientTransform={'matrix(1 0 0 -1 0 -829.27)'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('a')}>
                    <stop offset={'.03'} stopColor={'#fa8f21'} />
                    <stop offset={'.81'} stopColor={'#df406c'} />
                    <stop offset={'1'} stopColor={'#d82d7e'} />
                </radialGradient>
                <radialGradient
                    cx={'120.27'}
                    cy={'-1234.38'}
                    r={'395.97'}
                    gradientTransform={'matrix(1 0 0 -1 0 -829.27)'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('b')}>
                    <stop offset={'.09'} stopColor={'#fa8f21'} />
                    <stop offset={'1'} stopColor={'#d82d7e'} />
                </radialGradient>
                <radialGradient
                    cx={'33.14'}
                    cy={'-1330.06'}
                    r={'650.05'}
                    gradientTransform={'matrix(1 0 0 -1 0 -829.27)'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('c')}>
                    <stop offset={'.09'} stopColor={'#fa8f21'} />
                    <stop offset={'.78'} stopColor={'#d82d7e'} />
                </radialGradient>
                <radialGradient
                    cx={'280.45'}
                    cy={'-1141.83'}
                    r={'141.69'}
                    gradientTransform={'matrix(1 0 0 -1 0 -829.27)'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('d')}>
                    <stop
                        offset={'.51'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'0'}
                    />
                    <stop
                        offset={'.71'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.01'}
                    />
                    <stop
                        offset={'.78'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.05'}
                    />
                    <stop
                        offset={'.83'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.12'}
                    />
                    <stop
                        offset={'.87'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.22'}
                    />
                    <stop
                        offset={'.91'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.35'}
                    />
                    <stop
                        offset={'.94'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.51'}
                    />
                    <stop
                        offset={'.97'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.7'}
                    />
                    <stop
                        offset={'.99'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.91'}
                    />
                    <stop offset={'1'} stopColor={'#8c3aaa'} />
                </radialGradient>
                <radialGradient
                    cx={'316.11'}
                    cy={'-1224.37'}
                    r={'348.46'}
                    gradientTransform={'matrix(1 0 0 -1 0 -829.27)'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('e')}>
                    <stop
                        offset={'.23'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'0'}
                    />
                    <stop
                        offset={'.56'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.01'}
                    />
                    <stop
                        offset={'.68'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.05'}
                    />
                    <stop
                        offset={'.77'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.12'}
                    />
                    <stop
                        offset={'.84'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.22'}
                    />
                    <stop
                        offset={'.9'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.35'}
                    />
                    <stop
                        offset={'.95'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.51'}
                    />
                    <stop
                        offset={'1'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.69'}
                    />
                    <stop
                        offset={'1'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'.7'}
                    />
                </radialGradient>
                <radialGradient
                    cx={'354.64'}
                    cy={'-1313.62'}
                    r={'572.05'}
                    gradientTransform={'matrix(1 0 0 -1 0 -829.27)'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('f')}>
                    <stop
                        offset={'.64'}
                        stopColor={'#8c3aaa'}
                        stopOpacity={'0'}
                    />
                    <stop offset={'1'} stopColor={'#8c3aaa'} />
                </radialGradient>
            </defs>
            <path
                d={'M49 49h414v414H49z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M256.01 319.4a63.4 63.4 0 1163.4-63.4 63.4 63.4 0 01-63.4 63.4z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
            <path
                d={
                    'M410.85 332.87c.92-20.07 1.1-26.07 1.1-76.87s-.18-56.8-1.1-76.87c-.85-18.54-3.94-28.62-6.55-35.32a62.95 62.95 0 00-36.1-36.1c-6.72-2.6-16.78-5.7-35.33-6.55-20.07-.9-26.1-1.1-76.87-1.1s-56.8.18-76.84 1.1c-18.55.85-28.63 3.94-35.32 6.55a62.95 62.95 0 00-36.11 36.1c-2.59 6.72-5.7 16.79-6.54 35.33-.9 20.07-1.1 26.07-1.1 76.87s.18 56.82 1.1 76.87c.85 18.54 3.94 28.62 6.55 35.32a62.98 62.98 0 0036.1 36.09c6.7 2.6 16.78 5.7 35.33 6.54 20.04.92 26.05 1.1 76.84 1.1s56.82-.18 76.87-1.1c18.54-.85 28.63-3.93 35.32-6.55a62.98 62.98 0 0036.1-36.09c2.6-6.7 5.7-16.78 6.55-35.32zM353.68 256a97.67 97.67 0 11-195.34 0 97.67 97.67 0 11195.34 0zm26.69-101.53a22.83 22.83 0 11-22.83-22.83h.01a22.83 22.83 0 0122.82 22.83z'
                }
                fill={color || `url(#${getUniqueID('b')})`}
            />
            <path
                d={
                    'M512 256c0-83.39-.3-93.25-1.81-126.2-1.39-30.44-6.46-46.98-10.75-57.98-5.68-14.58-12.42-24.99-23.36-35.92a96.65 96.65 0 00-35.91-23.35c-11.03-4.26-27.54-9.36-58-10.74C349.24.33 339.38 0 255.99 0c-83.35 0-93.24.3-126.17 1.81-30.45 1.39-47 6.46-58 10.75a96.4 96.4 0 00-35.9 23.36 97.4 97.4 0 00-23.36 35.93C8.29 82.88 3.19 99.39 1.8 129.84.33 162.78 0 172.64 0 256.04s.3 93.25 1.83 126.17c1.39 30.45 6.45 46.99 10.74 57.99a96.28 96.28 0 0023.36 35.9 97.02 97.02 0 0035.92 23.35c11 4.3 27.54 9.36 57.99 10.74 32.91 1.52 42.8 1.81 126.16 1.81 83.39 0 93.28-.3 126.2-1.81 30.44-1.39 46.98-6.46 57.98-10.75 14.58-5.68 24.99-12.43 35.92-23.36a96.84 96.84 0 0023.35-35.9c4.26-11 9.36-27.54 10.74-57.99C511.7 349.25 512 339.36 512 256zm-65.8 0c0 51.65-.21 58.12-1.13 78.41-.9 20.25-4.13 34.08-8.84 46.17a97.25 97.25 0 01-55.63 55.64c-12.09 4.7-25.92 7.91-46.17 8.84-20.28.93-26.76 1.15-78.42 1.15s-58.12-.23-78.42-1.15c-20.25-.92-34.06-4.13-46.17-8.83A97.25 97.25 0 0175.8 380.6c-4.7-12.1-7.92-25.92-8.84-46.17-.94-20.28-1.15-26.77-1.15-78.42s.21-58.14 1.15-78.42c.92-20.25 4.13-34.08 8.83-46.17a97.25 97.25 0 0155.63-55.64c12.09-4.7 25.92-7.91 46.17-8.84 20.3-.93 26.8-1.15 78.44-1.15s58.13.22 78.42 1.15c20.23.9 34.06 4.13 46.17 8.83a97.28 97.28 0 0155.62 55.64c4.7 12.08 7.91 25.91 8.83 46.16.93 20.29 1.14 26.77 1.14 78.42z'
                }
                fill={color || `url(#${getUniqueID('c')})`}
            />
            <g>
                <path
                    d={
                        'M256.01 319.4a63.4 63.4 0 1163.4-63.4 63.4 63.4 0 01-63.4 63.4z'
                    }
                    fill={color || `url(#${getUniqueID('d')})`}
                />
                <path
                    d={
                        'M410.85 332.87c.92-20.07 1.1-26.07 1.1-76.87s-.18-56.8-1.1-76.87c-.85-18.54-3.94-28.62-6.55-35.32a62.95 62.95 0 00-36.1-36.1c-6.72-2.6-16.78-5.7-35.33-6.55-20.07-.9-26.1-1.1-76.87-1.1s-56.8.18-76.84 1.1c-18.55.85-28.63 3.94-35.32 6.55a62.95 62.95 0 00-36.11 36.1c-2.59 6.72-5.7 16.79-6.54 35.33-.9 20.07-1.1 26.07-1.1 76.87s.18 56.82 1.1 76.87c.85 18.54 3.94 28.62 6.55 35.32a62.98 62.98 0 0036.1 36.09c6.7 2.6 16.78 5.7 35.33 6.54 20.04.92 26.05 1.1 76.84 1.1s56.82-.18 76.87-1.1c18.54-.85 28.63-3.93 35.32-6.55a62.98 62.98 0 0036.1-36.09c2.6-6.7 5.7-16.78 6.55-35.32zM353.68 256a97.67 97.67 0 11-195.34 0 97.67 97.67 0 11195.34 0zm26.69-101.53a22.83 22.83 0 11-22.83-22.83h.01a22.83 22.83 0 0122.82 22.83z'
                    }
                    fill={color || `url(#${getUniqueID('e')})`}
                />
                <path
                    d={
                        'M512 256c0-83.39-.3-93.25-1.81-126.2-1.39-30.44-6.46-46.98-10.75-57.98-5.68-14.58-12.42-24.99-23.36-35.92a96.65 96.65 0 00-35.91-23.35c-11.03-4.26-27.54-9.36-58-10.74C349.24.33 339.38 0 255.99 0c-83.35 0-93.24.3-126.17 1.81-30.45 1.39-47 6.46-58 10.75a96.4 96.4 0 00-35.9 23.36 97.4 97.4 0 00-23.36 35.93C8.29 82.88 3.19 99.39 1.8 129.84.33 162.78 0 172.64 0 256.04s.3 93.25 1.83 126.17c1.39 30.45 6.45 46.99 10.74 57.99a96.28 96.28 0 0023.36 35.9 97.02 97.02 0 0035.92 23.35c11 4.3 27.54 9.36 57.99 10.74 32.91 1.52 42.8 1.81 126.16 1.81 83.39 0 93.28-.3 126.2-1.81 30.44-1.39 46.98-6.46 57.98-10.75 14.58-5.68 24.99-12.43 35.92-23.36a96.84 96.84 0 0023.35-35.9c4.26-11 9.36-27.54 10.74-57.99C511.7 349.25 512 339.36 512 256zm-65.8 0c0 51.65-.21 58.12-1.13 78.41-.9 20.25-4.13 34.08-8.84 46.17a97.25 97.25 0 01-55.63 55.64c-12.09 4.7-25.92 7.91-46.17 8.84-20.28.93-26.76 1.15-78.42 1.15s-58.12-.23-78.42-1.15c-20.25-.92-34.06-4.13-46.17-8.83A97.25 97.25 0 0175.8 380.6c-4.7-12.1-7.92-25.92-8.84-46.17-.94-20.28-1.15-26.77-1.15-78.42s.21-58.14 1.15-78.42c.92-20.25 4.13-34.08 8.83-46.17a97.25 97.25 0 0155.63-55.64c12.09-4.7 25.92-7.91 46.17-8.84 20.3-.93 26.8-1.15 78.44-1.15s58.13.22 78.42 1.15c20.23.9 34.06 4.13 46.17 8.83a97.28 97.28 0 0155.62 55.64c4.7 12.08 7.91 25.91 8.83 46.16.93 20.29 1.14 26.77 1.14 78.42z'
                    }
                    fill={color || `url(#${getUniqueID('f')})`}
                />
            </g>
        </SvgIcon>
    );
}

Instagram1.defaultProps = ({
    title: 'Instagram1Icon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {Instagram1};
