import { DatumElement } from 'datum';
import { RenderElementProps } from 'slate-react';

export interface RenderDatumElementProps<
    T extends DatumElement=DatumElement
> extends Omit<RenderElementProps, 'element'> {
    element: T
}

