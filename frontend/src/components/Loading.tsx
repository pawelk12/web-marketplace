import {SkewLoader} from "react-spinners";
import {CSSProperties} from "react";


export const Loading = () => {

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",

};

    return (
        <SkewLoader
            cssOverride={override}
            color="#099268"
            size={30}
        />
    )
}