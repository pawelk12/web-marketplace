import {Badge, Card, Group, Image, Text} from '@mantine/core';
import {Link} from "react-router-dom";
import {API_URL} from "../../config.ts";
import {convertToDate} from "../../utils/convertToDate.ts";
import {Loading} from "../../components/Loading.tsx";
import {useFetchListing} from "./useFetchListing.ts";

export const ListingView = () => {
    const {listing, error, loading} = useFetchListing()

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
                            alt="picture"
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