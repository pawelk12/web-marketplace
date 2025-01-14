import {API_URL} from "../../../config.ts";

export const register = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password}),
    })
    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed. Please try again later.");
    }
    return await response.text();
}