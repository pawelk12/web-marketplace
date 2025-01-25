import {useEffect, useState} from "react";
import {getListing, getListingPermission} from "../../api/listing.ts";
import {ErrorNotification} from "../notifications/notifications.ts";
import {ListingViewValues} from "../../types/ListingViewValues.ts";
import {useParams} from "react-router-dom";



export const useFetchListing = () => {
    const [listing, setListing] = useState<ListingViewValues | null>(null)
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const {id} = useParams();

    const fetchPermission = async () => {
        try{
            const response = await getListingPermission(id);
            if(response.ok){
                setIsAllowed(true);
            }
        }
        catch(error){
            if(error instanceof Error) {
                setError(error.message);
                ErrorNotification(error.message);
                // setLoading(false);
            }
        }
    }

    const fetchListing = async () => {
        try {
            const data = await getListing(id);
            setListing(data);
            // setLoading(false);
        } catch (error) {
            // setLoading(false);
            if(error instanceof Error) {
                setError(error.message);
                ErrorNotification(error.message);
            } else {
                setError("Something went wrong, sorry.");
                ErrorNotification("Something went wrong.");
            }
        }
    }
    useEffect(() => {
        const fetchData = async () =>{

            await fetchPermission();
            await fetchListing();
            setLoading(false);
        }
        fetchData();
    }, [id]);

    return {listing, error, loading, setLoading, id, isAllowed};
}