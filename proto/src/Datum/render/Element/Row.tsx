import React, { FC } from 'react';
import { RenderDatumElementProps } from './types';

import { Row } from '../..';

export const RowRenderer: FC<RenderDatumElementProps<Row>> = ({ children }) => (
    <>
        {children}
    </>
);
