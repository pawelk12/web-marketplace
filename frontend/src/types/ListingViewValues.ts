export type ListingViewValues = {
    name: string;
    description: string;
    condition: "new" | "used";
    price: number;
    negotiable: boolean;
    fileName: string;
    createdAt: string;
    userId: number;
    authorName: string;
}