import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs } from '../../store/dog';
import { loadUsersWalks } from '../../store/walk';
import './yourWalks.css'

const YourWalks = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const walks = useSelector(state => Object.values(state.walks));

    const [isLoaded, setIsLoaded] = useState(false);
    const [showPast, setShowPast] = useState(false);

    useEffect(() => {
        dispatch(loadUsersWalks(user?.id)).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="yourWalksContainer">
          <h1>Walks</h1>
          <div className="navHeaderContainer">
            <div className="navHeader">
                <div className="profileNav">
                    <h3 id={!showPast? 'keepUnderline' : null} onClick={() => setShowPast(false)}>Upcoming</h3>
                    <h3 id={showPast? 'keepUnderline' : null} onClick={() => setShowPast(true)}>Past</h3>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default YourWalks;
