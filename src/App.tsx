import './App.css'
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing.tsx";
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';


function App() {


    return (
        <MantineProvider defaultColorScheme="dark">
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </MantineProvider>
    )
}

export default App
