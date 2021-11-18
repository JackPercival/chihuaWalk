import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/map';

import Maps from './Maps'

const MapContainer = ({ GMapSetting, dogs }) => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  }

  return (
    <Maps apiKey={key} GMapSetting={GMapSetting} dogs={dogs} />
  );
};

export default MapContainer;
