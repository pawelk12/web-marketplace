import {Box, Button, Checkbox, FileInput, Group, NativeSelect, NumberInput, Textarea, TextInput} from "@mantine/core";
import {useListingForm} from "./useListingForm.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Loading} from "../../components/Loading.tsx";
import {ErrorNotification, SuccessNotification} from "../notifications/notifications.ts";
import {createListing} from "../../api/listing.ts";


// Category for example MultiSelect

export const ListingForm = () => {
    const form  = useListingForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

const handleSubmit = form.onSubmit( async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("condition", values.condition);
    formData.append("price", values.price.toString());
    formData.append("negotiable", values.negotiable.toString());
    formData.append("image", values.image!);
    try {
        await createListing(formData);
        setLoading(false);
        navigate("/listings");
        SuccessNotification("The listing has been posted.")
    } catch(error){
        setLoading(false);
        if(error instanceof Error) ErrorNotification(error.message);
        else ErrorNotification("Something went wrong");
    }

});

    return (
        <>
            {loading && <div ><Loading/></div>}

            <Box style={(theme) => ({
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
                        placeholder="Name of your item"
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <Textarea
                        autosize
                        withAsterisk = {false}
                        required
                        mb="lg"
                        label="Description: "
                        placeholder="Description of your item"
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
                        // key={form.key('image')}
                        {...form.getInputProps('image')}
                    />
                    <Group justify="flex-end" mt="md">
                        {!loading &&<Button type="submit" color="teal" >Submit</Button>}
                    </Group>
                </form>
            </Box>
        </>
    );
}