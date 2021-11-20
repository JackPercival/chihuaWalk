import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DogSlide from '../DogSlide/dogSlide';

const WalksContainer = ({walks}) => {
    const dispatch = useDispatch();


    const [showPast, setShowPast] = useState(false);
    const [pastWalks, setPastWalks] = useState([])
    const [upcomingWalks, setUpcomingWalks] = useState([])


    // Sort walks into past and upcoming
    useEffect(() => {
      if (walks[0] === null) {
        return;
      }
      let thePastDogWalks = [];
      let theUpcomingDogWalks = [];
      let today = new Date()
      for (let walk of walks) {
        let date = new Date(walk.date.slice(5,16))
        if (date < today) {
          thePastDogWalks.push(walk)
        } else {
          theUpcomingDogWalks.push(walk)
        }
      }

      setPastWalks(thePastDogWalks)
      setUpcomingWalks(theUpcomingDogWalks)
    }, [walks])

  return (
    <>
        <div className="navHeaderContainer">
            <div className="navHeader">
                <div className="profileNav">
                    <h3 id={!showPast? 'keepUnderline' : null} onClick={() => setShowPast(false)}>Upcoming</h3>
                    <h3 id={showPast? 'keepUnderline' : null} onClick={() => setShowPast(true)}>Past</h3>
                </div>
            </div>
          </div>
          <div className="dogWalksForUserContainer">
            {!showPast && (
              <>
                {upcomingWalks.map((walk, index) =>
                  <DogSlide dog={walk.dog} key={`Your_dog_walk_${walk.dog.id}_${index}`} />
                )}
              </>
            )}
            {showPast && (
              <>
                {pastWalks.map((walk, index) =>
                  <DogSlide dog={walk.dog} key={`Your_past_dog_walk_${walk.dog.id}_${index}`} />
                )}
              </>
            )}
        </div>
    </>
  );
}

export default WalksContainer;
