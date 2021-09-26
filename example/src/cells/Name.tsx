import { LeydenEditor } from 'leyden';
import { CellRenderer, ReactEditor, useLeydenStatic } from 'leyden-react';
import React, { useEffect } from 'react';

export const Name: CellRenderer<'Name'> = ({
    attributes,
    children,
    element,
}) => {
    const editor = useLeydenStatic();

    useEffect(() => {
        const ownCoords = ReactEditor.cellCoords(editor, element);
        if (!ownCoords) {
            return;
        }
        const unsubscribe = LeydenEditor.subscribeToCell(
            editor,
            { y: ownCoords.y, x: ownCoords.x+2 },
            'UnitOfMeasure',
            cell => {
                console.log({ ownCoords, cell });
            }
        );
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div
            {...attributes}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f6f8f8',
                height: '3rem',
                padding: '0 2.75rem 0 2.375rem',
                whiteSpace: 'nowrap',
            }}
        >
            {children}
        </div>
    );
};
