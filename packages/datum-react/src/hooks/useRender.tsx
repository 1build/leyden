import React, { useCallback } from 'react';

import { Element } from '../components/Element';
import { Leaf } from '../components/Leaf';
import { CellRenderers, ElementRenderers } from '../utils/types';

type ElementNoRenderers = Omit<Element, 'cellRenderers'|'elementRenderers'>;

interface useRenderProps {
    cellRenderers: CellRenderers,
    elementRenderers: ElementRenderers,
}

interface UseRenderPayload {
    renderElement: (rep: ElementNoRenderers) => JSX.Element;
    renderLeaf: (rep: Leaf) => JSX.Element;
}

export const useRender = ({
    cellRenderers,
    elementRenderers,
}: useRenderProps): UseRenderPayload => {
    const renderElement = useCallback((rep: ElementNoRenderers) => (
        <Element
            {...rep}
            cellRenderers={cellRenderers}
            elementRenderers={elementRenderers}
        />
    ), [cellRenderers]);
    
    const renderLeaf = useCallback((rlp: Leaf) => (
        <Leaf {...rlp} />
    ), []);

    return {
        renderElement,
        renderLeaf,
    };
};
