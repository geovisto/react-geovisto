import { useEffect, useRef } from "react";

export const useDidUpdateEffect = (func: () => void, dependencies: any) => {
    
    const didMount = useRef(false);

    useEffect(() => {

        if (didMount.current){
            func();
        } 
        else {
            didMount.current = true;
        }
    }, dependencies);
}