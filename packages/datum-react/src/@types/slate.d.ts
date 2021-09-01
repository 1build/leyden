import { DatumElement, DatumText } from 'datum';

import { DatumReactEditor } from '../plugin/datum-react-editor';

declare module 'slate' {
    interface CustomTypes {
        Editor: DatumReactEditor;
        Element: DatumElement;
        Text: DatumText;
    }
}
