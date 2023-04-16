import React from 'react';
import clsx from 'clsx';

import s from './Ticker.module.css';

type CrossType = {
    tickers: string[];
    value: number;
};

type TickerProps = {
    cross: CrossType;
    isOdd?: boolean;
};

export const Ticker = ({ cross, isOdd = false }: TickerProps) => {
    return (
        <div className={clsx(s.container, isOdd ? s.odd : s.even)}>
            <div className={clsx(s.ticker)}>{cross.tickers[0]}</div>
            <div className={clsx(s.value)}>{cross.value}</div>
            <div className={clsx(s.ticker)}>{cross.tickers[1]}</div>
        </div>
    );
};
