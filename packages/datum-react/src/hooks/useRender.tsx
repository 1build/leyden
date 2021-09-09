import React, { useCallback } from 'react';

import { CustomElementRenderers } from '../components/CustomElement';
import { CellRenderers } from '../components/Cell';
import { Element } from '../components/Element';
import { Leaf } from '../components/Leaf';

type ElementNoRenderers = Omit<Element, 'cellRenderers'|'customElementRenderers'>;

interface useRenderProps {
    cellRenderers: CellRenderers,
    customElementRenderers: CustomElementRenderers,
}

interface UseRenderPayload {
    renderElement: (rep: ElementNoRenderers) => JSX.Element;
    renderLeaf: (rep: Leaf) => JSX.Element;
}

export const useRender = ({
    cellRenderers,
    customElementRenderers,
}: useRenderProps): UseRenderPayload => {
    const renderElement = useCallback((rep: ElementNoRenderers) => (
        <Element
            {...rep}
            cellRenderers={cellRenderers}
            customElementRenderers={customElementRenderers}
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
