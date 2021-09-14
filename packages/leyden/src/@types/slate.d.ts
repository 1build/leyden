import { LeydenEditor } from '../interfaces/LeydenEditor';
import { LeydenElement } from '../interfaces/Element';
import { LeydenText } from '../interfaces/Text';

declare module 'slate' {
    interface CustomTypes {
        Editor: LeydenEditor;
        Element: LeydenElement;
        Text: LeydenText;
    }
}
