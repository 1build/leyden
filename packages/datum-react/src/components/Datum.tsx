import { withDatum, Sheet } from 'datum';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { createEditor, Descendant, Element } from 'slate';
import { Slate, withReact } from 'slate-react';

export interface Datum<Cols extends number, Rows extends number> {
    children: ReactNode;
    value: Sheet<Cols, Rows>;
    onChange: (value: Sheet<Cols, Rows>) => void;
}

export const Datum = <Cols extends number, Rows extends number>({
    children,
    value,
    onChange,
}: Datum<Cols, Rows>): ReturnType<FC<Datum<Cols, Rows>>> => {
    const editor = useMemo(() => (
        withDatum(
            withReact(
                createEditor()
            )
        )
    ), []);

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
