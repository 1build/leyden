import { Node, Editor } from 'slate';

import { CreateEditorOptions } from './createEditor';
import { Element } from './interfaces/Element';
import { Text } from './interfaces/Text';
import { Validator } from './interfaces/Validator';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withLeyden = (
    editor: Editor,
    options: CreateEditorOptions,
) => {
    const e = editor;
    const { apply, isVoid } = e;

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

    e.getValidationFunc = validator => (
        Validator.getValidationFunc(options.validators, validator)
    );

    e.isVoid = element => {
        if (Element.isVoid(element)) {
            return true;
        }
        return isVoid(element);
    };

    return e;
};
