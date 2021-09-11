import {
    LeydenEditor,
    LaydenElement,
    LaydenText,
} from '../interfaces/LeydenEditor';

declare module 'slate' {
    interface CustomTypes {
        Editor: LeydenEditor;
        Element: LaydenElement;
        Text: LaydenText;
    }
}
