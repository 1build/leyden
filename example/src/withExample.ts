import { Editor, Node, Text as SlateText } from 'slate';

import { Text } from 'chalkboard';

export const withExample = <T extends Editor>(editor: T): T => {
    const { apply } = editor;

    editor.apply = operation => {
        if (operation.type === 'insert_text' || operation.type === 'remove_text') {
            const { path } = operation;
            const node = Node.descendant(editor, path);
            console.log({ src: 'apply', operation, node });
            // if (SlateText.isText(node) && Text.isText(node) && node.type === 'Decimal' as 'default') {
            //     //if (!isNaN(node))
            //     //console.log({ node, path });
            // }
        }
        return apply(operation);
    };

    return editor;
};
