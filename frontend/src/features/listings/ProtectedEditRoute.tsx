import {useParams} from "react-router-dom";
import {ErrorNotification} from "../notifications/notifications.ts";
import {useEffect, useState} from "react";
import {Loading} from "../../components/Loading.tsx";
import {getListingPermission} from "../../api/listing.ts";
import {ErrorPage} from "../error/ErrorPage.tsx";

export const ProtectedEditRoute = ({children} : {children: React.ReactNode}) => {
    const {id} = useParams();
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPermission = async () => {
        const response = await getListingPermission(id);
        if(response.ok){
            setIsAllowed(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        try{
            fetchPermission();
        }catch(error){
            setLoading(false);
            const err = error as Error;
            ErrorNotification(err.message);
        }
    }, [id]);

    if(!isAllowed && !loading){
        return <ErrorPage/>;
    }

    return (
        <>
            {loading && <Loading/>}
            {isAllowed && children}
        </>
    );
}