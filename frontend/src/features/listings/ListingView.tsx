import {Badge, Card, Group, Image, Text} from '@mantine/core';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {API_URL} from "../../config.ts";
import {ListingViewValues} from "../../types/ListingViewValues.ts";
import {convertToDate} from "../../utils/convertToDate.ts";
import {Loading} from "../../components/Loading.tsx";
import {getListing} from "../../api/listing.ts";
import {ErrorNotification} from "../notifications/notifications.ts";

export const ListingView = () => {
    const [listing, setListing] = useState<ListingViewValues>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const {id} = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await getListing(id);
                setListing(data);
                setLoading(false);
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
        }
        fetchListing();
    }, [id]);

    return (
        <>
            {loading && <Loading/>}
            {error && <div>{error}</div>}
            {listing && <Card style={{
                minHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }} shadow="sm" padding="lg" radius="md" withBorder>
                <div>
                    <Card.Section>
                        <Image
                            src={`http://localhost:8000/uploads/${listing.fileName}`}
                            height={500}
                            alt="Norway"
                        />
                    </Card.Section>

                    <Group justify="space-between" mb="xs" mt="xs">
                        <Text size="md" c="dimmed">
                            Posted on: {convertToDate(listing.createdAt)}
                        </Text>
                    </Group>
                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500} style={{fontSize: "24px"}}>{listing.name}</Text>
                        <Badge color="teal"
                               fw={450}
                               size="xl"
                               style={{fontSize: "18px"}}>
                            {listing.price}$
                        </Badge>
                    </Group>
                    <Group justify="space-between" mt="xs" mb="xs">
                        <Text c="dimmed">Condition: {listing.condition}</Text>
                        <Text c="dimmed">Negotiable: {listing.negotiable ? "✔":"❌"}</Text>
                    </Group>
                    <div style={{whiteSpace: "normal", wordWrap: "break-word", textAlign: "left"}}>
                        {listing.description}
                    </div>
                </div>
                <Group  mt="xs">
                    <Text>author:</Text>
                    {/*temporarily*/}
                    <Link to={`${API_URL}/user/${listing.userId}`}>author</Link>
                </Group>
            </Card>}
        </>
    )
}