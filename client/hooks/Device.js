import { useLayoutEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

function getDeviceSpecs() {
    const { width, height } = Dimensions.get('window');

    return { 
        window: { width, height },
        deviceType: width < 768 ? "smartphone" : width < 1024 ? "tablet" : "desktop",
        os: Platform.OS
    }
}

export default function useDeviceSpecs() {
    const [specs, setDeviceSpecs] = useState(getDeviceSpecs());

    useLayoutEffect(()=>{
        function resizeHandler() {
            setDeviceSpecs({...specs, ...getDeviceSpecs()});
        }
        function handleConnectivityChange(state) {
            setDeviceSpecs({...specs, netInfo:{
                isConnected: state.isConnected,
                isInternetReachable: state.isInternetReachable,
                isWifiEnabled: state.isWifiEnabled,
                type: state.type
            }});
        }

        const netInfoUnsubscribe = NetInfo.addEventListener(handleConnectivityChange);
        if (Platform.OS==='web') window.addEventListener('resize', resizeHandler);

        // Cleanup
        return () => {
            netInfoUnsubscribe();
            if (Platform.OS==='web') window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    return specs;
}