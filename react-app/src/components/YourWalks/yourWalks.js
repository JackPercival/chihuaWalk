import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs } from '../../store/dog';
import { loadUsersWalks } from '../../store/walk';

import WalksContainer from './walksContainer';
import './yourWalks.css'

const YourWalks = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const walks = useSelector(state => Object.values(state.walks));

    const [isLoaded, setIsLoaded] = useState(false);
    const [showPast, setShowPast] = useState(false);
    const [pastWalks, setPastWalks] = useState([])
    const [upcomingWalks, setUpcomingWalks] = useState([])

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

  return (
    <>
      {isLoaded && (
        <div className="yourWalksContainer">
          <h1>Walks</h1>
          <WalksContainer walks={walks}/>
        </div>
      )}
    </>
  );
}

export default YourWalks;
