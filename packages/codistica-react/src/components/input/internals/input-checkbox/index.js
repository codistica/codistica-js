/** @flow */

/** @module react/components/input-checkbox */

import classnames from 'classnames/dedupe';
import React from 'react';
import styles from './index.module.scss';

type Props = {
    id: string,
    name: string,
    label: string,
    value: string,
    checked: boolean,
    status: 'valid' | 'invalid' | 'highlight' | 'warning' | null,
    onNewValue: Function
};

type State = {
    isChecked: boolean
};

/**
 * @typedef inputCheckboxPropsType
 * @property {string} [id=''] - Input ID.
 * @property {string} [name=''] - Input name.
 * @property {string} [label=''] - Input label.
 * @property {string} [value=''] - Input value.
 * @property {boolean} [checked=null] - Input checked attribute.
 * @property {('valid'|'invalid'|'highlight'|'warning'|null)} [status=null] - Input status.
 * @property {Function} [onNewValue=null] - Callback for newValue event.
 */

/**
 * @classdesc A beautiful checkbox input component.
 */
class InputCheckbox extends React.Component<Props, State> {
    static defaultProps = {
        id: '',
        name: '',
        label: '',
        value: '',
        checked: false,
        status: null,
        onNewValue: null
    };

    /**
     * @description Constructor.
     * @param {inputCheckboxPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            isChecked: props.checked
        };

        // BIND METHODS
        (this: Function).onChange = this.onChange.bind(this);
    }

    /**
     * @instance
     * @description Handler for change event.
     * @param {Object<string,*>} e - Triggering event.
     * @returns {void} Void.
     */
    onChange(e: {[string]: any}) {
        this.setState({isChecked: e.target.checked});
        this.props.onNewValue &&
            this.props.onNewValue(e.target.checked ? this.props.value : '');
    }

    /**
     * @instance
     * @description React render method.
     * @returns {React.Component} React component.
     */
    render() {
        const {id, name, label, value, status} = this.props;
        const {isChecked} = this.state;
        const {onChange} = this;

        const mainClassName = classnames(
            {[styles.main]: true},
            {[styles.inputParent]: true}
        );

        const inputClassName = classnames(
            {[styles.valid]: status === 'valid'},
            {[styles.invalid]: status === 'invalid'},
            {[styles.highlight]: status === 'highlight'},
            {[styles.warning]: status === 'warning'}
        );

        return (
            <span className={mainClassName}>
                <input
                    type={'checkbox'}
                    id={id}
                    name={name}
                    value={value}
                    checked={isChecked}
                    className={inputClassName}
                    onChange={onChange}
                />
                <label htmlFor={id}>{label}</label>
            </span>
        );
    }
}

export {InputCheckbox};
