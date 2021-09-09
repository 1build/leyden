import {
    DatumText,
    Text as DatumCustomText,
} from 'datum';
import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

import { TextRenderers } from '../utils/types';

export interface Text extends Omit<RenderLeafProps, 'leaf'|'text'> {
    textRenderers: TextRenderers;
    leaf: DatumText;
    text: DatumText;
}

export const Text: FC<Text> = ({
    children,
    text,
    textRenderers,
    ...props
}) => {
    if (DatumCustomText.isText(text)) {
        const TextFC = textRenderers[text.type];
        return (
            <TextFC
                {...props}
                leaf={text}
                text={text}
            >
                {children}
            </TextFC>
        );
    }

    return (
        <span {...props}>
            {children}
        </span>
    );
};
