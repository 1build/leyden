import React, { FC } from 'react';

import { HeaderRendererProps } from '../utils/types';

export interface Headers {
    genClasses: (pos: number) => string[];
    quantity: number;
    Component: FC<HeaderRendererProps>;
}

export const Headers: FC<Headers> = ({
    genClasses,
    quantity,
    Component,
}) => (
    <>
        {...Array.from({ length: quantity }, (_, i) => (
            <div
                key={i}
                className={genClasses(i).join(' ')}
                contentEditable={false}
            >
                <Component position={i} />
            </div>
        ))}
    </>
);
