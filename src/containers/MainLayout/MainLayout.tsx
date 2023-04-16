import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import s from './MainLayout.module.css';

type MainLayoutProps = PropsWithChildren & {
    className?: string;
    innerClassName?: string;
};

export const MainLayout = ({
    children,
    className,
    innerClassName,
}: MainLayoutProps) => {
    return (
        <div className={clsx(s.container, className)}>
            <div className={clsx(s.inner, innerClassName)}>{children}</div>
        </div>
    );
};
