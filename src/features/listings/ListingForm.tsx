import {Button, Checkbox, FileInput, Group, NativeSelect, NumberInput, Textarea, TextInput} from "@mantine/core";
import {useListingForm} from "./useListingForm.tsx";
import {useNavigate} from "react-router-dom";
// import {useState} from "react";


export const ListingForm = () => {
    const form  = useListingForm();
    const navigate = useNavigate();
    // const [isPending, setIsPending] = useState(false);

const handleSubmit = form.onSubmit((values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("condition", values.condition);
        formData.append("price", values.price.toString());
        formData.append("negotiable", values.negotiable.toString());
        formData.append("image", values.image!);

        fetch("http://localhost:3000/listings",
        {
            method: "POST",
            body: formData,
        }
        ).then(()=>{
            // setIsPending(false);
            navigate("/listings");
        })
        console.log(formData);
    });

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                withAsterisk = {false}
                required
                label="Name: "
                placeholder="name of your item"
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <Textarea
                withAsterisk = {false}
                required
                label="Description: "
                placeholder="description of your item"
                key={form.key('description')}
                {...form.getInputProps('description')}
            />


            <NativeSelect
                label="Condition"
                data={['new', 'used']}
                key={form.key('condition')}
                {...form.getInputProps('condition')}
            />

            <NumberInput
                withAsterisk = {false}
                required
                label="Price: "
                placeholder="0.00"
                key={form.key('price')}
                {...form.getInputProps('price')}
            />

            <Checkbox
                mt="md"
                label="Negotiable"
                key={form.key('negotiable')}
                {...form.getInputProps('negotiable', { type: 'checkbox' })}
            />
            <FileInput
                clearable={true}
                accept="image/*"
                label="Picture"
                placeholder="Choose file"
                // key={form.key('image')}
                {...form.getInputProps('image')}
            />

            <Group justify="flex-end" mt="md">
                <Button type="submit" color="teal" >Submit</Button>
            </Group>
        </form>
    );
}