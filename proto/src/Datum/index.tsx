import React, { FC } from 'react';

import { useEditor } from '@/Datum/editor';

export const Datum: FC = () => {
    const editor = useEditor();

    return (
        <div>
            Datum
        </div>
    )
}
