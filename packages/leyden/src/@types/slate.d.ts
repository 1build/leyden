import { LeydenEditor } from '../interfaces/LeydenEditor';
import { LeydenElement } from '../interfaces/Element';
import { LaydenText } from '../interfaces/Text';

declare module 'slate' {
    interface CustomTypes {
        Editor: LeydenEditor;
        Element: LeydenElement;
        Text: LaydenText;
    }
}
