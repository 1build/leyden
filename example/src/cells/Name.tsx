import { Transforms } from 'leyden';
import { CellRenderer, useLeydenStatic } from 'leyden-react';
import React, { useEffect } from 'react';

export const Name: CellRenderer<'Name'> = ({
    attributes,
    children,
}) => {
    const editor = useLeydenStatic();

    useEffect(() => {
        const listener = (e: KeyboardEvent): void => {
            if (e.key === 'r') {
                Transforms.setCellChildren<'Name'>(
                    editor,
                    [{ type: 'Name', children: [{ text: 'Changed Name', type: 'Text' }] }],
                );

            }
        };
        document.addEventListener('keydown', listener);
        return () => {
            document.removeEventListener('keydown', listener);
        };
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
            Name: {children}
        </div>
    );
};
