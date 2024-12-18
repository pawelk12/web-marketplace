import {SearchPanel} from "../../components/SearchPanel.tsx";
import {ListingDisplay} from "../../components/ListingDisplay.tsx";
import {useState} from "react";
import {QueryParams} from "../../types/queryParams.ts";


export const Listings = () => {
const [queryParams, setQueryParams] = useState<QueryParams|null>(null);

const handleParamsChange = (newParams: QueryParams) => {
    setQueryParams(newParams);
}

    return (
        <>
            <SearchPanel setParams={handleParamsChange} ></SearchPanel>
            <ListingDisplay queryParams={queryParams}></ListingDisplay>
        </>

    );
}
