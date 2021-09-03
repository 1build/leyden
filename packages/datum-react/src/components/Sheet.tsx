import { DatumEditor } from 'datum';
import React, {
    FC,
    KeyboardEventHandler,
    useCallback,
} from 'react';
import { Editable, useSlateStatic } from 'slate-react';

import { useRender } from '../hooks/use-render';
import { cellNavigationKeys } from '../utils/keys';

export type Sheet = Omit<Parameters<typeof Editable>[0], 'renderElement'|'renderLeaf'>

export const Sheet: FC<Sheet> = ({
    onKeyDown,
    ...props
}) => {
    const editor = useSlateStatic();
    const render = useRender();

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
        <Editable
            {...render}
            {...props}
            onKeyDown={handleKeyDown}
        />
    );
};
