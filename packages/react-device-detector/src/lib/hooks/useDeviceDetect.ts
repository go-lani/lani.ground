import { useContext } from 'react';
import { DeviceContext } from '../context/DetectorContext';

const useDeviceDetect = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDeviceDetect must be used within a DetectorProvider');
  }
  return context;
};

export default useDeviceDetect;
