export const fetchItems = async <T, >(resourceUrl: string): Promise<T> => {
    return await fetch(resourceUrl)
        .then(response => {
            if (!response.ok) {
                console.log(response)
            } else
                return response.json()
        })
        .then(data => data as T)
}