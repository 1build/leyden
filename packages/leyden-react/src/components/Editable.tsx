import { LeydenEditor } from 'leyden';
import React, {
    FC,
    KeyboardEventHandler,
    useCallback,
} from 'react';
import {
    Editable as SlateReactEditable,
    useSlateStatic,
} from 'slate-react';

import { TableOptions } from './Table';
import { useRender } from '../hooks/useRender';
import { cellNavigationKeys } from '../utils/keys';
import {
    CellRenderers,
    ElementRenderers,
    HeaderRenderers,
    TextRenderers,
} from '../utils/types';

export interface Editable extends Omit<Parameters<typeof SlateReactEditable>[0], 'renderElement'|'renderLeaf'> {
    cellRenderers: CellRenderers;
    elementRenderers: ElementRenderers;
    headerRenderers?: HeaderRenderers;
    tableOptions?: Partial<TableOptions>;
    textRenderers: TextRenderers;
}

export const Editable: FC<Editable> = ({
    cellRenderers,
    elementRenderers,
    headerRenderers,
    onKeyDown,
    tableOptions,
    textRenderers,
    ...props
}) => {
    const editor = useSlateStatic();

    const render = useRender({
        cellRenderers,
        elementRenderers,
        headerRenderers,
        textRenderers,
        tableOptions,
    });

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(e => {
        if (onKeyDown) {
            onKeyDown(e);
        }
        if (e.defaultPrevented) {
            return;
        }
        if (e.key in cellNavigationKeys) {
            e.preventDefault();
            LeydenEditor.moveCellSelection(editor, cellNavigationKeys[e.key]);
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
