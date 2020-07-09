import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    switchBase: {
        transition: 'color 0.2s linear'
    },
    valid: {
        color: `${theme.palette.success[theme.palette.type]}!important`
    },
    invalid: {
        color: `${theme.palette.error[theme.palette.type]}!important`
    },
    highlight: {
        animation: '$blink 0.3s linear none 3',
        color: `${theme.palette.info[theme.palette.type]}!important`
    },
    warning: {
        animation: '$blink 0.3s linear none 3',
        color: `${theme.palette.warning[theme.palette.type]}!important`
    },
    standBy: {
        '& input:focus + span': {
            color: `${theme.palette.action.focus}!important`
        }
    },
    '@keyframes blink': {
        '0%': {
            opacity: 1
        },
        '50%': {
            opacity: 0.5
        },
        '100%': {
            opacity: 1
        }
    }
}));

export {useStyles};
