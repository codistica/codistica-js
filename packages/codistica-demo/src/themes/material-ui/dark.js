/** @flow */

import {createMuiTheme} from '@material-ui/core/styles';

const dark = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#dededd',
            contrastText: '#333333'
        },
        secondary: {
            main: '#8cc63f'
        },
        success: {
            main: '#8cc63f'
        },
        error: {
            main: '#bb2222'
        },
        info: {
            main: '#dededd'
        },
        warning: {
            main: '#eeee22'
        },
        action: {
            focus: '#e88b0e'
        },
        text: {
            primary: 'rgba(222, 222, 222, 0.87)',
            secondary: 'rgba(222, 222, 222, 0.54)',
            disables: 'rgba(222, 222, 222, 0.38)',
            hint: 'rgba(222, 222, 222, 0.38)'
        },
        background: {
            paper: '#020024',
            generic: '#172839'
        },
        icon: '#dededd'
    },
    typography: {
        fontFamily: [
            'jura-codistica',
            'Jura',
            'Futura',
            'Helvetica',
            'sans-serif'
        ].join(',')
    }
});

export {dark};
