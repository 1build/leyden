import { withDatum, Sheet } from 'datum';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';

import { isSingleSheet } from '../utils/typeGuards';

export interface Datum {
    children: ReactNode;
    value: Sheet;
    onChange: (value: Sheet) => void;
}

export const Datum: FC<Datum> = ({
    children,
    value,
    onChange,
}) => {
    const editor = useMemo(() => (
        withDatum(
            withReact(
                createEditor()
            )
        )
    ), []);

    const handleChange = useCallback((newValue: Descendant[]) => {
        if (isSingleSheet(newValue)) {
            onChange(newValue[0]);
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
