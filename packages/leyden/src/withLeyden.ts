import { Editor } from 'slate';

import { LeydenEditor } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withLeyden = <
    Cols extends number,
    Rows extends number,
>(editor: Editor) => {
    const e = editor as unknown as LeydenEditor<Cols, Rows>;

    return e;
};
