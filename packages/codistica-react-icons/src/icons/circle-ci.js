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

function CircleCI(props: Props) {
    return (
        <SvgIcon {...props}>
            <g>
                <ellipse
                    cx={'252.29'}
                    cy={'256'}
                    rx={'61.59'}
                    ry={'60.71'}
                    fill={'#37474f'}
                />
                <path
                    d={
                        'M.74,191.63c0,.74-.74,2.2-.74,2.93A12.41,12.41,0,0,0,12.61,207H117.24c5.19,0,8.9-2.92,11.13-7.31,21.52-46.81,69-78.26,123.18-78.26,74.94,0,135.79,60,135.79,133.85S326.49,389.12,251.55,389.12a136.21,136.21,0,0,1-123.18-77.53c-2.23-5.12-5.94-8-11.13-8H12.62A12.43,12.43,0,0,0,0,316c0,.73,0,2.19.74,2.92C29.68,430.08,131.34,512,252.29,512,395.5,512,512,397.16,512,256S395.5,0,252.29,0C131.34,0,29.68,81.92.74,191.63Z'
                    }
                    fill={'#37474f'}
                />
            </g>
        </SvgIcon>
    );
}

CircleCI.defaultProps = ({
    title: 'CircleCIIcon',
    size: null,
    color: null
}: DefaultProps);

export {CircleCI};
