import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchClass, setShowSearchClass] = useState('noExpand');

  return (
    <SearchContext.Provider
      value={{
        showSearch,
        setShowSearch,
        showSearchClass,
        setShowSearchClass
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
