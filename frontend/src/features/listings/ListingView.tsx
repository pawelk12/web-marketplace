import {Badge, Button, Card, Group, Image, Modal, Text} from '@mantine/core';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {API_URL} from "../../config.ts";
import {convertToDate} from "../../utils/convertToDate.ts";
import {Loading} from "../../components/Loading.tsx";
import {useFetchListing} from "./useFetchListing.ts";
import {useDisclosure} from "@mantine/hooks";
import {deleteListing} from "../../api/listing.ts";
import {ErrorNotification, SuccessNotification} from "../notifications/notifications.ts";

export const ListingView = () => {
    const {listing, error, loading, isAllowed} = useFetchListing()
    const navigate = useNavigate();
    const location = useLocation();
    const [opened, { open, close }] = useDisclosure(false);
    const {id} = useParams();


    const handleEdit = () => {
        navigate(`${location.pathname}/edit`);
    }

    const handleDelete = async () => {
        try{
            const response = await deleteListing(id);
            if(response.status === 204){
                navigate('/listings');
                SuccessNotification("Listing has been deleted.");
            }
            else{
                throw new Error("Something went wrong");
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch(error){
            ErrorNotification("Failed to delete listing");
        }
    }

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
                    <Link to={`${API_URL}/user/${listing.userId}`}>{listing.user.username}</Link>
                </Group>
                {isAllowed &&
                    <Group mt="lg">
                        <Modal opened={opened} onClose={close} title="Are you sure you want to delete your listing?" centered>
                            <Button onClick={handleDelete} fullWidth={true} color="red" variant="outline">Yes, I'm sure, please delete listing.</Button>
                        </Modal>
                        <Button onClick={handleEdit} fullWidth={true} variant="outline" color="blue">Edit</Button>
                        <Button onClick={open} fullWidth={true} variant="outline" color="red">Delete</Button>
                    </Group>
                }
            </Card>}
        </>
    )
}