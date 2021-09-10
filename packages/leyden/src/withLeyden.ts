import {
    Node,
    Editor,
    Text as SlateText,
} from 'slate';

import { LeydenEditor } from '.';
import { Text } from './interfaces/Text';
import {
    ValidationFuncs,
    ValidationFunc,
    Validator,
} from './interfaces/Validator';

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

    const getValidationFunc = (validator: Validator): ValidationFunc => {
        if (validator === 'integer') {
            return Validator.isInteger;
        }
        if (validator === 'numeric') {
            return Validator.isNumeric;
        }
        return validators[validator];
    };

    e.apply = op => {
        if (op.type === 'insert_text' || op.type === 'remove_text') {
            const node = Node.descendant(editor, op.path);
            if (SlateText.isText(node) && Text.isText(node) && node.validator !== undefined) {
                const calcedNewVal = 'helloWorld';
                const validationSucceeded = getValidationFunc(node.validator)(calcedNewVal);
                if (!validationSucceeded) {
                    return;
                }
            }
        }
        apply(op);
    };

    return e;
};
