/** @flow */

import {randomizer, stringUtils} from '@codistica/core';
import {createSophistication} from '@codistica/react';
import {default as centered} from '@storybook/addon-centered/react';
import React, {useState, Fragment} from 'react';
import {
    AdjustmentTools as AdjustmentToolsIcon,
    AndroidMessages as AndroidMessagesIcon,
    ArrowBack1 as ArrowBack1Icon,
    ArrowBack2 as ArrowBack2Icon,
    ArrowBack3 as ArrowBack3Icon,
    AWS as AWSIcon,
    Babel as BabelIcon,
    Bitbucket as BitbucketIcon,
    C as CIcon,
    Camera as CameraIcon,
    Cancel as CancelIcon,
    Cart as CartIcon,
    Cd as CdIcon,
    CircleCI as CircleCIIcon,
    Circuit as CircuitIcon,
    Cloudflare as CloudflareIcon,
    Codistica as CodisticaIcon,
    CPlusPlus as CPlusPlusIcon,
    Cpu as CpuIcon,
    CSS as CSSIcon,
    ESLint as ESLintIcon,
    EthernetPort as EthernetPortIcon,
    Facebook1 as Facebook1Icon,
    Facebook2 as Facebook2Icon,
    FacebookMessenger as FacebookMessengerIcon,
    Fingerprint as FingerprintIcon,
    GitHub as GitHubIcon,
    Grandstream as GrandstreamIcon,
    Hdd as HddIcon,
    HeartAtom as HeartAtomIcon,
    HTML as HTMLIcon,
    Http as HttpIcon,
    Instagram1 as Instagram1Icon,
    Instagram2 as Instagram2Icon,
    Internet as InternetIcon,
    IOSMail as IOSMailIcon,
    IOSMessages as IOSMessagesIcon,
    Java as JavaIcon,
    JS as JSIcon,
    Keys as KeysIcon,
    LinkedIn1 as LinkedIn1Icon,
    LinkedIn2 as LinkedIn2Icon,
    Magnifier as MagnifierIcon,
    Matlab as MatlabIcon,
    MobileDevices as MobileDevicesIcon,
    Mocha as MochaIcon,
    Molecule as MoleculeIcon,
    MongoDB as MongoDBIcon,
    MouseDown as MouseDownIcon,
    Nginx as NginxIcon,
    Node as NodeIcon,
    NPM as NPMIcon,
    ObjectiveC as ObjectiveCIcon,
    ParabolicAntenna as ParabolicAntennaIcon,
    Python as PythonIcon,
    RadioAntenna as RadioAntennaIcon,
    ReactJS as ReactJSIcon,
    Server as ServerIcon,
    Skype as SkypeIcon,
    SmartKey as SmartKeyIcon,
    Swift as SwiftIcon,
    Target as TargetIcon,
    Team as TeamIcon,
    Telegram as TelegramIcon,
    Thunder1 as Thunder1Icon,
    Thunder2 as Thunder2Icon,
    Twitter1 as Twitter1Icon,
    Twitter2 as Twitter2Icon,
    Ubiquiti as UbiquitiIcon,
    Vision as VisionIcon,
    Webpack as WebpackIcon,
    WhatsApp1 as WhatsApp1Icon,
    WhatsApp2 as WhatsApp2Icon,
    WifiSignal as WifiSignalIcon,
    WritingTools as WritingToolsIcon,
    YouTube as YouTubeIcon
} from '../../src/index.js';

const useSophistication = createSophistication({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icons(data) {
        return {
            margin: '50px 200px',
            textAlign: 'center',
            '& svg': {
                height: 100,
                width: 100
            },
            '& span': {
                width: 100,
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 10
            },
            '& p': {
                color: data.textColor
            }
        };
    },
    buttons: {
        position: 'fixed',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        '& > button': {
            margin: 10
        }
    }
});

const icons = [
    AdjustmentToolsIcon,
    AndroidMessagesIcon,
    ArrowBack1Icon,
    ArrowBack2Icon,
    ArrowBack3Icon,
    AWSIcon,
    BabelIcon,
    BitbucketIcon,
    CIcon,
    CameraIcon,
    CancelIcon,
    CartIcon,
    CdIcon,
    CircleCIIcon,
    CircuitIcon,
    CloudflareIcon,
    CodisticaIcon,
    CPlusPlusIcon,
    CpuIcon,
    CSSIcon,
    ESLintIcon,
    EthernetPortIcon,
    Facebook1Icon,
    Facebook2Icon,
    FacebookMessengerIcon,
    FingerprintIcon,
    GitHubIcon,
    GrandstreamIcon,
    HddIcon,
    HeartAtomIcon,
    HTMLIcon,
    HttpIcon,
    Instagram1Icon,
    Instagram2Icon,
    InternetIcon,
    IOSMailIcon,
    IOSMessagesIcon,
    JavaIcon,
    JSIcon,
    KeysIcon,
    LinkedIn1Icon,
    LinkedIn2Icon,
    MagnifierIcon,
    MatlabIcon,
    MobileDevicesIcon,
    MochaIcon,
    MoleculeIcon,
    MongoDBIcon,
    MouseDownIcon,
    NginxIcon,
    NodeIcon,
    NPMIcon,
    ObjectiveCIcon,
    ParabolicAntennaIcon,
    PythonIcon,
    RadioAntennaIcon,
    ReactJSIcon,
    ServerIcon,
    SkypeIcon,
    SmartKeyIcon,
    SwiftIcon,
    TargetIcon,
    TeamIcon,
    TelegramIcon,
    Thunder1Icon,
    Thunder2Icon,
    Twitter1Icon,
    Twitter2Icon,
    UbiquitiIcon,
    VisionIcon,
    WebpackIcon,
    WhatsApp1Icon,
    WhatsApp2Icon,
    WifiSignalIcon,
    WritingToolsIcon,
    YouTubeIcon
];

/**
 * @description An all icons demo.
 * @returns {Object<string,*>} React component.
 */
function AllIcons() {
    const [iconsColor, setIconsColor] = useState(null);
    const [iconsBackgroundColor, setIconsBackgroundColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#ffffff');
    const jssClassNames = useSophistication({textColor});
    return (
        <Fragment>
            <div className={jssClassNames.root}>
                <div className={jssClassNames.icons}>
                    {icons.map((Icon, index) => {
                        const icon = (
                            <Icon
                                color={iconsColor}
                                backgroundColor={iconsBackgroundColor}
                            />
                        );
                        return (
                            <span key={index}>
                                {icon}
                                <p>
                                    {stringUtils.toTitleCase(icon.props.title)}
                                </p>
                            </span>
                        );
                    })}
                </div>

                <div className={jssClassNames.buttons}>
                    <button
                        onClick={() => {
                            setIconsColor(null);
                        }}>
                        {'Default Fill'}
                    </button>
                    <button
                        onClick={() => {
                            setIconsColor('#dededd');
                        }}>
                        {'B/W Fill'}
                    </button>
                    <button
                        onClick={() => {
                            setIconsColor(randomizer.getHEXColor());
                        }}>
                        {'Random Fill'}
                    </button>
                    <button
                        onClick={() => {
                            if (iconsBackgroundColor === '#ffffff') {
                                setIconsBackgroundColor('none');
                            } else {
                                setIconsBackgroundColor('#ffffff');
                            }
                        }}>
                        {'Toggle Icons Background'}
                    </button>
                    <button
                        onClick={() => {
                            if (textColor === '#ffffff') {
                                setTextColor('#000000');
                            } else {
                                setTextColor('#ffffff');
                            }
                        }}>
                        {'Toggle Text Color'}
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

const meta = {
    title: 'Icons',
    parameters: {
        backgrounds: {
            default: 'Dark'
        }
    },
    decorators: [centered]
};

export {AllIcons};
export default meta;
