import { CustomElementRenderers } from 'datum-react';

import { ColorBox } from './ColorBox';
import { OutlineBox } from './OutlineBox';

export const customElementRenderers: CustomElementRenderers = {
    'ColorBox': ColorBox,
    'OutlineBox': OutlineBox,
};
