import {createContext} from "react";

type SearchContextType = {
    value: string,
    setValue: (value: string) => void
}

const defaultValues: SearchContextType = {
    value: "",
    setValue: () => {
    }
}

export const SearchContext = createContext(defaultValues);
