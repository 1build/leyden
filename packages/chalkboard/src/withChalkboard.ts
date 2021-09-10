import { Editor } from 'slate';

import { ChalkboardEditor } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withChalkboard = <
    Cols extends number,
    Rows extends number,
>(editor: Editor) => {
    const e = editor as unknown as ChalkboardEditor<Cols, Rows>;

    return e;
};
