//constants
const LOAD = 'search/LOAD_SEARCH'


const loadSearchResults = (dogs) => ({
    type: LOAD,
    dogs
})

export const loadSearchReviews = (searchCity, searchState, searchBreed, searchMinWeight, searchMaxWeight) => async (dispatch) => {
    const response = await fetch(`/api/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchCity,
            searchState,
            searchBreed,
            searchMinWeight,
            searchMaxWeight
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(loadSearchResults(data))
        return ["Found", data];
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return ["Error", data.errors];
        }
      } else {
        return["Error"]
      }
}

let initialState = {search: null};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allResults = {};

            for (let dog of action.dogs.dogs) {
                allResults[dog.id] = dog
            }
            return {...allResults }
        default:
            return state;
    }
}

export default searchReducer;
