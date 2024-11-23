import {IconBuildingStore, IconCirclePlus} from "@tabler/icons-react";
import {Box, NavLink} from "@mantine/core";
import {useLocation, useNavigate} from "react-router-dom";

const data = [
    {icon: IconBuildingStore, label: 'Marketplace', link: '/listings'},
    {icon: IconCirclePlus, label: 'Post listing', link: "/listings/new"}
];


export const NavbarApp = () => {

    const navigate = useNavigate();
    const location = useLocation();

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

    return <Box w={265}>{items}</Box>;
}
