import React, { useCallback } from 'react';

import { CellRenderers } from '../components/Cell';
import { Element } from '../components/Element';
import { Leaf } from '../components/Leaf';

interface UseRenderPayload {
    renderElement: (rep: Omit<Element, 'cellRenderers'>) => JSX.Element;
    renderLeaf: (rep: Leaf) => JSX.Element;
}

export const useRender = (
    cellRenderers: CellRenderers,
): UseRenderPayload => {
    const renderElement = useCallback((rep: Omit<Element, 'cellRenderers'>) => (
        <Element {...rep} cellRenderers={cellRenderers} />
    ), [cellRenderers]);
    
    const renderLeaf = useCallback((rlp: Leaf) => (
        <Leaf {...rlp} />
    ), []);

    return {
        renderElement,
        renderLeaf,
    };
};
