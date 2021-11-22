import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchClass, setShowSearchClass] = useState('noExpand');
  const [searchCity, setSearchCity] = useState('')
  const [searchState, setSearchState] = useState('')
  const [searchBreed, setSearchBreed] = useState('')
  const [searchMinWeight, setSearchMinWeight] = useState('')
  const [searchMaxWeight, setSearchMaxWeight] = useState('')

  return (
    <SearchContext.Provider
      value={{
        showSearch, setShowSearch,
        showSearchClass, setShowSearchClass,
        searchCity, setSearchCity,
        searchState, setSearchState,
        searchBreed, setSearchBreed,
        searchMinWeight, setSearchMinWeight,
        searchMaxWeight, setSearchMaxWeight
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
