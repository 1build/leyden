import { DatumEditor } from 'datum';
import React, {
    FC,
    KeyboardEventHandler,
    useCallback,
} from 'react';
import {
    Editable as SlateReactEditable,
    useSlateStatic,
} from 'slate-react';

import { CellRenderers } from './Cell';
import { useRender } from '../hooks/useRender';
import { cellNavigationKeys } from '../utils/keys';

export interface Editable extends Omit<Parameters<typeof SlateReactEditable>[0], 'renderElement'|'renderLeaf'> {
    cellRenderers: CellRenderers;
}

export const Editable: FC<Editable> = ({
    cellRenderers,
    onKeyDown,
    ...props
}) => {
    const editor = useSlateStatic();
    const render = useRender(cellRenderers);

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(e => {
        if (onKeyDown) {
            onKeyDown(e);
        }
        if (e.defaultPrevented) {
            return;
        }
        if (e.key in cellNavigationKeys) {
            e.preventDefault();
            DatumEditor.moveCellSelection(editor, cellNavigationKeys[e.key]);
            return;
        }
    }, [onKeyDown]);

    return (
        <SlateReactEditable
            {...render}
            {...props}
            onKeyDown={handleKeyDown}
        />
    );
};
