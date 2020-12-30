/** @flow */

const styles = (theme: any) => ({
    dynamicStyle: (props: any) => ({
        height: 100,
        margin: 20,
        backgroundColor: theme.primaryColor,
        color: theme.secondaryColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `5px solid ${props.myBorderColor}`
    }),
    mixedValues: {
        width: (props: any) => props.myWidth,
        opacity: (props: any) => (props.toggle ? 1 : 0),
        outline: '#4caf50 solid 10px'
    },
    staticStyle: {
        fontFamily: 'Jura',
        fontSize: 22,
        flexShrink: 0
    }
});

const lightTheme = {
    primaryColor: '#ff11ff',
    secondaryColor: '#ffff00'
};
const darkTheme = {
    primaryColor: '#441133',
    secondaryColor: '#445500'
};

export {styles, lightTheme, darkTheme};
