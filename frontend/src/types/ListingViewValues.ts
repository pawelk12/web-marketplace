type User = {
    username: string,
}

export type ListingViewValues = {
    name: string;
    description: string;
    condition: "new" | "used";
    price: number;
    negotiable: boolean;
    fileName: string;
    createdAt: string;
    userId: number;
    user: User;
}