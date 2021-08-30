import { DatumElement, ElementType } from 'datum';
import { RenderElementProps } from 'slate-react';

export interface RenderDatumElementProps<
    T extends DatumElement<ElementType>
> extends Omit<RenderElementProps, 'element'> {
    element: T
}
