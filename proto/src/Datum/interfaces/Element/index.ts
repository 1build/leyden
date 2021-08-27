import {
    Descendant,
    Editor,
    Element,
    Path,
} from 'slate';
import { ReactEditor } from 'slate-react';

export * from './Cell';
export * from './Row';
export * from './Table';
export * from './types';

export enum ElementType {
    Cell,
    Row,
    Selection,
    Table,
}

export interface DatumElement<T extends ElementType, C extends Descendant[]=Descendant[]> {
    type: T;
    children: C;
}

export const DatumElement = {
    /**
     * Get an element's path.
     */

    getPath: (editor: Editor, el: Element): Path => (
        ReactEditor.findPath(editor, el)
    ),
};
