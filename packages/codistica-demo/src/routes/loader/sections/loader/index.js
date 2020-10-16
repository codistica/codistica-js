/** @flow */

import {Loader} from '@codistica/browser';
import {stringUtils} from '@codistica/core';
import {Button} from '@codistica/react';
import {LinearProgress} from '@codistica/react-mui';
import React, {useState, useEffect, useCallback} from 'react';
import {Section} from '../../../../components/section/index.js';
import componentClassNames from './index.module.scss';
import {getPayloadsData} from './internals/generate-links.js';
import source from './internals/source.json';

// TODO: ALLOW CHANGING MAX THREADS DYNAMICALLY.
// TODO: ALLOW ADDING/REMOVING THREADS DYNAMICALLY.
// TODO: ALLOW CANCELLING SINGLE AND ALL DOWNLOADS.
// TODO: SHOW PAYLOADS HISTORY, CURRENT AND QUEUE.

// TODO: ADD LOADING BARS (OVERALL AND FOR EACH PAYLOAD (ALSO WHEN ADDED/REMOVED DYNAMICALLY))
// TODO: LOG RAW DATA (COLLAPSED LISTS) AND PRINT PROCESSED STATS. OVERALL AND FOR EACH PAYLOAD.
// TODO: ADD RELEVANT GRAPHS

// TODO: SET DOWNLOADS ABUSE SECURITY?
// TODO: PRINT source AND target IP ADDRESSES?

// TODO: TEST PERFORMANCE

const loader = new Loader({
    maxThreads: 4
});

getPayloadsData(source).forEach((payloadData) => {
    loader.add({
        url: payloadData.url,
        payloadLength: payloadData.payloadLength,
        assetLength: payloadData.assetLength
    });
});

/**
 * @description Prepares input for displaying.
 * @param {*} input - Input.
 * @param {number} [length=10] - Length.
 * @param {boolean} [round] - Round.
 * @returns {string} Output.
 */
function display(input, length, round) {
    if (typeof input !== 'number') {
        input = 0;
    }
    if (round) {
        input = (Math.round(input * 100) / 100).toFixed(2);
    }
    return stringUtils.injectBefore(input.toString(), length || 10, '0');
}

const category = 'DEMO';
const title = 'Loader Demo';
const description = 'TODO.';

/**
 * @description Loader demo section.
 * @returns {Object<string,*>} Section.
 */
function LoaderDemo() {
    const [progress, setProgress] = useState(null);
    const [stats, setStats] = useState(null);
    const [performance, setPerformance] = useState(null);

    const data = {
        totalData: null,
        loadedData: null,
        percent: null,
        eta: null,
        totalPayloads: null,
        succeededPayloads: null,
        failedPayloads: null,
        rtt: null,
        rttAhead: null,
        throughput: null,
        inProgress: null
    };

    const onRefreshHandler = useCallback(({progress, stats, performance}) => {
        setProgress({
            ...progress
        });
        setStats({
            ...stats
        });
        setPerformance({
            ...performance
        });
    }, []);

    useEffect(() => {
        loader.on('refresh', onRefreshHandler);

        /**
         * @description Callback for end event.
         * @returns {void} Void.
         */
        const onEndHandler = function onEndHandler() {
            loader.off('refresh', onRefreshHandler);
        };

        loader.once('end', onEndHandler);

        return () => {
            loader.off('refresh', onRefreshHandler);
            loader.off('end', onEndHandler);
        };
    }, [onRefreshHandler]);

    if (progress) {
        data.totalData = progress.total;
        data.loadedData = progress.loaded;
        data.percent = progress.percent;
        data.eta = progress.eta;
    }

    if (stats) {
        data.totalPayloads = stats.total;
        data.succeededPayloads = stats.succeeded;
        data.failedPayloads = stats.failed;
        data.inProgress = stats.inProgress;
    }

    if (performance) {
        data.rtt = performance.rtt;
        data.rttAhead = performance.rttAhead;
        data.throughput = performance.throughput;
    }

    return (
        <Section category={category} title={title} description={description}>
            <div className={componentClassNames.mainWrapper}>
                <Button title={'START'} onClick={() => loader.start()} />

                <h2>Smoothened Progress</h2>
                <LinearProgress eta={data.eta} inertia={10} />

                <h2>Overall Process</h2>
                <h3>Total Data: {display(data.totalData)} B</h3>
                <h3>Total Loaded: {display(data.loadedData)} B</h3>
                <h3>Raw Percent: {display(data.percent, 6, true)} %</h3>
                <h3>
                    Raw ETA: {display(data.eta && data.eta / 1000, 6, true)} s
                </h3>

                <h2>Status</h2>
                <h3>In Progress: {data.inProgress || 0}</h3>

                <h2>Stats</h2>
                <h3>Total Payloads: {data.totalPayloads || 0}</h3>
                <h3>Succeeded Payloads: {data.succeededPayloads || 0}</h3>
                <h3>Failed Payloads: {data.failedPayloads || 0}</h3>

                <h2>Performance</h2>
                <h3>RTT: {display(data.rtt, 7, true)} ms</h3>
                <h3>RTT AHEAD: {display(data.rttAhead, 7, true)} ms</h3>
                <h3>
                    THROUGHPUT:{' '}
                    {display(
                        data.throughput && data.throughput * 0.007629,
                        7,
                        true
                    )}{' '}
                    Mb/s
                </h3>
            </div>
        </Section>
    );
}

export {LoaderDemo};
