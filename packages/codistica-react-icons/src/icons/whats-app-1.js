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

function WhatsApp1(props: Props) {
    const getUniqueID = useGetUniqueID();
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <defs>
                <linearGradient
                    x1={'261.77'}
                    x2={'261.77'}
                    y1={'98.3'}
                    y2={'403.52'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('a')}>
                    <stop offset={'0'} stopColor={'#61fd7d'} />
                    <stop offset={'1'} stopColor={'#2bb826'} />
                </linearGradient>
                <linearGradient
                    x1={'256'}
                    x2={'256'}
                    y1={'0'}
                    y2={'512'}
                    id={getUniqueID('b')}
                    href={`#${getUniqueID('a')}`}
                />
            </defs>
            <path
                d={'M44.5 44.5h423v423h-423z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M261.83 98.3c-84.17 0-152.63 68.43-152.66 152.54a152.16 152.16 0 0023.33 81.19l3.63 5.77-15.42 56.3 57.76-15.15 5.57 3.3a152.4 152.4 0 0077.67 21.27h.06c84.11 0 152.57-68.44 152.6-152.56A152.6 152.6 0 00261.83 98.3zm89.76 218.13c-3.82 10.71-22.15 20.49-30.96 21.8a62.92 62.92 0 01-28.9-1.81 263.93 263.93 0 01-26.15-9.66c-46.02-19.87-76.07-66.19-78.37-69.25s-18.73-24.87-18.73-47.44 11.85-33.67 16.06-38.26a16.85 16.85 0 0112.23-5.74c3.06 0 6.12.03 8.79.16 2.82.14 6.6-1.07 10.32 7.88 3.83 9.18 13 31.75 14.15 34.05s1.9 4.97.38 8.03-2.3 4.98-4.59 7.65-4.82 5.98-6.88 8.04c-2.3 2.28-4.69 4.77-2.01 9.36s11.88 19.6 25.52 31.77c17.52 15.62 32.3 20.46 36.89 22.76s7.26 1.91 9.94-1.15 11.47-13.39 14.53-17.98c3.05-4.6 6.11-3.83 10.32-2.3s26.76 12.63 31.34 14.93c4.6 2.3 7.65 3.44 8.8 5.35s1.14 11.1-2.68 21.8z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
            <path
                d={
                    'M512 129.97c0-2.8-.08-8.87-.25-13.58-.4-11.41-1.3-26.13-2.65-32.82a110.37 110.37 0 00-9.28-27.87 98.65 98.65 0 00-43.38-43.43A110.17 110.17 0 00428.72 3C421.97 1.62 407.14.7 395.65.3c-4.7-.17-10.78-.26-13.58-.26L129.97 0c-2.8 0-8.88.08-13.58.25-11.41.4-26.13 1.3-32.82 2.65a110.42 110.42 0 00-27.87 9.28 98.66 98.66 0 00-43.44 43.38A110.16 110.16 0 003 83.28C1.62 90.03.71 104.86.3 116.35c-.16 4.7-.25 10.78-.25 13.58L0 382.03c0 2.8.08 8.88.25 13.58.4 11.41 1.3 26.13 2.65 32.82a110.37 110.37 0 009.28 27.87 98.66 98.66 0 0043.38 43.43 110.2 110.2 0 0027.72 9.28c6.75 1.37 21.58 2.28 33.07 2.7 4.7.16 10.78.25 13.58.25l252.1.04c2.8 0 8.87-.08 13.58-.25 11.41-.4 26.13-1.3 32.82-2.65a110.4 110.4 0 0027.87-9.28 98.66 98.66 0 0043.43-43.38 110.17 110.17 0 009.27-27.72c1.38-6.75 2.3-21.58 2.7-33.07.17-4.7.26-10.78.26-13.58zM261.77 434.52h-.07a183.52 183.52 0 01-87.74-22.34L76.63 437.7l26.05-95.11a183.17 183.17 0 01-24.51-91.76c.04-101.2 82.4-183.53 183.6-183.53a183.6 183.6 0 01183.6 183.68c-.04 101.2-82.41 183.54-183.6 183.54z'
                }
                fill={color || `url(#${getUniqueID('b')})`}
            />
        </SvgIcon>
    );
}

WhatsApp1.defaultProps = ({
    title: 'WhatsApp1Icon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {WhatsApp1};
