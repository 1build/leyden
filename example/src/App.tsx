import React, { FC } from 'react';

import { Demo } from './Demo'; 

export const App: FC = () => {
    return (
        <div style={{
            marginTop: '-1px',
            fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
        }}>
            <Demo />
        </div>
    );
};
