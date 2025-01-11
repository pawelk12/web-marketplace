import {API_URL} from "../../../config.ts";

export const login = async (email:string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa(email+":"+password),
        },
        credentials: 'include',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
    }
    return await response.text();
}