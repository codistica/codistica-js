/** @flow */

import {stringUtils} from '@codistica/core';
import React, {useState} from 'react';
import {useGetUniqueID, createSophistication} from '../../../../src/index.js';

const useSophistication = createSophistication({
    root: {
        margin: 20
    },
    list: {
        display: 'flex',
        flexDirection: 'column'
    },
    item: {
        margin: 15
    },
    buttons: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'column'
    }
});

function Component(props: {delete: () => void}) {
    const [items, setItems] = useState(['a', 'b', 'c', 'd', 'e']);
    const getUniqueID = useGetUniqueID();
    const jssClassNames = useSophistication();
    return (
        <div className={jssClassNames.root}>
            <div className={jssClassNames.list}>
                {items.map((item, index) => {
                    return (
                        <span
                            id={getUniqueID(item)}
                            key={index}
                            className={jssClassNames.item}>
                            {'ITEM: ' + item.toUpperCase()}
                            <br />
                            {'ID: ' + getUniqueID(item)}
                        </span>
                    );
                })}
            </div>
            <div className={jssClassNames.buttons}>
                <button
                    style={{margin: 10}}
                    onClick={() => {
                        const newItems = [
                            ...items,
                            stringUtils.firstAvailableLetter(items)
                        ];
                        setItems(newItems);
                    }}>
                    {'Add Item'}
                </button>
                <button
                    style={{margin: 10}}
                    onClick={() => {
                        const newItems = [...items];
                        newItems.pop();
                        setItems(newItems);
                    }}>
                    {'Delete Item'}
                </button>
                <button
                    style={{margin: 10}}
                    onClick={() => {
                        props.delete();
                    }}>
                    {'Delete Component'}
                </button>
            </div>
        </div>
    );
}

function Demo() {
    const [items, setItems] = useState(['a', 'b']);
    return (
        <div
            style={{
                display: 'flex'
            }}>
            {items.map((item, index) => {
                return (
                    <Component
                        key={item}
                        delete={() => {
                            const newItems = [...items];
                            newItems.splice(index, 1);
                            setItems(newItems);
                        }}
                    />
                );
            })}
            <div style={{display: 'flex', alignItems: 'center'}}>
                <button
                    style={{margin: 10}}
                    onClick={() => {
                        const newItems = [
                            ...items,
                            stringUtils.firstAvailableLetter(items)
                        ];
                        setItems(newItems);
                    }}>
                    {'Add Component'}
                </button>
            </div>
        </div>
    );
}

export {Demo};
