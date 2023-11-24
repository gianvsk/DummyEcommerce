export const useSearchbar = () => {

    const searchbarOpen = useState('searchbar', () => true)

    const closeSearchbar = () => {
        searchbarOpen.value = false
    }

    return {searchbarOpen, closeSearchbar}

}