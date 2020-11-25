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

function Server(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M256.35 11.86l208.35.01c7.97 0 16.01-.4 23.89.54 13.11 1.57 23.22 13.2 23.29 26.4q.25 49.37-.03 98.74c-.09 14.8-12.43 26.7-27.63 26.84-23.07.2-46.15.14-69.23.1-15.18-.03-30.37-.33-45.55-.31q-108.25.1-216.5.32-61.63.07-123.26.02c-10.86 0-19.52-4.08-25.5-13.35a25.43 25.43 0 01-4.1-13.96Q.06 96.52.2 55.84c.02-6.87-.53-13.85.44-20.6C2.64 21.29 13.9 12.02 28 11.93c16.62-.11 33.24-.06 49.86-.06h178.49zm-.32 137.88v.03h153.2c24.4-.02 48.78-.12 73.17-.17 9.6-.02 14.6-4.89 14.64-14.49q.18-46.41.26-92.83c.02-4.83-.9-9.3-4.91-12.62-3.37-2.8-7.26-2.96-11.4-2.95q-145.15.05-290.3-.02-80.72-.03-161.43-.15c-8.64 0-13.88 4.9-14.42 13.58-.1 1.62.14 3.25.14 4.88v90.89c0 8.45 5.27 13.73 13.7 13.74q67.41.08 134.83.1 46.26.03 92.52.01zM256.04 347.7h170.58c18.9 0 37.82-.06 56.73-.04 16.58 0 28.55 11.97 28.56 28.52q.02 47.9 0 95.8c-.02 15.76-11.85 28.06-27.66 28.13-38.7.17-77.41.08-116.12.08H236.26l-192.88-.05c-5.46 0-10.92.08-16.38-.06a27.53 27.53 0 01-26.91-27.2q-.18-48.89 0-97.78c.04-15.43 12.36-27.39 28-27.4 16.73 0 33.46.2 50.18.18q53.79-.03 107.57-.17 35.1-.05 70.2 0zm.31 137.73v.02h44.93l180.47-.07c10.3 0 15.3-4.72 15.33-14.89q.12-47.08-.05-94.17a16.2 16.2 0 00-1.67-7.2c-2.79-5.34-7.73-6.85-13.5-6.85q-141.93.07-283.85.03c-55.9 0-111.8.07-167.69-.13-8.1-.02-15.63 4.53-15.5 15.57.38 31.06.13 62.12.13 93.19 0 9.29 5.1 14.45 14.35 14.5 9.19.03 18.37 0 27.55 0h199.5zM256 332.25H66.7c-12.79 0-25.58.02-38.36 0C12.09 332.2.18 320.05.19 303.72q0-47.39-.11-94.77c-.01-17.27 11.68-29.17 28.94-29.22 30.07-.08 60.15-.02 90.22-.02H379.7q51.99 0 103.98.06c13.06.02 23.95 8.1 27.12 20.12a34.81 34.81 0 011.1 8.73c.07 31.6.02 63.19.05 94.78 0 16.78-11.87 28.8-28.62 28.8q-79.71.02-159.43 0H256zm.38-137.87v.02H100.56q-35.43 0-70.86.03c-9.41 0-14.7 5.2-14.7 14.51q-.02 47.04 0 94.08c0 9.36 5.19 14.5 14.66 14.53 7.32.03 14.64.01 21.96.01h249.64q90.38 0 180.77.04c9.92 0 14.93-4.86 15.08-14.84.13-8.07-.01-16.15 0-24.22l.01-69.56c0-9.18-5.31-14.58-14.37-14.58q-60.03-.04-120.06-.02H256.4z'
                    }
                />
                <path
                    d={
                        'M364 59.67a28.22 28.22 0 0128.5 28.82 28.56 28.56 0 01-57.12-.5A28.17 28.17 0 01364 59.66zm-.07 42.24a13.68 13.68 0 0013.76-13.74 13.81 13.81 0 10-13.76 13.74zM470.05 88.02a28.48 28.48 0 01-28.3 28.77 28.6 28.6 0 01-.57-57.18c15.94-.37 29.24 13.27 28.87 28.4zm-28.8 13.88a13.81 13.81 0 10-13.45-13.98 13.62 13.62 0 0013.46 13.98zM110.42 66.83c-2.5 0-5.02.08-7.52-.02-4.47-.19-7.64-3.27-7.67-7.3-.03-4.18 2.91-7.35 7.43-7.5 5.34-.18 10.69-.18 16.02 0 4.53.16 7.44 3.35 7.3 7.55-.13 4.15-3.24 7.12-7.71 7.26-2.62.08-5.23.02-7.85.01zM55.92 66.86c-2.62 0-5.25.1-7.86-.02a7.5 7.5 0 01-7.5-7.51 7.2 7.2 0 017.25-7.35c5.46-.2 10.93-.18 16.39.03a7.26 7.26 0 017.22 7.4 7.59 7.59 0 01-7.63 7.42c-2.62.1-5.25.02-7.87.02zM165.26 66.85c-2.62 0-5.25.09-7.87-.02a7.75 7.75 0 01-7.62-7.15 7.32 7.32 0 017.02-7.63 166.36 166.36 0 0117.03-.02c4.45.24 6.9 3.37 6.76 7.7-.13 4.08-3.06 6.94-7.45 7.12-2.62.1-5.25.02-7.87.02zM56.15 95.54c-2.73 0-5.47.12-8.2-.03-4.56-.25-7.45-3.29-7.36-7.51.1-4.16 3.18-7.16 7.69-7.24q7.68-.14 15.36 0c4.57.09 7.9 3.4 7.8 7.53-.1 4.04-3.37 7.13-7.76 7.25-2.5.07-5.02.01-7.53.01zM165.37 80.74c2.62 0 5.25-.1 7.87.02 4.44.19 7.27 3 7.36 7.16.1 4.31-2.4 7.28-6.9 7.5-5.55.26-11.14.25-16.7.04a7.45 7.45 0 01-7.23-7.42c.05-3.97 3.37-7.14 7.74-7.29 2.62-.08 5.24-.01 7.86-.01zM110.32 95.5c-2.62 0-5.25.12-7.86-.03-4.36-.27-7.27-3.33-7.25-7.38a7.27 7.27 0 017.36-7.28q8.03-.21 16.07 0a7.17 7.17 0 017.36 7.22c.1 4-2.82 7.1-7.15 7.44-1.41.11-2.84.04-4.26.05h-4.27zM219.56 66.83c-2.5 0-5.01.07-7.51-.02a7.41 7.41 0 01-7.4-6.85c-.27-4.15 2.28-7.62 6.56-7.86a151.27 151.27 0 0117.63.03c4.12.25 6.7 3.7 6.52 7.63a7.52 7.52 0 01-7.3 7.04c-2.82.14-5.66.03-8.5.03zM219.97 95.43c-2.83 0-5.67.15-8.49-.04a7.29 7.29 0 01-.04-14.54c5.65-.22 11.33-.21 16.98 0a7.3 7.3 0 01.04 14.57c-2.81.21-5.66.04-8.49.04zM220.06 109.6c2.73 0 5.47-.08 8.2.01a7.31 7.31 0 01.13 14.62c-5.57.18-11.14.2-16.7.01a7.06 7.06 0 01-7.13-7.4c.05-4.21 3.11-7.15 7.64-7.25 2.62-.05 5.24 0 7.86 0zM110.74 109.58c2.73 0 5.47-.08 8.2.02a7.18 7.18 0 017.09 7.11 6.97 6.97 0 01-6.69 7.46c-5.88.23-11.79.21-17.67-.03a6.98 6.98 0 01-6.46-7.34 7.17 7.17 0 016.7-7.16c2.93-.18 5.89-.04 8.83-.04zM165.49 109.61c2.72 0 5.45-.07 8.17.02a6.87 6.87 0 016.89 6.84c.2 4.17-2.28 7.45-6.35 7.62-5.98.25-11.97.2-17.95 0-3.65-.14-6.56-3.74-6.44-7.37a7.49 7.49 0 016.85-7.08l.65-.03h8.18zM56 124.17c-2.95 0-5.91.17-8.85-.05a6.88 6.88 0 01-6.51-7.23c.04-3.89 2.75-7.08 6.61-7.2 5.79-.2 11.6-.18 17.38 0a7.26 7.26 0 01-.1 14.48c-2.84.15-5.7.03-8.53.03zM470.06 423.87a28.68 28.68 0 01-28.46 28.7c-15.69.16-28.73-12.95-28.68-28.84a28.57 28.57 0 1157.14.14zm-42.27-.17a13.94 13.94 0 0013.53 14.06 13.85 13.85 0 10.34-27.7 13.75 13.75 0 00-13.87 13.64zM392.51 423.94a28.57 28.57 0 11-28.42-28.7c15.43.16 28.6 12.96 28.42 28.7zm-14.84-.18c-.1-7.98-6.13-13.8-14.31-13.8-6.9 0-13.44 6.83-13.41 14a14.21 14.21 0 0014.17 13.8 13.81 13.81 0 0013.55-14zM55.83 460.08c-2.73 0-5.46.1-8.19-.02a7.21 7.21 0 01-7.04-7.18c-.1-4.07 2.47-7.2 6.67-7.38 5.77-.25 11.57-.24 17.35-.07a7.09 7.09 0 016.8 7.38 7.43 7.43 0 01-7.07 7.24c-2.84.11-5.68.02-8.52.03zM165.4 460.09c-2.73 0-5.46.06-8.19-.02a7.6 7.6 0 01-7.44-7.26 7.27 7.27 0 017.2-7.39c5.45-.17 10.92-.18 16.37 0 4.76.14 7.36 3 7.25 7.48-.11 4.31-3.06 7.1-7.65 7.18-2.51.05-5.02.01-7.53 0zM219.93 387.82c2.84 0 5.68-.1 8.52.02a7.29 7.29 0 01.06 14.56c-5.67.17-11.36.19-17.03 0a7.3 7.3 0 01.25-14.6c2.73-.09 5.47 0 8.2 0zM55.84 431.24c-2.73 0-5.46.08-8.19-.02a7.14 7.14 0 01-7.03-7.47 6.83 6.83 0 016.98-7.1q8.34-.2 16.7 0a7.14 7.14 0 017.13 7.38 7.34 7.34 0 01-7.4 7.2h-8.19zM220.05 460.04c-2.73 0-5.47.07-8.2-.02a7.15 7.15 0 01-7.2-7.01c-.14-4.32 2.43-7.39 6.87-7.55 5.68-.2 11.37-.17 17.05.04a6.84 6.84 0 016.75 7.34 7.31 7.31 0 01-7.06 7.2l-.66.01h-7.55zM165.59 402.4c-2.85 0-5.7.1-8.53-.02a7.46 7.46 0 01-7.25-7.37 7.37 7.37 0 017.45-7.16c5.46-.08 10.93-.1 16.4.03 4.27.1 7 3.18 6.9 7.49-.1 4.12-2.85 6.77-7.11 6.87-1.31.04-2.62.19-3.93.23s-2.62 0-3.93 0zM110.6 402.45c-2.72 0-5.45.11-8.16-.02a7.3 7.3 0 01-7.24-7.67c.18-4.06 3.2-6.93 7.57-6.95q8.18-.04 16.37.18a6.85 6.85 0 016.9 7.16 7.1 7.1 0 01-6.6 7.23c-2.94.19-5.9.04-8.84.04zM219.96 431.21c-2.63 0-5.25.04-7.88 0a7.27 7.27 0 01-7.46-7.1c-.12-4.27 2.8-7.35 7.33-7.45q8.04-.16 16.08.01c4.55.1 7.48 3.23 7.33 7.5-.15 4.07-3.2 6.95-7.53 7.03-2.62.05-5.25.01-7.87.01zM56 387.83c2.73 0 5.47-.07 8.2.03a7.25 7.25 0 01.09 14.5q-8.35.22-16.71 0a7 7 0 01-6.92-7.53c.11-3.98 2.97-6.8 7.15-6.99 1.42-.06 2.84 0 4.26-.01H56zM165.2 431.25c-2.73 0-5.46.07-8.19-.03a7.2 7.2 0 01-.1-14.37c5.44-.18 10.9-.28 16.34-.21 4.68.06 7.4 2.92 7.35 7.35-.04 4.28-3.03 7.17-7.55 7.25-2.62.05-5.24.01-7.86 0zM110.57 416.65c2.73 0 5.46-.09 8.19.02 4.23.15 7.05 2.91 7.23 6.92a7.09 7.09 0 01-6.68 7.52c-6 .26-12.02.22-18.02-.02-3.36-.14-6.16-3.91-6.06-7.43a6.87 6.87 0 016.19-6.9c3.03-.23 6.1-.04 9.15-.04zM110.58 460.06c-2.74 0-5.47.08-8.2-.02a7.39 7.39 0 01-7.15-7.15 6.98 6.98 0 016.77-7.39c5.79-.21 11.59-.2 17.37 0a6.88 6.88 0 016.63 7.16 7.24 7.24 0 01-6.9 7.36c-2.83.13-5.68.02-8.52.02zM392.47 256.27c-.12 15.72-13.22 28.65-28.77 28.43a28.69 28.69 0 1128.77-28.43zm-14.84-.34a13.75 13.75 0 10-13.57 13.87 13.7 13.7 0 0013.57-13.87zM470.12 256.27c-.45 16.33-13.47 28.91-29.4 28.41a28.78 28.78 0 01-27.75-29.74c.52-15.52 13.93-28.18 29.24-27.59 15.84.61 28.33 13.55 27.9 28.92zm-42.36-.12a13.64 13.64 0 0013.83 13.64 14 14 0 0013.84-13.78 14.14 14.14 0 00-14.15-13.86 13.8 13.8 0 00-13.52 14zM110.64 219.91c2.73 0 5.46-.08 8.19.02a7.1 7.1 0 017.2 7.3 6.99 6.99 0 01-6.91 7.28q-8.5.27-17.03 0a7.11 7.11 0 01-6.9-7.3 7.2 7.2 0 017.27-7.3c2.72-.08 5.45-.01 8.18-.01zM220 292.12c-2.72 0-5.45.07-8.17-.02a7.15 7.15 0 01-7.2-6.95c-.16-4.24 2.5-7.43 6.78-7.58 5.66-.2 11.34-.19 17-.02a6.9 6.9 0 016.92 7.18 7.14 7.14 0 01-7.14 7.36c-2.73.1-5.45.02-8.18.03zM165.44 219.88c2.73 0 5.45-.08 8.18.02a6.87 6.87 0 016.94 7.13c.08 4.17-2.48 7.25-6.62 7.38-5.77.2-11.56.18-17.33.02a7.21 7.21 0 01-6.8-7.39 7.46 7.46 0 017.13-7.14c2.83-.1 5.67-.02 8.5-.02zM219.81 263.32c-2.73 0-5.46.09-8.19-.02a7.18 7.18 0 01-7.06-7.45 7.03 7.03 0 017.05-7.1q8.34-.15 16.69 0a7.08 7.08 0 017.07 7.4 7.18 7.18 0 01-7.04 7.17c-2.83.11-5.68.02-8.52.02zM55.88 292.14c-2.73 0-5.45.08-8.17-.02a7.14 7.14 0 01-7.1-7.04 6.98 6.98 0 016.95-7.48q8.5-.25 17 0a7.15 7.15 0 016.86 7.3 7.32 7.32 0 01-7.04 7.2c-2.83.12-5.67.03-8.5.03zM110.62 292.1c-2.83 0-5.67.1-8.5-.03a7.26 7.26 0 01-6.9-7.3 7 7 0 016.58-7.18c5.87-.2 11.77-.22 17.64 0a6.85 6.85 0 016.56 7.2 7.18 7.18 0 01-6.88 7.27c-2.83.13-5.67.03-8.5.03zM165.38 292.16c-2.72 0-5.45.06-8.18-.02a7.52 7.52 0 01-7.43-7.2 7.4 7.4 0 017.22-7.36c5.45-.14 10.9-.16 16.35-.02 4.6.12 7.35 3.11 7.25 7.49-.1 4.19-2.93 6.96-7.36 7.1-2.61.07-5.23 0-7.85 0zM165.54 248.75c2.73 0 5.47-.08 8.2.02a6.8 6.8 0 016.82 6.92c.11 4.19-2.48 7.4-6.53 7.53-5.79.19-11.6.17-17.38.01a7.3 7.3 0 01-6.84-7.4 7.42 7.42 0 017.2-7.06c2.84-.08 5.68-.02 8.53-.02zM110.57 263.3c-2.84 0-5.68.12-8.51-.02a7.22 7.22 0 01-6.86-7.33 7.04 7.04 0 016.97-7.2q8.5-.17 17.02.01a7.05 7.05 0 016.83 7.3 7.24 7.24 0 01-6.62 7.25c-1.52.11-3.05.04-4.58.04h-4.25zM55.97 219.88c2.73 0 5.47-.07 8.2.02a7.38 7.38 0 017.22 7.4 7.08 7.08 0 01-7.07 7.15c-5.46.14-10.93.18-16.4.02-4.63-.13-7.4-3.16-7.27-7.5.13-4.08 3.13-6.97 7.45-7.08 2.62-.06 5.25-.01 7.87-.01zM220.17 219.92c2.84 0 5.69-.12 8.52.03a6.96 6.96 0 016.62 6.5c.37 3.43-1.57 7.4-4.8 7.57a138.87 138.87 0 01-21.02-.41c-3.65-.36-5.3-3.9-4.83-7.57a7.07 7.07 0 016.67-6.1c2.94-.15 5.9-.03 8.84-.03zM56.25 248.76c2.72 0 5.45-.08 8.17.02a7.25 7.25 0 01.06 14.48c-5.56.13-11.12-.1-16.67.1-3.86.12-7.35-4.08-7.22-7.3a7.18 7.18 0 017.19-7.29c2.82-.08 5.64-.01 8.47-.01z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

Server.defaultProps = ({
    title: 'ServerIcon',
    size: null,
    color: null
}: DefaultProps);

export {Server};
