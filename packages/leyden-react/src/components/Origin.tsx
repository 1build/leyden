import React, { FC } from 'react';

import { makeGridPositionClass } from './style';

export interface Origin {
    Component?: FC,
}

export const Origin: FC<Origin> = ({ Component }) => (
    <div
        className={makeGridPositionClass(1, 1)}
        contentEditable={false}
    >
        {Component && <Component />}
    </div>
);
