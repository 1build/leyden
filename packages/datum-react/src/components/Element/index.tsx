import { Cell, Sheet } from 'datum';
import React, { FC } from 'react';

import { SheetRenderer } from './Sheet';
import { CellRenderer } from './Sheet/Cell';
import { RenderDatumElementProps } from './types';

export const Element: FC<RenderDatumElementProps> = ({
    attributes,
    children,
    element,
}) => {
    if (Cell.isCell(element)) {
        return (
            <CellRenderer attributes={attributes} element={element}>
                {children}
            </CellRenderer>
        );
    }

    if (Sheet.isSheet(element)) {
        return (
            <SheetRenderer attributes={attributes} element={element}>
                {children}
            </SheetRenderer>
        );
    }

    return (
        <div {...attributes}>
            {children}
        </div>
    );
};
