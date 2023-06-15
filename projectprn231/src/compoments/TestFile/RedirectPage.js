import React from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export function RedirectPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const param1 = searchParams.get('id');
    console.log(param1);
    return(
        
        <div>
            
        </div>
    )
}
