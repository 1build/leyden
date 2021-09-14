import { LeydenElement, LaydenText } from 'leyden';

import { ReactEditor } from '../plugin/ReactEditor';

declare module 'slate' {
    interface CustomTypes {
        Editor: ReactEditor;
        Element: LeydenElement;
        Text: LaydenText;
    }
}
