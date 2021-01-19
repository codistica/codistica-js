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

function Target(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M290.28 232.8c29.16 40.25 13.96 84.47-12.95 104.72a73.31 73.31 0 01-96.31-6.53c-25.95-25.88-28.52-66.97-6.4-96.34 21.03-27.93 65.51-40.47 100.34-15.78 13.17-12.1 26.05-23.91 38.82-35.84.8-.74.96-2.46.94-3.72-.33-21-1.25-42.01-.86-63 .17-8.8 4.86-16.68 11.26-23.09q43.42-43.44 86.85-86.85c4.58-4.57 9.65-7.9 16.45-5.65 7.15 2.35 9.05 8.48 9.77 15.02 1.4 12.62 2.59 25.27 3.73 37.92.72 8.08 2.21 9.75 10.53 10.59q19.26 1.93 38.53 3.75c6.1.57 11.44 2.59 13.9 8.59 2.55 6.23.38 11.73-4.16 16.27-29.63 29.68-59.2 59.42-89.02 88.9-7.63 7.54-17.44 10.96-28.17 11.05-16.89.13-33.78-.03-50.67.05-1.64 0-3.8.25-4.83 1.28-12.7 12.81-25.24 25.79-37.75 38.65zm-26.02 1.4c-19.67-17.27-54.7-12.75-73.5 8.84a55.57 55.57 0 0084.14 72.6c19.85-22.82 15.64-55.42 1.33-69.3-1.5 1.84-2.87 3.81-4.51 5.52-10.34 10.74-20.57 21.59-31.23 32-2.26 2.2-6.32 4.09-9.27 3.74-7.58-.9-9.52-9.43-3.72-15.5 12.06-12.63 24.31-25.08 36.76-37.9zM421.03 23.37a19.24 19.24 0 00-2.47 1.55c-27.14 27.1-54.45 54.04-81.18 81.54-3.61 3.72-5.7 10.17-6.08 15.52-.89 12.46-.32 25.02-.28 37.54a33.7 33.7 0 00.54 4.28l1.46.76a67.5 67.5 0 014.42-5.6c26.13-26.98 52.1-54.12 78.62-80.72 6.83-6.86 11.07-13 8.58-23.42-2.38-9.92-2.44-20.4-3.6-31.45zm-74.08 151.62c14.3 0 27 .65 39.57-.32 4.87-.38 10.44-3.4 14.03-6.92 26.7-26.13 53-52.68 79.38-79.12a26.37 26.37 0 002.5-3.7l-5.99-.62c-10.85-1.17-21.76-1.98-32.53-3.68-3.88-.62-6.08.12-8.66 2.8q-41.83 43.31-83.84 86.45c-1.2 1.24-2.28 2.6-4.46 5.11z'
                    }
                />
                <path
                    d={
                        'M312.94 73.35c-3.74 4.44-6.91 8.78-10.75 12.43-1.13 1.08-4.3.73-6.25.13a214.3 214.3 0 00-69.27-9.7C127.81 78.9 42.48 153.23 26.75 250.35 8.67 361.9 78.5 465.75 189.42 489.78c100.94 21.87 198.7-32.94 236.5-124.47 21.96-53.16 21.66-106.68-.02-159.97-1.43-3.5-1.15-5.62 1.73-8.15 3.23-2.83 5.84-6.35 9-9.9 38 72.63 33.54 187.74-50.72 265.54-81.69 75.43-208.77 79.25-296.15 8.51C2.03 390.32-19.92 264.08 38.99 167.7 99.65 68.47 218.03 36.66 312.94 73.35z'
                    }
                />
                <path
                    d={
                        'M290.88 156.56c-36.67-15.82-72.45-17.24-108.4-2.95-28.29 11.25-50.3 30.2-65.88 56.28-31.82 53.26-23.68 119.76 19.78 164.25a135.37 135.37 0 00212.42-25.05A133.79 133.79 0 00368.3 283c.78-23.86-4.95-46.34-15.8-67.6a8.18 8.18 0 011.71-.5c21.77.6 16.9-4.97 24.08 16.67 29.3 88.22-27.24 182.37-118.65 198.47-85.12 14.98-165.82-43.3-178.45-128.88-11.97-81.1 42.97-157.54 124.01-172.45a154.03 154.03 0 0179.82 6.37c4.43 1.54 6.52 3.65 5.96 8.54-.46 3.9-.1 7.88-.1 12.93z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

Target.defaultProps = ({
    title: 'TargetIcon',
    size: null,
    color: null
}: DefaultProps);

export {Target};