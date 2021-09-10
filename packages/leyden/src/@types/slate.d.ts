import { LeydenEditor } from '../interfaces/LeydenEditor';

import { LeydenElement, LeydenText } from '../types';

declare module 'slate' {
    interface CustomTypes {
        Editor: LeydenEditor<number, number>;
        Element: LeydenElement;
        Text: LeydenText;
    }
}
