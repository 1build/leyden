import { Sheet } from 'datum';
import React, { FC, ReactNode, useCallback } from 'react';
import { Descendant, Element } from 'slate';
import { Slate } from 'slate-react';

import { ReactEditor } from '../plugin/ReactEditor';

export interface Datum<Cols extends number, Rows extends number> {
    children: ReactNode;
    editor: ReactEditor<Cols, Rows>;
    value: Sheet<Cols, Rows>;
    onChange: (value: Sheet<Cols, Rows>) => void;
}

export const Datum = <Cols extends number, Rows extends number>({
    children,
    editor,
    value,
    onChange,
}: Datum<Cols, Rows>): ReturnType<FC<Datum<Cols, Rows>>> => {
    const handleChange = useCallback((newValue: Descendant[]) => {
        const newSheet = newValue[0];
        if (Element.isElement(newSheet) && Sheet.isDimensionalSheet<Cols, Rows>(newSheet)) {
            onChange(newSheet);
        }
    }, [onChange]);

    return (
        <Slate
            editor={editor}
            value={[value]}
            onChange={handleChange}
        >
            {children}
        </Slate>
    );
};
