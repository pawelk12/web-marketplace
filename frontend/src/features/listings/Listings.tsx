import {SearchPanel} from "../../components/SearchPanel.tsx";
import {ListingDisplay} from "../../components/ListingDisplay.tsx";
import {useEffect, useState} from "react";
import {QueryParams} from "../../types/queryParams.ts";
import {useLocation, useNavigate} from "react-router-dom";

/**
 * Component that renders children components: SearchPanel and ListingDisplay
 *
 * @component
 * @returns {JSX.Element}
 */
export const Listings = () => {
    const [queryParams, setQueryParams] = useState<QueryParams|null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    /**
     * Function which is used to set new query params and navigate to url with query params
     *
     * @param {QueryParams} newParams
     * @returns {void}
     */
    const handleParamsChange = (newParams: QueryParams) => {
        setQueryParams(newParams);
        const newParamsString = new URLSearchParams(newParams).toString();
        navigate(`?${newParamsString}`);
    }

    /**
     * Hook that activates on location change, reads url search params and set state
     *
     * @returns {void}
     */
    useEffect(() => {
        const paramsObj = Object.fromEntries(new URLSearchParams(location.search));
        if((paramsObj["sortBy"] == "price"|| paramsObj["sortBy"] == "createdAt") && (paramsObj["sortOrder"] == "asc"|| paramsObj["sortOrder"] == "desc")){
            const queryParams: QueryParams = {
                sortBy: paramsObj["sortBy"],
                sortOrder: paramsObj["sortOrder"]
                };
            setQueryParams(queryParams);
        }else{
            setQueryParams(null);
        }
    }, [location]);

    return (
        <>
            <SearchPanel setParams={handleParamsChange}></SearchPanel>
            <ListingDisplay queryParams={queryParams}></ListingDisplay>
        </>

    );
}
