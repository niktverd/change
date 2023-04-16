import React from 'react';

type ImageProps = React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
>;

export const Image = (props: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
};
