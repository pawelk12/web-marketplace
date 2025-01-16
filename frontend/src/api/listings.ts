import {API_URL} from "../config.ts";

export const fetchListings = async (queryParamsString: string) => {
    const response = await fetch(`${API_URL}/listings?${queryParamsString}`, {
            method: 'GET',
            credentials: 'include',
        }
    );
    if (!response.ok) {
        const dataError = await response.json();
        throw new Error(dataError.message);
    }
    return await response.json();
}