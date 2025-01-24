export type ItemFormValues = {
    // id?: number;
    name: string;
    description: string;
    condition: "new" | "used";
    price: number;
    negotiable: boolean;
    image: File | null;
}