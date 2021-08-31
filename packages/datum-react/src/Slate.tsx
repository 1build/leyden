import React, { FC } from 'react';
import { Slate as SlateReactSlate } from 'slate-react';

export const Slate: FC<Parameters<typeof SlateReactSlate>[0]> = ({
    children,
    ...props
}) => {
    return (
        <SlateReactSlate {...props}>
            {children}
        </SlateReactSlate>
    );
};
