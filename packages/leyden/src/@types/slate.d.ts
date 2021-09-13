import { LeydenEditor } from '../interfaces/LeydenEditor';
import { LaydenElement } from '../interfaces/Element';
import { LaydenText } from '../interfaces/Text';

declare module 'slate' {
    interface CustomTypes {
        Editor: LeydenEditor;
        Element: LaydenElement;
        Text: LaydenText;
    }
}
