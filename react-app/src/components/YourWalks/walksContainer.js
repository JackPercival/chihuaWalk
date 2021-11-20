import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DogWalkCard from './dogWalkCard';
import DogSlide from '../DogSlide/dogSlide';

const WalksContainer = ({walks}) => {

    const [showPast, setShowPast] = useState(false);
    const [pastWalks, setPastWalks] = useState([])
    const [upcomingWalks, setUpcomingWalks] = useState([])


    // Sort walks into past and upcoming by date
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

      theUpcomingDogWalks.sort(function(a,b) {
        return new Date(a.date) - new Date(b.date)
      })

      thePastDogWalks.sort(function(a,b) {
        return new Date(a.date) - new Date(b.date)
      })

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
                {upcomingWalks.length === 0? (
                  <>
                    <p className="noWalksText">When you’re ready to start planning your next walk, click</p><Link to="/browse" className="noDogsBrowse">here</Link><p className="noWalksText"> to browse.</p>
                    <img className="noWalks" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637424585/Capstone/walkDrawing_lcursw.png"/>
                  </>
                ):(
                  <div className="yesWalksContainer">
                    {upcomingWalks.map((walk, index) =>
                      <DogWalkCard walk={walk} key={`Your_dog_walk_${walk.dog.id}_${index}`} />
                    )}
                  </div>
                )}
              </>
            )}
            {showPast && (
              <>
                {pastWalks.length === 0? (
                  <>
                    <p className="noWalksText">You don’t have any past walks yet—but when you do, you’ll find them here.</p>
                    <img className="noWalks" src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1637424585/Capstone/walkDrawing_lcursw.png"/>
                  </>
                ) :(
                  <div className="yesWalksContainer">
                    {pastWalks.map((walk, index) =>
                      <DogWalkCard walk={walk} key={`Your_past_dog_walk_${walk.dog.id}_${index}`} />
                    )}
                  </div>
                )}
              </>
            )}
        </div>
    </>
  );
}

export default WalksContainer;
