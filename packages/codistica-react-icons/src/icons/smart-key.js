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

function SmartKey(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M47.03 65.8c1.5 1.8 3.08 3.6 4.6 5.46C62.3 84.3 72.95 97.38 83.7 110.38a8.82 8.82 0 012.07 5.8q.66 21.62 1.66 43.23a7.26 7.26 0 001.71 3.85q11.76 14.56 23.73 28.95a4.33 4.33 0 01.79 5.16 19.05 19.05 0 0011.82 25.43c11.37 3.59 22.37-2.73 25.64-13.83 3.5-11.93-7.93-26.84-23.1-23.73a3.09 3.09 0 01-3.67-1.24 975.68 975.68 0 00-20.79-25.3c-2.29-2.68-1.98-5.62-2.1-8.52-.58-13.43-.92-26.87-1.48-40.3a7.12 7.12 0 00-1.59-3.9Q77.8 80.72 57 55.6c-1.63-1.96-1.8-3.27.03-5.15 4.48-4.6 8.86-9.32 13.18-14.08 1.66-1.84 2.68-1.44 4.12.32q33.64 41.24 67.39 82.4 31.77 38.8 63.56 77.56a2.96 2.96 0 01.28.5c-5.76 11.54-.82 24.04 11.2 28.25 9.51 3.34 20.27-1.5 24.44-11.12a19.28 19.28 0 00-9.18-24.65c-4.19-2.09-8.55-3.1-13.3-1.9a4.03 4.03 0 01-3.3-1.28c-11.07-13.35-22.04-26.8-33.04-40.22l-75.64-92.26Q95.99 40.84 85.26 27.7c-.5-.6-.89-1.26-1.58-2.26 2.81-1.87 5.47-3.8 8.28-5.46 3.6-2.12 7.36-3.97 10.97-6.08 1.68-.99 2.75-.72 3.95.76q14.68 18.04 29.45 36c8.21 10.03 16.4 20.08 24.69 30.05a10.58 10.58 0 003.75 2.64c11.8 5.32 23.64 10.53 35.43 15.86a9.92 9.92 0 013.42 2.64c8.02 9.68 16.01 19.39 23.87 29.2a4.53 4.53 0 01.5 3.9c-5.5 12.32 3.5 26.82 18.17 27.12 10.61.22 19-7.57 19.9-18.38.87-10.38-7.64-19.9-17.83-20.52a10.96 10.96 0 00-3.79.03c-3.68 1.15-5.58-.8-7.69-3.43-7.73-9.66-15.77-19.07-23.5-28.74-2.44-3.06-5.84-4.06-9.08-5.52-10.36-4.68-20.75-9.31-31.09-14.04a9.3 9.3 0 01-3.21-2.43Q144.83 38.71 119.9 8.29a9.84 9.84 0 01-.66-1.3c6.08-1.53 11.95-3.28 17.92-4.44A131.42 131.42 0 01172.96.4c30.98 2.54 58.34 13.64 81.53 34.6a131.46 131.46 0 0137.06 56.2 127.46 127.46 0 015.15 62.02c-1.3 8.03-3.87 15.86-5.58 23.83a7.22 7.22 0 001.2 4.73q14.36 23.06 28.99 45.96c1.6 2.49 1.25 3.8-1 5.44-3.54 2.58-6.83 5.5-10.32 8.15-1.81 1.38-1.9 2.41-.39 4.22 11.27 13.58 22.42 27.25 33.61 40.89l57.7 70.28q37.92 46.23 75.83 92.48c1.6 1.96 2.99 4.18 4.88 5.81 3.16 2.75 2.97 5.74 1.96 9.38-3.99 14.33-7.77 28.72-11.56 43.1a2.57 2.57 0 01-2.8 2.29q-18.84.73-37.67 1.6c-3.6.17-7.19.64-10.78.62a5.48 5.48 0 01-3.69-1.67 286.36 286.36 0 01-11.65-14.26 5.26 5.26 0 01-.73-4.15c2.65-8.24 5.52-16.4 8.39-24.57.7-1.98.1-2.7-1.92-2.68-9.75.11-19.5.24-29.26.2a5.1 5.1 0 01-3.43-1.53 167.08 167.08 0 01-8.78-10.93 4.67 4.67 0 01-.62-3.65c1.56-4.91 3.36-9.75 5.18-14.57a5.13 5.13 0 00-1-5.83c-5.51-6.44-10.82-13.06-16.15-19.65-1.15-1.42-2.22-2.12-4.2-1.6-4.7 1.27-9.5 2.19-14.2 3.4-2.02.53-3.43.41-4.8-1.45-2.36-3.21-5.11-6.14-7.5-9.34a4.23 4.23 0 01-.57-3.34c2.3-6.92 4.88-13.74 7.17-20.67a4.56 4.56 0 00-.62-3.68c-7.07-8.83-14.33-17.5-21.4-26.31-1.57-1.95-3.14-2.1-5.36-1.54a413 413 0 01-18.76 4.37 4.76 4.76 0 01-3.44-1.2c-1.3-1.1-2.06-2.89-3.39-3.98-4.04-3.34-4.13-7.36-2.99-12.05 1.4-5.76 2.15-11.68 3.41-17.48.62-2.81-.4-3.78-3.02-3.87q-8.9-.32-17.82-.74a57.07 57.07 0 01-6.69-.54 4.86 4.86 0 01-2.59-1.6 194.1 194.1 0 01-7.22-8.82c-1.19-1.54-2.08-1.92-3.75-.5-3.78 3.23-7.8 6.18-11.62 9.36-1.31 1.08-2.13 1.13-3.41-.1q-20.09-19.2-40.27-38.3c-1.74-1.65-3.38-2.81-6.14-2.4a119.83 119.83 0 01-35.82-.6 134.04 134.04 0 01-55.58-21.59c-24.16-16.47-41.38-38.38-51.26-65.96a130.12 130.12 0 01-7.42-39.74A131.54 131.54 0 0144.6 69.02a54.9 54.9 0 011.65-2.75c.1-.14.32-.2.78-.47zm254.8 207.45a8.56 8.56 0 00-6.71 4.6c-1.55 2.77-.84 5.29.99 7.57q6.77 8.44 13.64 16.8 31.71 38.65 63.45 77.27c5.5 6.7 10.94 13.47 16.55 20.08 3.47 4.1 8.47 3.99 11.54.02 2.25-2.91 2.03-5.88-.73-9.25q-22.62-27.58-45.26-55.15c-16.01-19.5-31.97-39.06-48.08-58.48-1.3-1.57-3.57-2.32-5.4-3.46zm156.84 189.72a31.09 31.09 0 00-2.15-4.3c-1.33-1.92-2.94-3.64-4.42-5.44-10.84-13.17-21.65-26.36-32.57-39.46a9.66 9.66 0 00-4.43-3.03 6.66 6.66 0 00-7.7 3.37c-1.63 2.83-1.42 5.2.92 8.07q12.84 15.75 25.74 31.45c3.83 4.67 7.62 9.38 11.5 14a7.25 7.25 0 008.2 2.18 8.77 8.77 0 004.91-6.84z'
                }
                fill={color || '#000000'}
            />
        </SvgIcon>
    );
}

SmartKey.defaultProps = ({
    title: 'SmartKeyIcon',
    size: null,
    color: null
}: DefaultProps);

export {SmartKey};
