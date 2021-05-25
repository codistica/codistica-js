/** @flow */

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
    keys: {[string]: string} | Array<string>,
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
                    <TableRow>
                        {getRowElements(
                            Array.isArray(keys) ? keys : Object.values(keys)
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            {getRowElements(
                                (Array.isArray(keys)
                                    ? keys
                                    : Object.keys(keys)
                                ).map((key) => item[key])
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    );
}

export {SimpleTable};
