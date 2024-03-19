// for queries
export type searchResultsArrayType = {
    id: number,
    name: string,
    avatar?: string
}[] | [];

export type sortByType = "date" | "popularity";

// for components
export type searchResultsType = {
    type?: string,
    results: searchResultsArrayType
};

export type searchButtonHandlerType = (searchValue: string) => void;