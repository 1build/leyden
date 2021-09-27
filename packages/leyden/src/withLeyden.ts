import { Node, Editor, Element as SlateElement } from 'slate';

import { CreateEditorOptions } from './createEditor';
import { Cell } from './interfaces/Cell';
import { Element } from './interfaces/Element';
import { Text } from './interfaces/Text';
import { Validator } from './interfaces/Validator';
import { OPERATION_SUBSCRIBERS } from './utils/weakMaps';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withLeyden = (
    editor: Editor,
    options: CreateEditorOptions,
) => {
    const e = editor;
    const { apply, isVoid } = e;

    e.apply = op => {
        // Disallow cell merging (maintain layout)
        if (op.type === 'merge_node'
            && Reflect.get(op.properties, 'type') === 'cell'
        ) {
            return;
        }
        // Disallow cell deletion (maintain layout)
        if (op.type === 'remove_node'
            && SlateElement.isElement(op.node)
            && Cell.isCell(op.node)
        ) {
            return;
        }
        // Ensure text insertion and removal abides by validations funcs
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
        // Notify subscribers of operations after application
        const opSubscribers = OPERATION_SUBSCRIBERS.get(e);
        if (opSubscribers !== undefined) {
            for (const opSubscriber of opSubscribers) {
                opSubscriber(op);
            }
        }
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
