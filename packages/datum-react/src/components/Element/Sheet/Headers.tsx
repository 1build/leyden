import React, { FC } from 'react';

export interface Headers {
    quantity: number,
    genValue: (pos: number) => string,
    genClasses: (pos: number) => string[],
}

export const Headers: FC<Headers> = ({
    quantity,
    genValue,
    genClasses,
}) => (
    <>
        {...Array.from({ length: quantity }, (_, i) => (
            <div
                key={i}
                className={genClasses(i).join(' ')}
            >
                {genValue(i)}
            </div>
        ))}
    </>
);
