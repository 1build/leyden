import { useCallback } from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

import { Element } from './Element';
import { Leaf } from './Leaf';

export const renderElement = useCallback<(props: RenderElementProps) => JSX.Element>(props => (
    <Element {...props} />
), []);

export const renderLeaf = useCallback<(props: RenderLeafProps) => JSX.Element>(props => (
    <Leaf {...props} />
), []);
