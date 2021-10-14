import { Editor, Node } from 'slate';

import { LeydenEditor } from './interfaces/LeydenEditor';
import { Element } from './interfaces/Element';
import { Text } from './interfaces/Text';
import { Validator } from './interfaces/Validator';
import { WithLeydenOptions } from './utils/types';
import { OPERATION_SUBSCRIBERS } from './utils/weakMaps';

export const withLeyden = <T extends Editor>({ editor, ...rest }: WithLeydenOptions<T>): T&LeydenEditor => {
    const e = editor;
    const { apply, isInline, isVoid } = e;

    e.apply = op => {
        // Disallow cell merging (maintain layout)
        if (op.type === 'merge_node'
            && Reflect.get(op.properties, 'type') === 'cell'
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
        Validator.getValidationFunc(rest?.validators??{}, validator)
    );

    e.isInline = element => {
        if (Element.isInline(element)) {
            return true;
        }
        return isInline(element);
    };

    e.isVoid = element => {
        if (Element.isVoid(element)) {
            return true;
        }
        return isVoid(element);
    };

    return e;
};
