/** @flow */

/** @module react/components/input-radio */

import classnames from 'classnames/dedupe';
import React from 'react';
import uniqueId from 'react-html-id';
import styles from './index.module.scss';

type Props = {
    id: string,
    name: string,
    label: string,
    radios: {[string]: string},
    status: 'valid' | 'invalid' | 'highlight' | 'warning' | null,
    onNewValue: Function,
    containerClassName: string,
    containerStyle: {[string]: string}
};

type State = {
    value: string | null
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
 * @classdesc A beautiful radio input component.
 */
class InputRadio extends React.Component<Props, State> {
    static defaultProps = {
        id: '',
        name: '',
        label: '',
        radios: {},
        status: null,
        onNewValue: null,
        containerClassName: '',
        containerStyle: {}
    };

    nextUniqueId: Function;

    /**
     * @description Constructor.
     * @param {inputCheckboxPropsType} [props] - Component props.
     */
    constructor(props: Props) {
        super(props);

        uniqueId.enableUniqueIds(this);

        this.state = {
            value: null
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
        this.setState({value: e.target.value});
        this.props.onNewValue && this.props.onNewValue(e.target.value);
    }

    /**
     * @instance
     * @description React render method.
     * @returns {React.Component} React component.
     */
    render() {
        const {
            name,
            label,
            radios,
            status,
            containerClassName,
            containerStyle
        } = this.props;
        const {value} = this.state;
        const {onChange} = this;

        const mainClassName = classnames({
            [styles.main]: true,
            [containerClassName]: !!containerClassName
        });

        const inputParentClassName = classnames({[styles.inputParent]: true});

        const inputClassName = classnames(
            {[styles.valid]: status === 'valid'},
            {[styles.invalid]: status === 'invalid'},
            {[styles.highlight]: status === 'highlight'},
            {[styles.warning]: status === 'warning'}
        );

        return (
            <span className={mainClassName} style={containerStyle}>
                {(() => {
                    let index = 0;
                    let subId = '';
                    let output = [];
                    for (const i in radios) {
                        if (!Object.prototype.hasOwnProperty.call(radios, i)) {
                            continue;
                        }
                        subId = this.nextUniqueId();
                        output.push(
                            <span key={index} className={styles.wrapper}>
                                <span className={inputParentClassName}>
                                    <input
                                        id={subId}
                                        type={'radio'}
                                        name={name}
                                        value={i}
                                        checked={value === i}
                                        className={inputClassName}
                                        onChange={onChange}
                                    />
                                    <label htmlFor={subId}>{label}</label>
                                </span>
                                <span className={styles.title}>
                                    {radios[i]}
                                </span>
                            </span>
                        );
                        index++;
                    }
                    return output;
                })()}
            </span>
        );
    }
}

export {InputRadio};
