import { withLeyden, Table, Transforms } from 'leyden';
import { Leyden, Editable, withReact } from 'leyden-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

import { cellRenderers } from './cells';
import { newRow, newTable } from './data/generate';
import { headerRenderers } from './headers';
import { textRenderers } from './text';
import { CSI, UOM } from './types';
import { validators } from './data/validators';

export const Demo: FC = () => {
    const [descendants, setDescendants] = useState<[Table]>([newTable()]);

    const editor = useMemo(() => (
        withLeyden({
            editor: withHistory(
                withReact(
                    createEditor()
                )
            ),
            validators,
        })
    ), []);

    useEffect(() => {
        setTimeout(() => {
            Transforms.setCell<'UnitOfMeasure'>(
                editor,
                { uom: UOM.Gallons },
                { at: { x: 2, y: 5 } },
            );
        }, 5000);
    }, []);

    useEffect(() => {
        const listener = (e: KeyboardEvent): void => {
            if (e.key === 'i') {
                Transforms.insertRows(editor, newRow(
                    'inserted',
                    Math.trunc(Math.random()*100),
                    UOM.Each,
                    CSI.Div09,
                    Math.trunc(Math.random()*100)
                ), { at: 2, position: 'below' });
            }
            if (e.key === 'a') {
                Transforms.insertRows(editor, newRow(
                    'insertedabove',
                    Math.trunc(Math.random()*100),
                    UOM.Each,
                    CSI.Div09,
                    Math.trunc(Math.random()*100)
                ), { at: 1 });
            }
            if (e.key === 'd') {
                Transforms.deleteRows(editor, {
                    at: new Set([1, 3]),
                });
            }
            if (e.key === 'm') {
                Transforms.moveRow(editor, {
                    at: 4,
                    to: 2,
                });
            }
            if (e.key === 's') {
                Transforms.swapRows(editor, {
                    a: 4,
                    b: 3,
                });
            }
        };
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#D7E1E5' }}>
            <Leyden
                editor={editor}
                value={descendants}
                onChange={setDescendants}
            >
                <Editable
                    cellRenderers={cellRenderers}
                    headerRenderers={headerRenderers}
                    textRenderers={textRenderers}
                    tableOptions={{
                        stickyColumnHeaders: true,
                    }}
                />
            </Leyden>
        </div>
    );
};
