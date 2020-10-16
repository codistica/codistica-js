import {
    Box,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    makeStyles
} from '@material-ui/core';
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import React, {Fragment} from 'react';

// TODO: WORK IN PROGRESS.

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset'
        }
    }
});

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {date: '2020-01-05', customerId: '11091700', amount: 3},
            {date: '2020-01-02', customerId: 'Anonymous', amount: 1}
        ]
    };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
];

function CollapsibleRow(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton size='small' onClick={() => setOpen(!open)}>
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>

                <TableCell component='th' scope='row'>
                    {row.name}
                </TableCell>

                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell
                    style={{paddingBottom: 0, paddingTop: 0}}
                    colSpan={6}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box margin={1}>
                            <Typography
                                variant='h6'
                                gutterBottom
                                component='div'>
                                History
                            </Typography>

                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align='right'>
                                            Amount
                                        </TableCell>
                                        <TableCell align='right'>
                                            Total price ($)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell
                                                component='th'
                                                scope='row'>
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.customerId}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {historyRow.amount}
                                            </TableCell>
                                            <TableCell align='right'>
                                                {Math.round(
                                                    historyRow.amount *
                                                        row.price *
                                                        100
                                                ) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align='right'>Calories</TableCell>
                        <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                        <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                        <TableCell align='right'>Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <CollapsibleRow key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export {CollapsibleTable};
