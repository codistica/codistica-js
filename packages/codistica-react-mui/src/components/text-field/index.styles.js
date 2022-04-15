import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& fieldset, & label + div::before, & label + div::after': {
            borderWidth: 2,
            transition: 'border-color 0.2s linear'
        }
    },
    valid: {
        '& fieldset, & label + div::before, & label + div::after': {
            borderColor: `${
                theme.palette.success[theme.palette.type]
            }!important`
        }
    },
    invalid: {
        '& fieldset, & label + div::before, & label + div::after': {
            borderColor: `${theme.palette.error[theme.palette.type]}!important`
        }
    },
    highlight: {
        '& fieldset, & label + div::before, & label + div::after': {
            animation: '$blink 0.3s linear none 3',
            borderColor: `${theme.palette.info[theme.palette.type]}!important`
        }
    },
    warning: {
        '& fieldset, & label + div::before, & label + div::after': {
            animation: '$blink 0.3s linear none 3',
            borderColor: `${
                theme.palette.warning[theme.palette.type]
            }!important`
        }
    },
    standBy: {
        '& input:focus + fieldset, & .Mui-focused + div::before, & .Mui-focused + div::after':
            {
                borderColor: `${theme.palette.action.focus}!important`
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
