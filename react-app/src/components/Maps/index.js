import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/map';

import Maps from './Maps'

const MapContainer = ({ zoom, dogs }) => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  const [latAvg, setLatAvg] = useState(0)
  const [longAvg, setLongAvg] = useState(0)

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  useEffect(() => {
    if (dogs && dogs[0] !== undefined) {
        let lat = 0;
        let long = 0;
      dogs.forEach(dog => {
          long += dog.longitude;
          lat += dog.latitude
    })

      const length = dogs?.length
      setLatAvg(parseFloat(lat / length))
      setLongAvg(parseFloat(long / length))

    } else {
      setLatAvg(38.747)
      setLongAvg(-98.138)
    }

  }, [dogs])

  if (!key) {
    return null;
  }


  return (
    <Maps apiKey={key} zoom={zoom} dogs={dogs} latAvg={latAvg} longAvg={longAvg}/>
  );
};

export default MapContainer;
