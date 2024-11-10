//import {useParams} from "react-router-dom";
import {useState} from "react";
import {ItemFormValues} from "../../types/ItemFormValues.ts";

export const ListingForm = () => {
    // const {id} = useParams()
    // return <div>listing form, ID: {id}</div>

    const [form, setForm] = useState<ItemFormValues>({name: '', description: '', condition: 'new', price: 0, negotiable: false});
    const handleChange = (fieldName:string, value: any) => {
        setForm(prev=>({
            ...prev,
            [fieldName]: value
        }));
    }

    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        console.log(form);
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Item Name: </label>
                <input id="name" type="text" name="name" required value={form.name} onChange={(e)=> handleChange("name", e.currentTarget.value)}/>
            </div>

            {/*category*/}

            <div>
                <label htmlFor="description">Item Description: </label>
                <input id="description" type="text" name="description" required value={form.description}
                       onChange={(e) => handleChange("description", e.currentTarget.value)}/>
            </div>

            <div>
                <label htmlFor="condition">Condition: </label>
                <select id="condition" name="condition" value={form.condition}
                        onChange={(e) => handleChange("condition", e.currentTarget.value)}>
                    <option disabled value="">Choose</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                </select>
            </div>

            <div>
            {/*image*/}
            </div>

            <div>
                <label htmlFor="price">Price: </label>
                <input id="price" type="number" name="price" required value={form.price}
                       onChange={(e) => handleChange("price", e.currentTarget.value)}/>
            </div>

            <div>
                <label htmlFor="negotiable">Negotiable: </label>
                <input id="negotiable" type="checkbox" name="negotiable" checked={form.negotiable}
                       onChange={(e) => handleChange("negotiable", e.currentTarget.checked)}/>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}