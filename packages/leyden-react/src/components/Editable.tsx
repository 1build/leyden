import { Transforms } from 'leyden';
import React, {
    FC,
    KeyboardEventHandler,
    useCallback,
} from 'react';
import {
    Editable as SlateReactEditable,
    useSlateStatic,
} from 'slate-react';

import { useRender } from '../hooks/useRender';
import { cellNavigationKeys } from '../utils/keys';
import {
    CellRenderersOption,
    ElementRenderersOption,
    HeaderRenderers,
    TableOptions,
    TextRenderersOption,
} from '../utils/types';

export type Editable =
    & Omit<Parameters<typeof SlateReactEditable>[0], 'renderElement'|'renderLeaf'>
    & CellRenderersOption
    & ElementRenderersOption
    & TextRenderersOption
    & {
        headerRenderers?: HeaderRenderers;
        tableOptions?: Partial<TableOptions>;
    };

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
            Transforms.moveCellSelection(editor, { direction: cellNavigationKeys[e.key] });
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
