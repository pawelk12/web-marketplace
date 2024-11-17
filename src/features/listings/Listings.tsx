import {Box, Button, Card, Collapse, Group, Image, SimpleGrid, Text} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconPhoto} from '@tabler/icons-react';

const listings = [
    { id: 1, name: 'Bike', description: '', condition: "new", price: 3.14, negotiable: true, image: "https://via.placeholder.com/300}" },
    { id: 2, name: 'Bike', description: '', condition: "new", price: 3.14, negotiable: true, image: "https://via.placeholder.com/300}"},
    { id: 3, name: 'Bike', description: '', condition: "new", price: 3.14, negotiable: true, image: "https://via.placeholder.com/300"},
    { id: 4, name: 'Bike', description: '', condition: "new", price: 3.14, negotiable: true, image: "https://via.placeholder.com/300"},
    { id: 5, name: 'Bike', description: '', condition: "new", price: 3.14, negotiable: true, image: "https://via.placeholder.com/300"},

];


export const Listings = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const icon = <IconPhoto size={14} />;


    return (
        <Box mx="auto">
            <Button onClick={toggle} fullWidth={true} variant="outline" color="teal" size="md" radius="lg" justify="space-between" rightSection={icon}  mt="md">Category 1</Button>


            <Collapse in={opened}>
                <SimpleGrid cols={1}>
                    {listings.map((listing) => (
                        <Card
                            mt="md"
                            radius="md"
                            shadow="sm"
                            padding=""
                            component="a"
                            // href="link to listing"
                            target="_blank"
                        >
                            <Group gap="xl" justify="space-between">

                                <Image
                                    src={listing.image}
                                    radius="md"
                                    h={100}
                                    w="auto"
                                    fit="contain"
                                    alt="Listing image"
                                />


                                <Text fw={400} size="lg">
                                    {listing.name}
                                </Text>

                                <Text mr="xl">
                                    {listing.price.toString() + "$"}
                                </Text>
                            </Group>

                        </Card>
                    ))}

                </SimpleGrid>
            </Collapse>
        </Box>
    );
}
