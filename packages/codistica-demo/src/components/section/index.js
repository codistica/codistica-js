/** @flow */

import React from 'react';
import componentClassNames from './index.module.scss';

// TODO: USE REACT COMPOUND COMPONENTS PATTERN. (SUB <SectionTitle>, <SectionDescription>, <SectionCategory>, <SectionExample>, etc. INSTEAD OF PROPS.)

type Props = {
    category: string,
    title: string,
    description: string,
    children: any
};

Section.defaultProps = {
    children: null
};

/**
 * @typedef sectionPropsType
 * @property {string} category - Section category.
 * @property {string} title - Section title.
 * @property {string} description - Section description.
 * @property {*} [children=null] - React prop.
 */

/**
 * @description Section component.
 * @param {sectionPropsType} props - Component props.
 * @returns {Object<string,*>} React component.
 */
function Section(props: Props) {
    const {category, title, description, children} = props;
    return (
        <div className={componentClassNames.root}>
            <div>
                <h2 className={componentClassNames.title}>
                    {title} - [{category}]
                </h2>
                <p className={componentClassNames.description}>{description}</p>
            </div>
            <div className={componentClassNames.wrapper}>{children}</div>
        </div>
    );
}

export {Section};
