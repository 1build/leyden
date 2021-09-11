import { LeydenEditor } from 'leyden';
import { withReact as withSlateReact } from 'slate-react';

import { ReactEditor } from '../plugin/ReactEditor';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withReact = <T extends LeydenEditor>(editor: T): T & ReactEditor => {
    const e = withSlateReact(editor as T & ReactEditor);

    return e;
};
