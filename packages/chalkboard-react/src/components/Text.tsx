import {
    ChalkboardText,
    Text as ChalkboardCustomText,
} from 'chalkboard';
import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

import { TextRenderers } from '../utils/types';

export interface Text extends Omit<RenderLeafProps, 'leaf'|'text'> {
    textRenderers: TextRenderers;
    leaf: ChalkboardText;
    text: ChalkboardText;
}

export const Text: FC<Text> = ({
    children,
    text,
    textRenderers,
    ...props
}) => {
    if (ChalkboardCustomText.isText(text)) {
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
