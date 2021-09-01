import { DatumText } from 'datum';
import { RenderLeafProps } from 'slate-react';

export interface RenderDatumLeafProps<
    T extends DatumText=DatumText
> extends Omit<RenderLeafProps, 'leaf'|'text'> {
    leaf: T;
    text: T;
}
