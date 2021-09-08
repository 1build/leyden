import {
    Cell as DatumCell,
    DatumElement,
    Sheet as DatumSheet,
} from 'datum';
import React, { FC } from 'react';
import { RenderElementProps } from 'slate-react';

import { Cell } from './Cell';
import { Sheet } from './Sheet';

export interface Element extends Omit<RenderElementProps, 'element'> {
    element: DatumElement;
}

export const Element: FC<Element> = ({
    attributes,
    children,
    element,
}) => {
    if (DatumCell.isCell(element)) {
        return (
            <Cell attributes={attributes} element={element}>
                {children}
            </Cell>
        );
    }

    if (DatumSheet.isSheet(element)) {
        return (
            <Sheet attributes={attributes} element={element}>
                {children}
            </Sheet>
        );
    }

    return (
        <div {...attributes}>
            {children}
        </div>
    );
};
