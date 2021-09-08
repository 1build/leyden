import React, { useCallback } from 'react';

import { Element } from '../components/Element';
import { Leaf } from '../components/Leaf';

interface UseRenderPayload {
    renderElement: (rep: Element) => JSX.Element;
    renderLeaf: (rep: Leaf) => JSX.Element;
}

export const useRender = (): UseRenderPayload => {
    const renderElement = useCallback((rep: Element) => (
        <Element {...rep} />
    ), []);
    
    const renderLeaf = useCallback((rlp: Leaf) => (
        <Leaf {...rlp} />
    ), []);

    return {
        renderElement,
        renderLeaf,
    };
};
