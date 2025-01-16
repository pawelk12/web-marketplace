import './App.css'
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./features/Routing.tsx";
import '@mantine/core/styles.css';
import {MantineProvider} from '@mantine/core';
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';


function App() {


    return (
        <MantineProvider defaultColorScheme="dark">
            <Notifications position="bottom-right"/>
            <BrowserRouter>
                <Routing/>
            </BrowserRouter>
        </MantineProvider>
    )
}

export default App
