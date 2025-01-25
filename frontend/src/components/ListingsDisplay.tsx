import {Card, SimpleGrid, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {ListingForDisplayCard} from "../types/ListingForDisplayCard.ts";
import {QueryParams} from "../types/queryParams.ts";
import {Loading} from "./Loading.tsx";
import {fetchListings} from "../api/listings.ts";
import {ErrorNotification} from "../features/notifications/notifications.ts";
import {useNavigate} from "react-router-dom";


export const ListingsDisplay = ({ queryParams } : {queryParams: QueryParams| null}) => {

    const [listings, setListings] = useState<ListingForDisplayCard []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParamsString = queryParams ? new URLSearchParams(queryParams).toString() : "";
                const data =  await fetchListings(queryParamsString);
                setListings(data);
                setLoading(false);
                setError(null);
            } catch (error) {
                setLoading(false);
                if(error instanceof Error) {
                    setError(error.message);
                    ErrorNotification(error.message);
                } else {
                    setError("Something went wrong, sorry.");
                    ErrorNotification("Something went wrong.");
                }
            }
        };

        fetchData()
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
                        onClick={() => navigate(`/listings/${listing.id}`)}
                        style={{ cursor: "pointer" }}
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