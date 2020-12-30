/** @flow */

import {numberUtils, arrayUtils} from '@codistica/core';

type View = {|
    items: Array<{|
        child: any,
        id: string,
        key: string,
        useSuffix: boolean,
        isInView: boolean,
        position: number,
        from: {[string]: any},
        enter: {[string]: any},
        leave: {[string]: any},
        update: {[string]: any}
    |}>
|};

type Input = {|
    children: Array<any>,
    itemsPerView: number,
    position: number,
    lazyRender: boolean,
    previousView: View | null
|};

type Context = {|
    view: View
|};

const context: Context = {
    view: {
        items: []
    }
};

function generateView({
    children,
    itemsPerView,
    position,
    lazyRender,
    previousView
}: Input): View {
    // NEW VIEW OBJECT MUST BE A FRESH INSTANCE
    context.view = {
        items: []
    };

    const getDelta = function getDelta(from: number, to: number): number {
        const delta = arrayUtils.getShortestPath(children.length, from, to);
        const multiplier = lazyRender
            ? Math.min(Math.abs(delta), itemsPerView)
            : Math.abs(delta);
        const output = Math.sign(delta) * multiplier;
        return delta === children.length / 2 ? output * -1 : output;
    };

    const exceeding = numberUtils.clamp(
        children.length - itemsPerView,
        0,
        Infinity
    );

    let itemPosition = -Math.floor(exceeding / 2);
    let index = (position + itemPosition) % children.length;

    if (index < 0) {
        index += children.length;
    }

    children.forEach(() => {
        const child = children[index];
        const id = child.key || index;
        const isInView = itemPosition >= 0 && itemPosition < itemsPerView;

        const previousItem = previousView
            ? previousView.items.find((a) => a.id === id)
            : undefined;

        let rawDelta = 0;
        let fromDelta = 0;
        let useSuffix = false;

        if (previousItem) {
            rawDelta = itemPosition - previousItem.position;
            fromDelta = getDelta(previousItem.position, itemPosition);
            useSuffix = previousItem.useSuffix;
        }

        if (children.length > itemsPerView && fromDelta !== rawDelta) {
            // DISCARD CURRENT ELEMENT AND RENDER A NEW ONE
            useSuffix = !useSuffix;
        }

        context.view.items.push({
            child,
            id,
            key: useSuffix ? id + '*' : id,
            useSuffix,
            isInView,
            position: itemPosition,
            from: {
                transform: (itemPosition - (isInView ? fromDelta : 0)) * 100
            },
            enter: {
                transform: itemPosition * 100
            },
            get leave() {
                const latestItem = context.view.items.find((a) => a.id === id);
                if (latestItem) {
                    const leaveDelta = getDelta(
                        this.position,
                        latestItem.position
                    );
                    return {
                        transform: (this.position + leaveDelta) * 100
                    };
                } else {
                    return {
                        visibility: 'hidden'
                    };
                }
            },
            update: {
                transform: itemPosition * 100
            }
        });

        itemPosition++;
        index = (index + 1) % children.length;
    });

    return context.view;
}

export {generateView};
