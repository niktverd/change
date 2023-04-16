import React from 'react';
import clsx from 'clsx';

import s from './Input.module.css';

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    className?: string;
};
export const Input = (props: InputProps) => {
    const { className: externalClassName, ...rest } = props;
    return <input {...rest} className={clsx(s.container, externalClassName)} />;
};
