import { Editor } from 'slate';

import { DatumEditor } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withDatum = <
    Cols extends number,
    Rows extends number,
>(editor: Editor) => {
    const e = editor as unknown as DatumEditor<Cols, Rows>;

    return e;
};
