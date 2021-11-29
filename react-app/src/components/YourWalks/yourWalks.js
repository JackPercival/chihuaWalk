import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearch } from '../context/SearchContext';
import { loadUsersWalks } from '../../store/walk';

import WalksContainer from './walksContainer';
import './yourWalks.css'

const YourWalks = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const walks = useSelector(state => Object.values(state.walks));
    const {setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight} = useSearch();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadUsersWalks(user?.id)).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded()
        }
    }, [dispatch, user]);

     //Hide scroll bar on this page
    useEffect(() => {
      document.body.style.overflowY = 'scroll';

      return () => {
          document.body.style.overflowY = 'auto';
      }
    })

    //Clean up search bar
    useEffect(() => {
      setShowSearch(false)
      setSearchCity('')
      setSearchState('')
      setSearchBreed('')
      setSearchMinWeight('')
      setSearchMaxWeight('')
  }, [setShowSearch, setSearchCity, setSearchState, setSearchBreed, setSearchMinWeight, setSearchMaxWeight])

  useEffect(() => {
    document.title = `Your Walks · ChihuaWalk`;
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="yourWalksContainer">
          <h1>Walks</h1>
          <WalksContainer walks={walks} user={user}/>
        </div>
      )}
    </>
  );
}

export default YourWalks;
