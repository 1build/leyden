import React, { CSSProperties, FC } from 'react';

import { HeaderRendererProps } from '../utils/types';

export interface Headers {
    genStyle: (pos: number) => CSSProperties;
    quantity: number;
    Component: FC<HeaderRendererProps>;
}

export const Headers: FC<Headers> = ({
    genStyle,
    quantity,
    Component,
}) => (
    <>
        {...Array.from({ length: quantity }, (_, i) => (
            <div
                key={i}
                style={genStyle(i)}
                contentEditable={false}
            >
                <Component position={i} />
            </div>
        ))}
    </>
);
