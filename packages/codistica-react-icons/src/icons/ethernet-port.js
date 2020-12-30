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

function EthernetPort(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M0 436.81V75.2h512V436.8zm453.03-251.9h-88.55v-51.52h-31.52v-30.27H178.91v30.48H147.3v51.53H59.1v223.72h393.93zM30.59 103.07v60.29h93.97v-60.29zm356.7 60.27h94.07v-60.17H387.3z'
                    }
                />
                <path
                    d={
                        'M248.13 368.62h-17.6v-71.35h17.6zM263.8 368.6v-71.37h17.68v71.37zM347.67 368.63h-17.53v-71.47h17.53zM197.35 368.61v-71.4h17.58v71.4zM314.62 368.66H297v-71.45h17.63zM380.97 368.66h-17.51v-71.48h17.5zM131.17 297.18h17.4v71.4h-17.4zM181.83 368.65H164.3v-71.5h17.53z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

EthernetPort.defaultProps = ({
    title: 'EthernetPortIcon',
    size: null,
    color: null
}: DefaultProps);

export {EthernetPort};
