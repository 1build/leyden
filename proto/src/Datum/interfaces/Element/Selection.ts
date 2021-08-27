import { Element } from 'slate';

import {
    Window,
    DatumElement,
    ElementType,
} from '.';
import { Void } from '../..';

export interface Selection extends DatumElement<ElementType.Selection, [Void]> {
    window: Window;
}

const isSelection = (value: Element): value is Selection => (
    value.type === ElementType.Selection
);

export const Selection = {
    /**
     * Check if an element is a `Selection`.
     */

    isSelection,
};
