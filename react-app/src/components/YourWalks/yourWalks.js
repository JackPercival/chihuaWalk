import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllDogs } from '../../store/dog';
import { loadUsersWalks } from '../../store/walk';
import './yourWalks.css'

const YourWalks = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const walks = useSelector(state => state.walks);

    const [isLoaded, setIsLoaded] = useState(false);
    // const [date, setDate] = useState(new Date())

    useEffect(() => {
        dispatch(loadUsersWalks(user?.id)).then(() => setIsLoaded(true));
        return () => {
            setIsLoaded()
        }
    }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="yourWalksContainer">Your Walks Page</div>
      )}
    </>
  );
}

export default YourWalks;
