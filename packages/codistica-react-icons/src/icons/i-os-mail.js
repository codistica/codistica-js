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

function IOSMail(props: Props) {
    const getUniqueID = useGetUniqueID();
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <defs>
                <linearGradient
                    x1={'255.75'}
                    x2={'259.07'}
                    y1={'509.93'}
                    y2={'-2848.45'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('a')}>
                    <stop offset={'0'} stopColor={'#70efff'} />
                    <stop offset={'1'} stopColor={'#5770ff'} />
                </linearGradient>
            </defs>
            <path
                d={'M44.5 130h423v252h-423z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M394.5 0H116.99A117.24 117.24 0 000 117.5v277.52A117.24 117.24 0 00117.5 512h277.52A117.23 117.23 0 00512 394.5v-277-.52A117.23 117.23 0 00394.5 0zM108.9 148H403.1a20.68 20.68 0 019.96 2.5l-47.11 48.53-48.9 50.31-48.35 49.95c-1.9 1.48-2.64 2.63-4.3 3.43a15.44 15.44 0 01-7.14 1.69 16.24 16.24 0 01-6.49-2.03 40.82 40.82 0 01-4.29-3.1l-41.77-42.83-2.85-3.02-1.42-1.43-1.42-1.42-.9-1.07-48.7-50.49-48.18-49.6a20.49 20.49 0 017.64-1.42zM85.77 337.33V174.49a28.03 28.03 0 018.36-20.45l.35.35 48.89 50.5 48.89 50.3.89 1.07-44.63 43.2-50.3 48.89-6.76 6.4a28.72 28.72 0 01-5.7-17.42zM403.1 364H108.9a20.94 20.94 0 01-11.37-3.56l6.4-6.22 50.48-48.89 44.44-43.2 42.32 43.38a22.18 22.18 0 004.79 3.47c3.52 1.73 7.37 3.27 11.3 3.33 3.91.06 7.8-1.33 11.36-2.97 2.2-1.02 3.72-2.68 5.98-4.19l41.77-43.01 46.4 44.8 50.49 48.89 3.2 3.2A21.15 21.15 0 01403.1 364zm23.11-26.67a29.25 29.25 0 01-4.27 15.47l-3.02-2.85-50.3-48.89-46.4-44.97.88-.89 48.71-50.31 47.65-49.24a28.56 28.56 0 016.75 18.84z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
        </SvgIcon>
    );
}

IOSMail.defaultProps = ({
    title: 'IOSMailIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {IOSMail};
