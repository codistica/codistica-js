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

function Nginx(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#13a553'}>
                <path
                    d={
                        'M448.94 180.58c-1.69 3.66-2.5 5.76-3.57 7.72l-87.99 161.26c-8.91 16.4-4.61 14.79-25.06 14.8-59.18.06-118.37.01-177.56.17-5.37.02-8.67-2-11.22-6.55Q98.31 277.28 52.9 196.7c-3.58-6.35-3.4-12.21.07-18.6Q95.6 99.63 137.9 20.97c3.14-5.85 7.7-7.16 13.59-7.11 44.74.32 89.48.68 134.22.8 19.07.06 38.14-.52 57.21-.57 5.16-.01 9.78 1.32 12.85 6.5q34.3 58.02 68.88 115.87a43.99 43.99 0 011.9 4.4 63.27 63.27 0 01-7.6.99c-19.95.07-39.89-.11-59.83.13-6.7.08-11.15-2.46-14.57-8.13-9.3-15.43-19-30.62-28.32-46.04-2.95-4.87-6.73-7.07-12.45-7.07-35.21.05-70.43-.09-105.64-.2-5.39 0-9.16 2.24-11.85 7q-25.44 45.15-51.13 90.16c-4.54 7.95-4.26 15.5.1 23.42q24.5 44.55 48.69 89.27c5.03 9.31 12.28 13.89 23.04 13.8q43.91-.4 87.82-.05c7.16.05 11.93-2.68 15.68-8.67 6.76-10.77 13.97-21.26 21.02-31.85 2.7-4.06 4.5-8.33 2.08-13.08-2.45-4.8-7.04-4.68-11.61-4.68q-48.37.07-96.74.02c-16.36-.02-30.34-11.62-32.4-26.76-2.53-18.53 6.94-33.34 24.28-37.77a28.14 28.14 0 016.89-.74q108.5-.06 217.02-.03zM228.2 430.94c-7.1 0-12.83.45-18.43-.24-2.06-.25-4.93-2.86-5.5-4.92-3.06-11.1-10.26-14.15-20.96-12.73-5.84.77-11.9-.3-17.77.34-2.68.3-6.14 2.07-7.51 4.26a273.93 273.93 0 00-13.5 24.46 9.42 9.42 0 00.16 7.4 249.82 249.82 0 0013.24 23.16c1.4 2.14 4.86 3.86 7.52 4.09 6.74.58 13.56.2 20.34.2 10.66 0 13.5-2.55 15.43-14.62-8.1 0-16.07.03-24.04 0-8.42-.04-12.89-3.74-12.86-10.6.03-6.87 4.36-10.4 12.98-10.41q26.4-.06 52.8 0c1.87 0 3.75.17 6.16.29a30.29 30.29 0 01-1.35 4.44c-7.87 15.94-15.65 31.93-23.87 47.7a9.11 9.11 0 01-6.7 4q-26.07.49-52.15-.02a9.46 9.46 0 01-6.83-3.86q-13-21.84-25.12-44.19a9.8 9.8 0 01.04-7.96q12.15-23.04 25.16-45.62a9.39 9.39 0 016.73-4.05c18.23-.33 36.47-.26 54.7-.06 1.91.02 4.86 1.21 5.54 2.68 5.3 11.48 10.16 23.17 15.8 36.26zM369.96 429.52c-3.22 3.02-5.08 4.68-6.84 6.44-19.04 19.02-38 38.12-57.2 56.99a17.24 17.24 0 01-9.07 4.77c-7.25.94-11.22-2.83-11.26-10.2q-.2-42.29 0-84.57c.02-6.44 4.28-10.57 10.22-10.69 6.06-.12 10.63 4.32 10.68 10.91.12 16.53.04 33.07.05 49.6v8.58c3.06-2.65 4.96-4.1 6.64-5.78 19.2-19.15 38.46-38.26 57.5-57.58 4.29-4.36 8.95-6.82 14.71-4.66 5.9 2.22 6.49 7.62 6.47 13.23-.1 26.28-.02 52.56-.06 78.84-.01 7.4-2.88 11.61-8.22 12.47-7.85 1.27-12.79-2.44-12.95-10.65-.3-16.1-.13-32.2-.2-48.31-.01-2.48-.24-4.95-.47-9.4zM21.7 428.92c-.18 4.02-.34 6.04-.35 8.07-.02 15.48 0 30.96-.02 46.44a28.04 28.04 0 01-.33 5.69c-1.28 6.1-5.4 9.2-11.3 8.8-6.03-.43-9.46-3.9-9.58-10.42-.2-10.38-.08-20.78-.08-31.17 0-16.75.06-33.5-.04-50.25-.03-5.83.51-11.04 7.01-13.46 5.93-2.2 9.65 1.18 13.32 4.85q28.58 28.56 57.1 57.17c1.78 1.8 3.02 4.12 4.52 6.2l2.24-1.14c.14-2.13.38-4.25.39-6.38.03-16.33-.13-32.66.08-48.99.12-9.74 8.28-15.55 15.53-10.88 2.72 1.74 5.37 5.96 5.42 9.09q.61 42.6-.04 85.23c-.05 3.21-3.18 8.04-6 9.09-3.25 1.2-8.68.23-11.5-1.95-6.33-4.88-11.65-11.08-17.34-16.78-15.86-15.9-31.7-31.83-49.02-49.21zM444.73 446.27l-26.04-25.89c-3-2.99-6.08-5.9-8.96-9-4.59-4.94-4.91-11.97-.9-16.02 4.6-4.64 10.36-4.73 15.69.63 11.2 11.26 22.05 22.85 33.58 34.87 6.91-6.75 12.76-12.42 18.55-18.15 5.43-5.36 10.74-10.84 16.21-16.15 5.62-5.45 11.61-5.86 16.23-1.3 4.21 4.14 3.87 11.36-1.15 16.46q-13.38 13.58-27.09 26.84c-1.95 1.9-4.4 3.3-7.22 5.34 5.1 5.43 8.86 9.61 12.82 13.6 6.87 6.9 13.84 13.72 20.8 20.54 5.4 5.27 6.28 12.48 2.01 16.9-4.3 4.45-10.93 4.4-16.2-.98-10.97-11.17-21.59-22.7-33.67-35.48-6.08 6.68-10.62 11.9-15.43 16.89a652.33 652.33 0 01-18.9 18.86c-5.25 5.02-12.17 5.13-16.35.6-3.98-4.3-3.44-10.88 1.5-15.87q14.08-14.24 28.33-28.3c1.64-1.61 3.78-2.71 6.19-4.4zM249.88 441.74h20.29a28.24 28.24 0 01.68 4.3c.05 13.53.1 27.07 0 40.6-.04 7.22-4.1 11.36-10.75 11.33-6.08-.04-10.12-4.28-10.18-11.23-.12-14.77-.04-29.53-.04-45zM270.89 414.44v1.9c0 15.66-1.62 17.1-17.23 14.43-1.43-.24-3.54-2.46-3.59-3.82a330 330 0 010-25.42c.21-5.28 5.12-9.56 10.08-9.66a10.98 10.98 0 0110.64 9.86c.3 4.22.06 8.47.06 12.71z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

Nginx.defaultProps = ({
    title: 'NginxIcon',
    size: null,
    color: null
}: DefaultProps);

export {Nginx};
