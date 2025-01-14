import {API_URL} from "../config.ts";

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

export const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("Something went wrong");
    }
}

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