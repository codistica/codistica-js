import {createSophistication} from '../../../../src/index.js';

const arrow = {
    animation: '$blink 0.3s linear none infinite',
    border: 'solid #000000',
    borderWidth: '0 9px 9px 0',
    display: 'inline-block',
    padding: 3
};

const useSophistication = createSophistication({
    root: {
        height: '100%',
        width: '100%'
    },
    track: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 5000,
        width: 5000
    },
    item: {
        display: 'inline-flex',
        height: 200,
        width: 400,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1000
    },
    target: {
        fontSize: 0,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #ff0000',
        height: 30,
        width: 30,
        '& > span': {
            display: 'inline-block',
            height: 5,
            width: 5,
            backgroundColor: '#ff0000'
        }
    },
    viewportTarget: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        opacity: 0.5,
        zIndex: 100
    },
    dataBox: {
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '20px 40px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#ffffff',
        '& p': {
            margin: 0
        },
        '& p:first-child': {
            marginTop: 10
        },
        '& p:last-child': {
            marginBottom: 10
        },
        minWidth: 200
    },
    startScrolling: {
        animation: '$blink 0.6s linear none infinite'
    },
    arrowTop: {
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        '& > i': {
            ...arrow,
            transform: 'rotate(-135deg)'
        }
    },
    arrowRight: {
        position: 'fixed',
        right: '10%',
        top: '50%',
        transform: 'translateY(-50%)',
        '& > i': {
            ...arrow,
            transform: 'rotate(-45deg)'
        }
    },
    arrowBottom: {
        position: 'fixed',
        bottom: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        '& > i': {
            ...arrow,
            transform: 'rotate(45deg)'
        }
    },
    arrowLeft: {
        position: 'fixed',
        left: '10%',
        top: '50%',
        transform: 'translateY(-50%)',
        '& > i': {
            ...arrow,
            transform: 'rotate(135deg)'
        }
    },
    blink: {
        animation: '$blink 0.3s linear none infinite'
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
});

export {useSophistication};
