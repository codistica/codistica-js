const BGS = {
    LIGHT: {name: 'LIGHT', value: '#dedede'},
    DARK: {name: 'DARK', value: '#333333'},
    TWITTER: {name: 'TWITTER', value: '#00aced'},
    FACEBOOK: {name: 'FACEBOOK', value: '#3b5998'}
};

const BGS_LIGHT = [
    {...BGS.LIGHT, default: true},
    BGS.DARK,
    BGS.TWITTER,
    BGS.FACEBOOK
];

const BGS_DARK = [
    BGS.LIGHT,
    {...BGS.DARK, default: true},
    BGS.TWITTER,
    BGS.FACEBOOK
];

export {BGS_LIGHT, BGS_DARK};
