import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useSearch } from '../context/SearchContext';
import { loadSearches } from '../../store/search';

import './searchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {showSearch, setShowSearch, setShowSearchClass,
        searchCity, setSearchCity,
        searchState, setSearchState,
        searchBreed, setSearchBreed,
        searchMinWeight, setSearchMinWeight,
        searchMaxWeight, setSearchMaxWeight} = useSearch();

    const [maxMin, setMaxMin] = useState(1)


    const showRealSearch = () => {
        setShowSearchClass('expanded')
        setTimeout(function() {
            setShowSearch(true)
          }, 100);
    }

    //Calculate min and max allowed values based on user inputs
    useEffect(() => {
        if (searchMinWeight) {
            setMaxMin(searchMinWeight)
        } else {
            setMaxMin(1)
        }
    }, [searchMinWeight])


    const handleSearch = async (e) => {
        e.preventDefault()
        await dispatch(loadSearches(searchCity, searchState, searchBreed, searchMinWeight, searchMaxWeight))
        history.push('/search')
    }


    return (
        <div className="searchBarContainer">
            {!showSearch && (
                <div className="fakeSearchBar" id="searchBar" onClick={showRealSearch}>
                    <div className="searchCategories">
                        <div>Address</div>
                        <div>Breed</div>
                        <div>Weight</div>
                    </div>
                    <div className="searchMagGlassIcon">
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            )}
            {showSearch && (
                <div className="realSearchBar">
                    <div className="searchDogsHeader">Search Dogs</div>
                    <form className="realSearchFormContainer" onSubmit={handleSearch}>
                        <div className="searchFormField">
                            <label>City</label>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="What city?"
                                maxLength="50"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                            />
                        </div>
                        <div className="searchFormField">
                            <label>State</label>
                            <select value={searchState} onChange={(e) => setSearchState(e.target.value)}>
                                <option value="" disabled defaultValue>What state?</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div className="searchFormField">
                            <label>Breed</label>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Add a breed"
                                maxLength="40"
                                value={searchBreed}
                                onChange={(e) => setSearchBreed(e.target.value)}
                            />
                        </div>
                        <div className="searchFormField">
                            <label>Min Weight</label>
                            <input
                                type="number"
                                autoComplete="off"
                                placeholder="Min weight"
                                min="1"
                                max="399"
                                value={searchMinWeight}
                                onChange={(e) => setSearchMinWeight(Number(e.target.value).toString())}
                            />
                        </div>
                        <div className="searchFormField lastSearchCat">
                            <label>Max Weight</label>
                            <input
                                type="number"
                                autoComplete="off"
                                placeholder="Max weight?"
                                min={maxMin}
                                max="400"
                                value={searchMaxWeight}
                                onChange={(e) => setSearchMaxWeight(Number(e.target.value).toString())}
                            />
                        </div>
                        <button type="submit" className="realSearchButtonContainer">
                            <div>
                                <i className="fas fa-search"></i>
                            </div>
                            <div className="searchWord">Search</div>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
