import './App.css'
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing.tsx";
import '@mantine/core/styles.css';
import {createTheme, MantineProvider} from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {


    return (
        <MantineProvider theme={theme}>
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </MantineProvider>
    )
}

export default App
