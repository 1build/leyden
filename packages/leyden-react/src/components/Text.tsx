import {
    LeydenText,
    Text as LeydenCustomText,
} from 'leyden';
import React, { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

import { TextRenderers } from '../utils/types';

export interface Text extends Omit<RenderLeafProps, 'leaf'|'text'> {
    textRenderers: TextRenderers;
    leaf: LeydenText;
    text: LeydenText;
}

export const Text: FC<Text> = ({
    children,
    text,
    textRenderers,
    ...props
}) => {
    if (LeydenCustomText.isText(text)) {
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
