import { useSlate } from 'slate-react';

import { ReactEditor } from '../plugin/ReactEditor';

export const useLeyden = (): ReactEditor => (
    useSlate()
);
