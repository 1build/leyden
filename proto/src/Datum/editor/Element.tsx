import React, { FC } from 'react';
import {
    ReactEditor,
    RenderElementProps,
    useSlateStatic,
} from 'slate-react';

export const Element: FC<RenderElementProps> = ({
    attributes,
    children,
    element,
}) => {
    const editor = useSlateStatic();

    if (element.isRow()) {
        return <> {children} </>;
    }

    if (element.isTable()) {
        const colCount = element.children[0].children.length;
        const rowCount = element.children.length;

        return (
            <div
                {...attributes}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `fit-content(1.5rem) repeat(${colCount-1}, auto)`,
                    gridTemplateRows: `repeat(${rowCount}, auto)`,
                    gap: '1px',
                    backgroundColor: 'rgba(100, 100, 100, 0.2)',
                    alignItems: 'center',
                    justifyItems: 'start',
                    width: 'fit-content',
                    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                }}
            >
                {children}
            </div>
        );
    }

    if (element.isColumnHeaderCell()) {
        const path = ReactEditor.findPath(editor, element);
        // Logic is slightly off - goes from "Z" to "BA" instead of "AA" 
        const cellPositionInRow = path[path.length-1]-1;
        const positionBase26 = cellPositionInRow.toString(26);
        let label = '';
        for (let i = 0; i < positionBase26.length; i++) {
            const originalCharCode = positionBase26.charCodeAt(i);
            let adjustedCharCode: number;
            if (originalCharCode <= 57) {
                adjustedCharCode = originalCharCode + 17;
            } else {
                adjustedCharCode = originalCharCode - 22;
            }
            label = `${label}${String.fromCharCode(adjustedCharCode)}`;
        }
        return (
            <div
                {...attributes}
                contentEditable={false}
                style={{
                    backgroundColor: 'rgba(100, 100, 100, 0.1)',
                    color: 'rgba(75, 75, 75)',
                    minWidth: '3rem',
                    width: 'calc(100% - 0.5rem)',
                    height: 'calc(100% - 0.5rem)',
                    padding: '0.25rem',
                    textAlign: 'center',
                    fontSize: 10,
                }}
            >
                {label}
            </div>
        );
    }

    if (element.isRowHeaderCell()) {
        const path = ReactEditor.findPath(editor, element);
        const rowPositionInTable = path[path.length-2];
        return (
            <div
                {...attributes}
                contentEditable={false}
                style={{
                    backgroundColor: 'rgba(100, 100, 100, 0.1)',
                    color: 'rgba(75, 75, 75)',
                    minWidth: '2rem',
                    width: 'calc(100% - 0.5rem)',
                    height: 'calc(100% - 0.5rem)',
                    padding: '0.25rem',
                    textAlign: 'center',
                    fontSize: 10,
                }}
            >
                {rowPositionInTable}
            </div>
        );
    }

    if (element.isTableBodyCell()) {
        return (
            <div {...attributes} style={{
                backgroundColor: 'white',
                width: 'calc(100% - 0.5rem)',
                height: 'calc(100% - 0.5rem)',
                padding: '0.25rem',
                fontSize: 12,
                letterSpacing: '0.05em',
            }}>
                {children}
            </div>
        );

    }

    return (
        <div {...attributes}>
            {children}
        </div>
    );
};
