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

function Webpack(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M128.15 174.1l14.23-7.85q55.6-30.58 111.17-61.18a4.26 4.26 0 014.72-.08q61.86 34.13 123.78 68.14c.58.32 1.12.68 1.69 1.03-.38.94-1.26 1.13-1.95 1.53q-61.93 35.78-123.85 71.58a3.5 3.5 0 01-4.05-.06q-62-35.88-124.06-71.7a3.17 3.17 0 01-1.69-1.41zM246.85 399.46a5.75 5.75 0 01-2.58-1.05q-61.47-33.79-122.97-67.54a3.73 3.73 0 01-2.22-3.87q.07-66.72.04-133.44a7.12 7.12 0 01.19-2.55c1.08-.24 1.8.59 2.6 1.05q23.24 13.38 46.45 26.81 38.18 22.05 76.37 44.06a3.7 3.7 0 012.16 3.68q-.08 65.36-.04 130.71zM265 399.43v-2.42q0-65.1-.04-130.19a3.83 3.83 0 012.17-3.9q61.65-35.49 123.24-71.1c.63-.36 1.28-.67 1.89-.99.68.52.47 1.14.47 1.67q.01 67.58.05 135.16c0 1.77-.85 2.42-2.15 3.13q-38.2 20.96-76.37 41.98l-46.78 25.7a4.64 4.64 0 01-2.48.96z'
                }
                fill={color || '#1c78c0'}
            />
            <path
                d={
                    'M487 136.53V381.3c-1.08.14-1.76-.54-2.53-.98q-13.54-7.82-27.06-15.66l-29.85-17.29c-4.8-2.77-9.56-5.6-14.42-8.26a3.4 3.4 0 01-2.14-3.43q.08-76.79 0-153.57a3.54 3.54 0 012.13-3.49q21.43-12.26 42.8-24.62 14.84-8.55 29.67-17.12a1.5 1.5 0 011.4-.34zM25 136.1l16.46 9.5 21.5 12.4 24.08 13.86c3.87 2.23 7.7 4.54 11.62 6.67a3.67 3.67 0 012.26 3.66q-.08 76.79 0 153.57a3.26 3.26 0 01-2 3.26C89.66 344.3 80.44 349.66 71.2 355l-24.3 14-20.4 11.82a1.95 1.95 0 01-1.5.47zM33.77 120.05l9.45-5.42L80.35 93.6c9.58-5.41 19.19-10.77 28.76-16.19q15.87-8.97 31.71-18 11.98-6.8 23.98-13.55l28.71-16.27c8.42-4.76 16.88-9.47 25.3-14.24 7.92-4.47 15.82-9 23.73-13.48 1-.57 2.02-1.12 3.06-1.64.78-.38 1.29-.14 1.34.78.03.58.02 1.16.02 1.74q0 41.36.04 82.73a3.57 3.57 0 01-2.16 3.66c-11.05 5.99-22.03 12.11-33.05 18.17-9.2 5.06-18.44 10.07-27.64 15.13-10.65 5.86-21.28 11.77-31.93 17.64-7.31 4.03-14.66 8.01-21.98 12.04-6.23 3.42-12.47 6.84-18.67 10.33a3.9 3.9 0 01-4.49.05c-10.38-6.15-20.86-12.16-31.32-18.2q-16.86-9.73-33.75-19.43c-2.65-1.52-5.27-3.08-8.24-4.82zM478.14 120.03c-3.05 1.8-5.81 3.44-8.6 5.05q-17.06 9.88-34.15 19.74c-10.1 5.83-20.22 11.6-30.28 17.5a4.37 4.37 0 01-4.98.04c-9-5.1-18.07-10.06-27.12-15.05-7.03-3.87-14.08-7.71-21.1-11.58l-34.14-18.79q-10.43-5.74-20.88-11.46-15.23-8.37-30.47-16.7a2.51 2.51 0 01-1.48-2.56c.05-4.8.02-9.6.02-14.4V0c1.99.38 34.97 18.93 53.34 29.59 17.67 10.25 35.54 20.15 53.32 30.21l53.13 30.06 53.4 30.17zM39.44 394.46l7.63-4.44 46.8-27.09c7.38-4.26 14.81-8.42 22.17-12.72a2.36 2.36 0 012.7-.05q10.72 5.98 21.48 11.9 7.93 4.38 15.87 8.73l34.13 18.8c7.1 3.9 14.23 7.77 21.33 11.68 11.16 6.14 22.3 12.32 33.48 18.42a3.3 3.3 0 011.96 3.34c-.06 8.03-.03 16.06-.03 24.1v61.86a8.67 8.67 0 01-.14 2.59 2 2 0 01-.34.18.39.39 0 01-.23-.02c-.75-.35-1.52-.67-2.23-1.08q-102.15-57.78-204.28-115.6c-.1-.06-.14-.27-.3-.6zM472.37 394.95L265.43 512a3.97 3.97 0 01-.46-2.7l-.05-86.21a3.38 3.38 0 012.02-3.48c5.77-3.08 11.46-6.3 17.18-9.45l33.25-18.32c7.18-3.95 14.37-7.86 21.55-11.81q16.3-8.98 32.59-17.98c7.1-3.9 14.22-7.78 21.31-11.7a2.92 2.92 0 013.36.01c10.48 6.17 21.02 12.22 31.55 18.3q16.87 9.73 33.76 19.43l9.67 5.58c.49.28 1.06.5 1.2 1.28z'
                }
                fill={color || '#8ed6fb'}
            />
        </SvgIcon>
    );
}

Webpack.defaultProps = ({
    title: 'WebpackIcon',
    size: null,
    color: null
}: DefaultProps);

export {Webpack};