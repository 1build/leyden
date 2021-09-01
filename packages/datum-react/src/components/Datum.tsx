import { withDatum } from 'datum';
import React, { FC, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';

export interface Datum {
    value: Descendant[];
    onChange: (value: Descendant[]) => void;
} 

export const Datum: FC<Omit<Parameters<typeof Slate>[0], 'editor'>> = ({
    children,
    ...props
}) => {
    const editor = useMemo(() => (
        withDatum(
            withReact(
                createEditor()
            )
        )
    ), []);

    return (
        <Slate
            editor={editor}
            {...props}
        >
            {children}
        </Slate>
    );
};
