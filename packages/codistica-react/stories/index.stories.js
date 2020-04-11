'use strict';

import {LogBrowserConsoleBinder} from '@codistica/browser';
import {log} from '@codistica/core';
import {storiesOf, addParameters} from '@storybook/react';
import React from 'react';

// COMPONENTS
import {Button} from '../src/components/button/index.js';
import {DotNavigation} from '../src/components/dot-navigation/index.js';
import {Input} from '../src/components/input/index.js';

// PLUGINS
import {InputBlockers} from '../src/plugins/input-blockers.js';
import {InputFilters} from '../src/plugins/input-filters.js';
import {InputPresets} from '../src/plugins/input-presets.js';
import {InputValidators} from '../src/plugins/input-validators.js';

// DEMOS // TODO: USE LETTER INDEXES TO IDENTIFY SUB DEMOS?
import {DraggableDemo} from './demos/draggable/index.js';
import {FormDemo} from './demos/form/index.js';
import {SlideDemoFullScreen} from './demos/slide/full-screen/index.js';
import {SlideDemoSimple} from './demos/slide/simple/index.js';
import {SlideDemoViewportChildren} from './demos/slide/viewport-children/index.js';

// SETUP LOG // TODO: PLACE MORE GLOBALLY?
log.setConsoleBinder(new LogBrowserConsoleBinder());
log.info('index.stories.js', 'LOG HAS BEEN CONNECTED')(); // TODO: LOG AUTOMATICALLY FROM CLASS
log.options.logLvl = 9; // TODO: MAKE SETTER TO PRINT NEW VALUE
log.options.callerSize = 30; // TODO: MAKE SETTER TO PRINT NEW VALUE

// BACKGROUNDS
const BGS = {
    LIGHT: {name: 'LIGHT', value: '#dedede'},
    DARK: {name: 'DARK', value: '#333333'},
    TWITTER: {name: 'TWITTER', value: '#00aced'},
    FACEBOOK: {name: 'FACEBOOK', value: '#3b5998'}
};

const BGS_LIGHT = {
    backgrounds: [
        {...BGS.LIGHT, default: true},
        BGS.DARK,
        BGS.TWITTER,
        BGS.FACEBOOK
    ]
};

const BGS_DARK = {
    backgrounds: [
        BGS.LIGHT,
        {...BGS.DARK, default: true},
        BGS.TWITTER,
        BGS.FACEBOOK
    ]
};

addParameters({...BGS_LIGHT});

// TODO: ADD RESET CSS TO STORYBOOK. REMOVE MARGINS
// TODO: ADD STORIES FONTS GLOBALLY HERE. OTHER GLOBAL CSS AND JS TOO. GLOBAL RESET CSS (APART OF COMPONENTS OWN RESET CSS). // TODO: PLACE MORE GLOBALLY?

storiesOf('@codistica-react', module).add('Welcome', () => (
    <div>WELCOME - Add Info Here</div>
));

storiesOf('Demos/Form/Dark', module)
    .addParameters({...BGS_DARK})
    .add('Dark Form', () => <FormDemo />);

storiesOf('Demos/Slide', module)
    .add('Simple', () => <SlideDemoSimple />)
    .add('Viewport Children', () => <SlideDemoViewportChildren />)
    .add('Full Screen', () => <SlideDemoFullScreen />);

storiesOf('Demos/Draggable', module).add('Simple Draggable', () => (
    <DraggableDemo />
));

storiesOf('Input/Light', module)
    .addParameters({...BGS_DARK})
    .add('Only Numbers', () => (
        <Input
            placeholder={'Only Numbers'}
            filters={InputFilters.onlyNumbers}
            blockers={InputBlockers.onlyNumbers}
        />
    ))
    .add('Only Letters', () => (
        <Input
            placeholder={'Only Letters'}
            filters={InputFilters.onlyLetters}
            blockers={InputBlockers.onlyLetters}
        />
    ))
    .add('No Specials', () => (
        <Input
            placeholder={'No Specials'}
            filters={InputFilters.noSpecials}
            blockers={InputBlockers.noSpecials}
        />
    ))
    .add('Pretty Input', () => (
        <Input placeholder={'Pretty Input'} presets={InputPresets.prettify} />
    ))
    .add('Length Validator', () => (
        <Input
            placeholder={'Min: 8 - Max: 10'}
            validators={InputValidators.length({minLength: 8, maxLength: 10})}
        />
    ))
    .add('Email Validation', () => (
        <Input placeholder={'Email Validation'} presets={InputPresets.email} />
    ))
    .add('Password Validator', () => (
        <Input
            type={'password'}
            placeholder={'Password Validator (medium)'}
            filters={InputFilters.noSpaces}
            blockers={InputBlockers.noSpaces}
            validators={InputValidators.password({
                minLength: 8,
                maxLength: 30,
                specials: 0
            })}
        />
    ));

storiesOf('Button/Light', module)
    .addParameters({...BGS_DARK})
    .add('Light Button', () => <Button text={'Light Button'} />)
    .add('Disabled Button', () => (
        <Button text={'Disabled Button'} disabled={true} />
    ));

storiesOf('Button/Dark', module).add('Dark Button', () => (
    <Button text={'Dark Button'} dark={true} />
));

storiesOf('DotNavigation', module).add('DotNavigation', () => (
    <DotNavigation quantity={5} direction={'column'} />
));
