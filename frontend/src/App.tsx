import './App.css'
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing.tsx";
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import {Notifications} from "@mantine/notifications";


function App() {


    return (
        <MantineProvider defaultColorScheme="dark">
            <Notifications/>
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </MantineProvider>
    )
}

export default App
