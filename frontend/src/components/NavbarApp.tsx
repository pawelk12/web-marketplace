import {IconBuildingStore, IconCirclePlus} from "@tabler/icons-react";
import {Box, Button, NavLink} from "@mantine/core";
import {useLocation, useNavigate} from "react-router-dom";
import {API_URL} from "../config.ts";
import {ErrorNotification} from "../features/notifications/notifications.ts";

const data = [
    {icon: IconBuildingStore, label: 'Marketplace', link: '/listings'},
    {icon: IconCirclePlus, label: 'Post listing', link: "/listings/new"}
];


export const NavbarApp = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogOut = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Something went wrong");
            }
            navigate("/login");
        }catch(e){
            const err = e as Error;
            ErrorNotification(err.message);
        }
    }

    const items = data.map((item) => (
        <NavLink
            key={item.label}
            active={location.pathname === item.link}
            label={item.label}
            leftSection={<item.icon size="1.5rem" stroke={1.5}/>}
            onClick={() => {
                navigate(item.link);
                }
            }

            color="teal"
        />
    ));

    return (
        <>
            <Box w={265} style={{height: '100vh'}}>{items}</Box>
            <Button w={265} h = {50} style={{ marginBottom: '0.5rem',
                backgroundColor: 'rgba(236,63,63,0.18)',
                color: 'rgb(243,214,214)',
                fontSize: '0.8rem',}}
                onClick={handleLogOut}>

                Log Out
            </Button>
        </>


    );
}
