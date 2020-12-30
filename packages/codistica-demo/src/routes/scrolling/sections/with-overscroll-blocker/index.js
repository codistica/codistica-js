/** @flow */

import {withOverscrollBlocker} from '@codistica/react';
import React from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';

const OverscrollBlockerDiv = withOverscrollBlocker<{}>('div');

const category = 'HOC';
const title = 'withOverscrollBlocker()';
const description =
    'Disables overscroll on passed component, without disrupting normal scroll behavior.';

/**
 * @description With overscroll blocker section.
 * @returns {Object<string,*>} Section.
 */
function WithOverscrollBlockerSection() {
    return (
        <Section category={category} title={title} description={description}>
            <div className={componentClassNames.info}>
                <p>{'Overscroll is blocked here.'}</p>
            </div>
            <OverscrollBlockerDiv className={componentClassNames.rectangle}>
                <div className={componentClassNames.track} />
            </OverscrollBlockerDiv>
        </Section>
    );
}

export {WithOverscrollBlockerSection};
