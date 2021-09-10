import { ChalkboardEditor } from '../interfaces/ChalkboardEditor';

import { ChalkboardElement, ChalkboardText } from '../types';

declare module 'slate' {
    interface CustomTypes {
        Editor: ChalkboardEditor<number, number>;
        Element: ChalkboardElement;
        Text: ChalkboardText;
    }
}
