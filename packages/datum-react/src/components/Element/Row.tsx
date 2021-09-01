import { Row } from 'datum';
import React, { FC } from 'react';
import { RenderDatumElementProps } from './types';

export const RowRenderer: FC<RenderDatumElementProps<Row>> = ({ children }) => (
    <>
        {children}
    </>
);
