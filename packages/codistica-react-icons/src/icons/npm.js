/** @flow */

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

function NPM(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={'M152.24 345.38v-28.15H10v-150.6h492v150.6l-255.8.07v28.08z'}
                fill={backgroundColor || '#ffffff'}
            />
            <g fill={color || '#d50302'}>
                <path
                    d={
                        'M0 156.43c1.98.13 3.96.39 5.94.39q250.06.03 500.12 0c1.98 0 3.96-.26 5.94-.4v171l-248.94.08h-6.86v28.07H142.24v-28.14H0zM426.83 214h28.45v84.8h28.01V185.66H313.23v113.01h56.9v-84.64h28.2v84.64h28.5zm-199.21 85.13h56.54V185.65H171.07v141.57h56.55zM114.1 213.9v84.85h27.69V185.73H28.88V298.7h56.55v-84.8z'
                    }
                />
                <path d={'M255.68 270.29h-27.85v-56.3h27.85z'} />
            </g>
        </SvgIcon>
    );
}

NPM.defaultProps = ({
    title: 'NPMIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {NPM};
