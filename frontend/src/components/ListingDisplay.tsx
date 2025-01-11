import {Card, SimpleGrid, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {ListingForDisplayCard} from "../types/ListingForDisplayCard.ts";
import {QueryParams} from "../types/queryParams.ts";
import {Loading} from "./Loading.tsx";


export const ListingDisplay = ({ queryParams } : {queryParams: QueryParams| null}) => {

    const [listings, setListings] = useState<ListingForDisplayCard []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let queryParamsString: string = "";
                if(queryParams!=null){
                    const paramsString = new URLSearchParams(queryParams).toString();
                    queryParamsString = paramsString;
                }
                const response = await fetch(`http://localhost:8000/api/listings?${queryParamsString}`);
                if (!response.ok) {
                    throw new Error(`status: ${response.status}`);
                }
                const data = await response.json();
                setListings(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if(error instanceof Error)
                    setError(error.message);
                else setError("Something went wrong");
            }
        };

        fetchData();
    }, [queryParams]);

    return (
        <>
            {loading && <Loading/>}
            {error && <div>{error}</div>}
            {listings &&<SimpleGrid cols={1}>
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

            </SimpleGrid>}
        </>
    );
}