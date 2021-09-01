import React, { useCallback } from 'react';

import { Element } from '../components/Element';
import { RenderDatumElementProps } from '../components/Element/types';
import { Leaf } from '../components/Leaf';
import { RenderDatumLeafProps } from '../components/Leaf/types';

interface UseRenderPayload {
    renderElement: (rep: RenderDatumElementProps) => JSX.Element;
    renderLeaf: (rep: RenderDatumLeafProps) => JSX.Element;
}

export const useRender = (): UseRenderPayload => {
    const renderElement = useCallback((rep: RenderDatumElementProps) => (
        <Element {...rep} />
    ), []);
    
    const renderLeaf = useCallback((rlp: RenderDatumLeafProps) => (
        <Leaf {...rlp} />
    ), []);

    return {
        renderElement,
        renderLeaf,
    };
};
