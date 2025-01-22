import {useForm} from "@mantine/form";
import {ItemFormValues} from "../../types/ItemFormValues.ts";
import {ListingViewValues} from "../../types/ListingViewValues.ts";
import {useEffect} from "react";

export const useListingEditForm = (listing: ListingViewValues | null, isDisabled: boolean) => {
    const form = useForm<ItemFormValues>({
        mode: 'uncontrolled',
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
                    return "The item name must contain at least 5 characters."
                }
                if (value.length > 50) {
                    return "The item name cannot exceed 50 characters."
                }
            },
            description: (value) => {
                if (value.length < 100) {
                    return "The item description must contain at least 100 characters."
                }
                if (value.length > 1000) {
                    return "The item description cannot exceed 1000 characters."
                }
            },

            price: (value) => {
                if (value < 0) {
                    return "Price can not be negative."
                }
            },
            image: (value) => {
                if (value === null && !isDisabled) {
                    return "You must upload an image."
                }
            }
        }

    });

    useEffect(() => {
        if (listing) {
            // const fetchFile = async () => {
            //     try {
            //         const response = await fetch(`http://localhost:8000/uploads/${listing.fileName}`,
            //             {mode: 'no-cors',});
            //         // const blob = await response.blob();
            //         console.log(response);
            //     }
            //     catch(error){
            //         console.log(error);
            //     }
            //
            // }
            form.setValues(listing);
            // fetchFile();
        }
    }, [listing]);
    return form;
}