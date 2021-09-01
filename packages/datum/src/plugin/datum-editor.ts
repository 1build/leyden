import { BaseEditor } from 'slate';

export interface DatumEditor extends BaseEditor {
    doesNothing: () => void;
}

export const DatumEditor = {
    doesNothing: (): void => {
        return;
    }
};
