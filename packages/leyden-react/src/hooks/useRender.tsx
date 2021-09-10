import React, { useCallback } from 'react';

import { Element } from '../components/Element';
import { Text } from '../components/Text';
import {
    CellRenderers,
    ElementRenderers,
    TextRenderers,
} from '../utils/types';

type ElementNoRenderers = Omit<Element, 'cellRenderers'|'elementRenderers'>;
type TextNoRenderers = Omit<Text, 'textRenderers'>;

interface UseRenderProps {
    cellRenderers: CellRenderers,
    elementRenderers: ElementRenderers,
    textRenderers: TextRenderers,
}

interface UseRenderPayload {
    renderElement: (rep: ElementNoRenderers) => JSX.Element;
    renderLeaf: (rep: TextNoRenderers) => JSX.Element;
}

export const useRender = ({
    cellRenderers,
    elementRenderers,
    textRenderers,
}: UseRenderProps): UseRenderPayload => {
    const renderElement = useCallback((rep: ElementNoRenderers) => (
        <Element
            {...rep}
            cellRenderers={cellRenderers}
            elementRenderers={elementRenderers}
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
