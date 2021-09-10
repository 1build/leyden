import { Node, Editor } from 'slate';

import { LeydenEditor } from '.';
import { Text } from './interfaces/Text';
import { ValidationFuncs, Validator } from './interfaces/Validator';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withLeyden = <
    Cols extends number,
    Rows extends number,
>(
    editor: Editor,
    validators: ValidationFuncs,
) => {
    const e = editor as unknown as LeydenEditor<Cols, Rows>;
    const { apply } = e;

    e.getValidationFunc = validator => (
        Validator.getValidationFunc(validators, validator)
    );

    e.apply = op => {
        if ((op.type === 'insert_text' && op.text.length > 0)
            || op.type === 'remove_text'
        ) {
            const { offset, path, text } = op;
            const textNode = Node.leaf(editor, path);
            if (Text.isText(textNode) && textNode.validator !== undefined) {
                if (op.type === 'insert_text') {
                    const insertionIsValid = Text.validateInsertion(
                        textNode,
                        offset,
                        text,
                        e.getValidationFunc(textNode.validator)
                    );
                    if (!insertionIsValid) {
                        return;
                    }
                }
            }
        }
        apply(op);
    };

    return e;
};
