import { LeydenElement, LeydenText } from 'leyden';

import { ReactEditor } from '../plugin/ReactEditor';

declare module 'slate' {
    interface CustomTypes {
        Editor: ReactEditor;
        Element: LeydenElement;
        Text: LeydenText;
    }
}
