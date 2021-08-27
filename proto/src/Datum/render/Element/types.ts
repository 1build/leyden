import { RenderElementProps } from 'slate-react';

import { DatumElement, ElementType } from '../..';

export interface RenderDatumElementProps<
    T extends DatumElement<ElementType>
> extends Omit<RenderElementProps, 'element'> {
    element: T
}
