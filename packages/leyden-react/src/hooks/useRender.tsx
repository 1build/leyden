import React, { useCallback } from 'react';

import { Element } from '../components/Element';
import { Text } from '../components/Text';
import {
    CellRenderers,
    ElementRenderers,
    HeaderRenderers,
    TableOptions,
    TextRenderers,
} from '../utils/types';

type ElementNoRenderers = Omit<Element, 'cellRenderers'|'elementRenderers'>;
type TextNoRenderers = Omit<Text, 'textRenderers'>;

interface UseRenderProps {
    cellRenderers?: CellRenderers,
    elementRenderers?: ElementRenderers,
    headerRenderers?: HeaderRenderers;
    tableOptions?: Partial<TableOptions>;
    textRenderers?: TextRenderers,
}

interface UseRenderPayload {
    renderElement: (rep: ElementNoRenderers) => JSX.Element;
    renderLeaf: (rep: TextNoRenderers) => JSX.Element;
}

export const useRender = ({
    cellRenderers,
    elementRenderers,
    headerRenderers,
    tableOptions,
    textRenderers,
}: UseRenderProps): UseRenderPayload => {
    const renderElement = useCallback((rep: ElementNoRenderers) => (
        <Element
            {...rep}
            cellRenderers={cellRenderers}
            elementRenderers={elementRenderers}
            headerRenderers={headerRenderers}
            tableOptions={tableOptions}
        />
    ), [cellRenderers, elementRenderers]);

    const renderLeaf = useCallback((rlp: TextNoRenderers) => (
        <Text
            {...rlp}
            textRenderers={textRenderers}
        />
    ), [textRenderers]);

    return {
        renderElement,
        renderLeaf,
    };
};
