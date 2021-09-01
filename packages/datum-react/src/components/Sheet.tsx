import React, { FC } from 'react';
import { Editable } from 'slate-react';

import { useRender } from '../hooks/use-render';

export type Sheet = Omit<Parameters<typeof Editable>[0], 'renderElement'|'renderLeaf'>

export const Sheet: FC<Sheet> = ({
    ...props
}) => {
    const render = useRender();

    return (
        <Editable
            {...render}
            {...props}
        />
    );
};
