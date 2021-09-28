import React, { FC } from 'react';

import { makeGridPositionStyle } from './style';

export interface Origin {
    Component?: FC,
}

export const Origin: FC<Origin> = ({ Component }) => (
    <div
        style={makeGridPositionStyle(1, 1)}
        contentEditable={false}
    >
        {Component && <Component />}
    </div>
);
