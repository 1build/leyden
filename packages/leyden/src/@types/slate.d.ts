import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Element, ElementType } from '../interfaces/Element';

import { LeydenText } from '../types';

declare module 'slate' {
    interface CustomTypes {
        Editor: LeydenEditor<number, number>;
        Element: Element<ElementType>;
        Text: LeydenText;
    }
}
