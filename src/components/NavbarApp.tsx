import {IconBuildingStore, IconCirclePlus} from "@tabler/icons-react";
import {useState} from "react";
import {Box, NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";


const data = [
    {icon: IconBuildingStore, label: 'Marketplace', link: '/listings'},
    {icon: IconCirclePlus, label: 'Post listing', link: "/listings/new"}
];


export const NavbarApp = () => {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();

    const items = data.map((item, index) => (
        <NavLink
            key={item.label}
            active={index === active}
            label={item.label}
            leftSection={<item.icon size="1rem" stroke={1.5}/>}
            onClick={() => {
                setActive(index)
                navigate(item.link);
                }
            }

            color="teal"
        />
    ));

    return <Box w={265}>{items}</Box>;
}
