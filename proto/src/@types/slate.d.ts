import { Element, Text } from 'datum';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃ MODULE                                                ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/

type Editor =
    & BaseEditor
    & HistoryEditor
    & ReactEditor;

declare module 'slate' {
    interface CustomTypes {
        Editor: Editor;
        Element: Element;
        Text: Text;
    }
}
