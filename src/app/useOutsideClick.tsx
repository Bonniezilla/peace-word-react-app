import { useEffect, useRef } from "react";


export const useOutsideClick = (callback: (target) => void) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event.target);
            }
        };

        document.addEventListener('mouseup', handleClickOutside);
        
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [callback]);

    return ref;
}