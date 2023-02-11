import {render} from '@testing-library/react';
import {assert} from 'chai';
import React, {useEffect} from 'react';
// import {Button} from './index.js';

const Button = () => {
    useEffect(() => {
        console.log('MOUNT');
        return () => {
            console.log('UNMOUNT');
        };
    }, []);
    return <button>{'TEST'}</button>;
};

describe('Button', () => {
    // TODO: DYNAMICALLY GENERATE BASIC TESTS (mount, unmount...)
    it.skip('Should render without errors.', () => {
        const {unmount} = render(<Button />);

        const button = document.querySelector('button');

        assert.exists(button);

        unmount();
    });
});

// TODO: WHY TESTS PROCESS DO NOT END? USE --exit IN SCRIPT AND ADD: // FIXME NOTE?
