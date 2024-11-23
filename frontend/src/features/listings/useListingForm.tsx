import {useForm} from "@mantine/form";
import {ItemFormValues} from "../../types/ItemFormValues.ts";

export const useListingForm = () => {
    return useForm<ItemFormValues>({
        mode: 'controlled',
        initialValues: {
            name: "",
            description: "",
            condition: "new",
            price: 0,
            negotiable: false,
            image: null,
        },

        validate: {
            name: (value) => {
                if (value.length < 5) {
                    return "The item name must contain at least 5 letters."
                }
            },
            description: (value) => {
                if (value.length < 10) {
                    return "The item name must contain at least 10 letters."
                }
            },

            price: (value) => {
                if (value < 0) {
                    return "Price can not be negative."
                }
            },
            image: (value) => {
                if (value === null) {
                    return "You must upload an image."
                }
            }
        }

    });
}