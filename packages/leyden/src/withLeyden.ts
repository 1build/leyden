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
        if ((op.type === 'insert_text' || op.type === 'remove_text')
            && op.text.length > 0
        ) {
            const text = Node.leaf(editor, op.path);
            if (Text.isText(text) && text.validator !== undefined) {
                const isValid = Text.validateTextOperation(
                    text,
                    e.getValidationFunc(text.validator),
                    op,
                );
                if (!isValid) {
                    return;
                }
            }
        }
        apply(op);
    };

    return e;
};
