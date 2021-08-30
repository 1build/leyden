import React from 'react';
import { Slate as SlateReactSlate } from 'slate-react';

export const Slate: typeof SlateReactSlate = (props) => {
    return (
        <Slate {...props}/>
    );
};
