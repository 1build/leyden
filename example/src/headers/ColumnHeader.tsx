import { LeydenEditor } from 'leyden';
import { HeaderRenderer, useLeyden } from 'leyden-react';
import React, { CSSProperties, useMemo } from 'react';

export const ColumnHeader: HeaderRenderer = ({ position }) => {
    const editor = useLeyden();

    const colFocused = useMemo(() => (
        LeydenEditor.selectedColumn(editor) === position
    ), [editor.selection]);

    const headerText = () => {
        switch(position) {
            case 0:
                return 'Name';
            case 1:
                return 'Quantity';
            case 2:
                return 'UOM';
            case 3:
                return 'CSI';
            case 4:
                return 'Total';
            default:
                return '';
        }
    };

    const containerStyle = (): CSSProperties => ({
        display: 'flex',
        position: 'relative',
        justifyContent: 'start',
        alignItems: 'center',
        height: '4.625rem',
        padding: `0 0.75rem 0 ${position === 0 ? '2.375rem' : '0.75rem'}`,
        backgroundColor: colFocused ? '#314071' : '#161E3A',
    });

    const borderHelperStyle = (): CSSProperties => ({
        position: 'absolute',
        top: -1,
        right: -1,
        bottom: -1,
        left: -1,
        boxSizing: 'border-box',
        border: '1px solid #2c344e',
        borderTop: colFocused ? '1px solid #5065a1' : '1px solid #2c344e',
        userSelect: 'none',
    });

    const titleStyle = (): CSSProperties => ({
        fontSize: 14,
        fontWeight: 700,
        lineHeight: '14px',
        color: '#FFFFFF',
        opacity: colFocused ? 1 : 0.8,
    });

    return (
        <div style={containerStyle()}>
            <span style={borderHelperStyle()} />
            <span style={titleStyle()}>
                {headerText()}
            </span>
        </div>
    );
};
