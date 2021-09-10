import { ChalkboardElement } from 'chalkboard';

import { ReactEditor } from '../plugin/ReactEditor';

declare module 'slate' {
    interface CustomTypes {
        Editor: ReactEditor<number, number>;
        Element: ChalkboardElement;
    }
}
