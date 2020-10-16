/** @flow */

/** @module react-mui/components/simple-table */

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import React, {Fragment, useCallback} from 'react';

type Props = {
    title: string,
    keys: Array<string>,
    data: Array<{[string]: string | number | void}>
};

function SimpleTable(props: Props) {
    const {title, keys, data} = props;

    const getRowElements = useCallback((dataArray) => {
        return dataArray.map((str, index) => (
            <TableCell
                key={index}
                align={index < dataArray.length - 1 ? 'left' : 'right'}>
                {str}
            </TableCell>
        ));
    }, []);

    return (
        <Fragment>
            <Typography
                component={'h2'}
                variant={'h6'}
                color={'primary'}
                gutterBottom>
                {title}
            </Typography>
            <Table size={'small'}>
                <TableHead>
                    <TableRow>{getRowElements(keys)}</TableRow>
                </TableHead>
                <TableBody>
                    {data.map((entry, index) => (
                        <TableRow key={index}>
                            {getRowElements(Object.values(entry))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    );
}

export {SimpleTable};
