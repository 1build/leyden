import { LeydenEditor } from '../interfaces/LeydenEditor';
import { Cell, CellType } from '../interfaces/Cell';
import { Element, ElementType } from '../interfaces/Element';

import { LeydenText } from '../types';

declare module 'slate' {
    interface CustomTypes {
        Editor: LeydenEditor<number, number>;
        Element: Cell<CellType>&Element<ElementType>;
        Text: LeydenText;
    }
}
