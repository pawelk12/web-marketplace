import {API_URL} from "../config.ts";

export const createListing = async (formData: FormData) => {
    const response = await fetch("http://localhost:8000/api/listings",
        {
            method: "POST",
            body: formData,
            credentials: "include",
        })

    if (!response.ok) {
        if (response.status === 422) {
            throw new Error("The file size must not exceed 2 MB.");
        }
        const errData = await response.json();
        throw new Error(errData.message);
    }
}

export const getListing = async (id: string | undefined) => {
    const response = await fetch(`${API_URL}/listings/${id}`, {
        method: "GET",
        credentials: "include",
    })
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message);
    }
    return await response.json();
}