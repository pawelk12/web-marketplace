export type ItemFormValues = {
    name: string;
    description: string;
    condition: "new" | "used";
    price: number;
    negotiable: boolean;
}