/** @flow */

// TODO: WORK IN PROGRESS. DOES THIS MAKE SENSE?

import {LoadingBar} from '@codistica/core';
import {mergeClassNames} from '@codistica/react';
import {
    LinearProgress as MUILinearProgress,
    Box,
    Typography
} from '@material-ui/core';
import React, {useEffect, useRef, useCallback, useState} from 'react';
import {useStyles} from './index.styles.js';

type Props = {
    eta: number | null,
    inertia: number,
    containerProps: {[string]: any},
    classes: {[string]: string}
};

function LinearProgress(props: Props) {
    const {eta, inertia, containerProps, classes, ...other} = props;
    const componentClasses = useStyles();
    const [currentPercent, setCurrentPercent] = useState(0);
    const loadingBarRef = useRef(null);

    const callback = useCallback((newPercent) => {
        setCurrentPercent(newPercent);
    }, []);

    useEffect(() => {
        loadingBarRef.current = new LoadingBar({
            inertia: inertia,
            callback: callback
        });
    }, [inertia, callback]);

    useEffect(() => {
        if (loadingBarRef.current && typeof eta === 'number') {
            const loadingBar = loadingBarRef.current;
            loadingBar.setEta(eta);
            loadingBar.start();
        }
    }, [eta]);

    return (
        <Box display={'flex'} alignItems={'center'}>
            <Box width={'100%'} mr={1}>
                <MUILinearProgress
                    variant={'determinate'}
                    value={currentPercent}
                />
            </Box>
            <Box minWidth={35}>
                <Typography
                    variant={'body2'}
                    color={'textSecondary'}>{`${Math.round(
                    currentPercent
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgress.defaultProps = {
    eta: null,
    inertia: 1,
    containerProps: {},
    classes: {}
};

export {LinearProgress};
