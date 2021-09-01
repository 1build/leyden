import React, { FC } from 'react';
import { Slate } from 'slate-react';

export const Datum: FC<Parameters<typeof Slate>[0]> = ({
    children,
    ...props
}) => {
    return (
        <Slate {...props}>
            {children}
        </Slate>
    );
};
