import React, { PropsWithChildren } from 'react';

import s from './FieldContainer.module.css';
import clsx from 'clsx';

export const FieldContainer = (props: PropsWithChildren) => {
    const { children } = props;
    return (
        <div className={clsx(s.container)}>
            <div className={clsx(s.inner)}>{children}</div>
        </div>
    );
};
