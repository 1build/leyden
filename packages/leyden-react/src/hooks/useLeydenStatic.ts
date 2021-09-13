import { useSlateStatic } from 'slate-react';

import { ReactEditor } from '../plugin/ReactEditor';

export const useLeydenStatic = (): ReactEditor => (
    useSlateStatic()
);
