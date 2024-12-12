import {Card, SimpleGrid, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {ListingForDisplayCard} from "../types/ListingForDisplayCard.ts";

export const ListingDisplay = () => {

    const [listings, setListings] = useState<ListingForDisplayCard []>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/listings");
                if (!response.ok) {
                    throw new Error(`status: ${response.status}`);
                }
                const data = await response.json();
                setListings(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <SimpleGrid cols={1}>
            {listings.map((listing) => (
                <Card
                    mt="md"
                    withBorder={true}
                    radius="md"
                    shadow="lg"
                    padding=""
                    component="a"
                    // href="link to listing"
                    target="_blank"
                >

                    <SimpleGrid cols={3}>


                        <img
                            src={`http://localhost:8000/uploads/${listing.fileName}`}
                            alt="Listing image"
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />


                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Text fw={400} size="lg" truncate="end">
                                {listing.name}
                            </Text>
                        </div>

                        <div style={{display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            <Text mr="xl" truncate="end">
                                {listing.price.toString() + "$"}
                            </Text>

                        </div>
                    </SimpleGrid>
                </Card>
            ))}

        </SimpleGrid>
    );
}