import React, { FC } from 'react';

import { HeaderRendererProps } from '../utils/types';

export interface Headers {
    genClass: (pos: number) => string,
    quantity: number,
    Component: FC<HeaderRendererProps>,
}

export const Headers: FC<Headers> = ({
    genClass,
    quantity,
    Component,
}) => (
    <>
        {...Array.from({ length: quantity }, (_, i) => (
            <div
                key={i}
                className={genClass(i)}
                contentEditable={false}
            >
                <Component position={i} />
            </div>
        ))}
    </>
);
