import React from 'react';
import {
    ThemeProvider,
    createTheme,
} from '@material-ui/core/styles';

import AppContent from './components/AppContent';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
    palette: {
        // primary: {
        //     main: '#ff0000',
        // },
        // background: {
        //     default: '#ffffff',
        // },
    },
});

function App() {
    console.log(theme);

    return (
        <ThemeProvider theme={theme}>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
