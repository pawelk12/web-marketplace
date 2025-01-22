import {
    Box,
    Button,
    Checkbox,
    FileInput,
    Group,
    NativeSelect,
    NumberInput,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Loading} from "../../components/Loading.tsx";
import {ErrorNotification, SuccessNotification} from "../notifications/notifications.ts";
import {editListing} from "../../api/listing.ts";
import {useListingEditForm} from "./useListingEditForm.ts";
import {getOriginalFileName} from "../../utils/getOriginalFileName.ts";
import {IconTrash} from "@tabler/icons-react";
import {useFetchListing} from "./useFetchListing.ts";


export const ListingEditForm = () => {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const {listing, error, loading, setLoading, id} = useFetchListing()
    const form  = useListingEditForm(listing, isDisabled);


    const handleSubmit = form.onSubmit( async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("condition", values.condition);
        formData.append("price", values.price.toString());
        formData.append("negotiable", values.negotiable.toString());
        if(values.image) {
            formData.append("image", values.image);
        }
        try {
            await editListing(formData, id);
            setLoading(false);
            navigate("/listings");
            SuccessNotification("The listing has been edited.")
        } catch(error){
            setLoading(false);
            if(error instanceof Error) ErrorNotification(error.message);
            else ErrorNotification("Something went wrong");
        }

    });
    return (
        <>
            {loading && <Loading/>}
            {error && <div>{error}</div>}
            {listing&&<Box style={(theme) => ({
                backgroundColor: theme.colors.dark[6],
                margin: "auto",
                borderRadius: 10,
                padding: "20px",
                textAlign: "left",
            })} >
                <form onSubmit={handleSubmit}>
                    <TextInput
                        withAsterisk = {false}
                        required
                        mb="lg"
                        label="Name: "
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <Textarea
                        autosize
                        withAsterisk = {false}
                        required
                        mb="lg"
                        label="Description: "
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                    />


                    <NativeSelect
                        label="Condition:"
                        mb="lg"
                        data={['new', 'used']}
                        key={form.key('condition')}
                        {...form.getInputProps('condition')}
                    />

                    <NumberInput
                        withAsterisk = {false}
                        hideControls = {true}
                        mb="lg"
                        required
                        label="Price: "
                        placeholder="0.00"
                        key={form.key('price')}
                        {...form.getInputProps('price')}
                    />

                    <Checkbox
                        mb="lg"
                        label="Negotiable"
                        key={form.key('negotiable')}
                        {...form.getInputProps('negotiable', { type: 'checkbox' })}
                    />
                    <FileInput
                        clearable={true}
                        mb="lg"
                        accept="image/*"
                        label="Picture:"
                        placeholder="Choose file"
                        disabled={isDisabled}
                        // key={form.key('image')}
                        {...form.getInputProps('image')}
                    />
                    {isDisabled && <Group justify="flex-start" mt="xs" ml="xs">
                        <Text fw={100}>{getOriginalFileName(listing.fileName)}</Text>
                        <Button color="red" radius="xl" variant="light" onClick={()=>{setIsDisabled(false)}}>
                            <IconTrash></IconTrash>
                        </Button>
                    </Group>}

                    <Group justify="flex-end" mt="md">
                        {!loading &&<Button type="submit" color="teal" >Submit</Button>}
                    </Group>
                </form>
            </Box>}
        </>
    );
}