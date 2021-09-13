import { HeaderRenderer } from 'leyden-react';
import React, { CSSProperties } from 'react';

export const ColumnHeader: HeaderRenderer = ({ position }) => {
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
        backgroundColor: '#161E3A',
    });

    const borderHelperStyle = (): CSSProperties => ({
        position: 'absolute',
        top: -1,
        right: -1,
        bottom: -1,
        left: -1,
        boxSizing: 'border-box',
        border: '1px solid #2c344e',
        userSelect: 'none',
    });

    const titleStyle = (): CSSProperties => ({
        fontSize: 14,
        fontWeight: 700,
        lineHeight: '14px',
        color: '#FFFFFF',
        opacity: 0.8,
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
