//import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {ItemFormValues} from "../../types/ItemFormValues.ts";
import {useNavigate} from "react-router-dom";

export const ListingForm = () => {
    // const {id} = useParams()
    // return <div>listing form, ID: {id}</div>

    const [form, setForm] = useState<ItemFormValues>({name: '', description: '', condition: 'new', price: 0, negotiable: false, image: null});
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState<string|null>(null);
    const inputImageRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const handleChange = (fieldName:string, value: any) => {
        setForm(prev=>({
            ...prev,
            [fieldName]: value
        }));
        if(fieldName === 'image') {
            const previewImage = URL.createObjectURL(value)
            setPreviewImage(previewImage);
        }
    }


    const handleRemoveImage = () =>{
        if(previewImage)
        URL.revokeObjectURL(previewImage);
        setPreviewImage(null);
        setForm(prev=>({
            ...prev,
            image: null
        }));
        if(inputImageRef.current){
            inputImageRef.current.value = '';
        }
    }


    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        setIsPending(true);
        if(form.name.length < 5){
            setError("The item name must contain at least 5 letters.");
            return;
        }
        if(form.description.length < 30){
            setError("The item description must contain at least 30 letters.");
            return;
        }

        fetch("http://localhost:3000/listings",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form)
            }
        ).then(()=>{
            setIsPending(false);
            navigate("/listings");
        })

        console.log(form);
    }

    //clean up, avoiding memory leaks
    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);


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
                {/*problem with case when u load up image and then you cancel it in OS gui, then the image will be still displayed
                in web app but it will not be present in form*/}
                <label htmlFor="image">Item Image: </label>
                <input ref={inputImageRef} type="file" id="image" name="image" accept="image/*" required
                       onChange={(e)=>{
                           if(e.target.files && e.target.files[0]){
                               handleChange("image", e.target.files[0]);
                           }
                       }}/>
            </div>

            <div>
                {previewImage && <img src={previewImage} style={{ width: '200px', height: 'auto' }} alt="image preview" />}
                {previewImage && <button type="button" onClick={handleRemoveImage}>Delete image</button>}
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

            {!isPending &&<button type="submit">Submit</button>}
            {isPending &&<button disabled type="submit">Creating listing....</button>}

            <div>
                {error}
            </div>
        </form>
    )
}