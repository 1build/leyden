import { DatumEditor } from 'datum';
import { withReact as withSlateReact } from 'slate-react';

import { ReactEditor } from './ReactEditor';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withReact = <
    Cols extends number,
    Rows extends number,
>(editor: DatumEditor<Cols, Rows>): ReactEditor<Cols, Rows> => {
    const e = withSlateReact(editor as unknown as ReactEditor<Cols, Rows>);

    return e;
};