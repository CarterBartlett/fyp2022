import { useLayoutEffect, useState } from 'react';
import { Dimensions, Platform, useWindowDimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function useDeviceSpecs() {
    const [specs, setDeviceSpecs] = useState(getSpecs());

    function getSpecs() {
        return {
            window: Dimensions.get('window'),
            deviceType: getDeviceType(Dimensions.get('window').width),
            os: Platform.OS,
            netInfo: {}
        }
    }

    function getDeviceType(width) {
        if (width<768) return "smartphone";
        if (width<1024) return "tablet";
        return "desktop";
    }

    useLayoutEffect(()=>{
        // Window resize listener
        function handleWindowResize(e) {
            const { window } = e;
            setDeviceSpecs({...specs, window});
        }
        const dimensionsListener = Dimensions.addEventListener('change', handleWindowResize);

        // Connectivity listener
        function handleConnectivityChange(state) {
            setDeviceSpecs({...specs, netInfo:{
                isConnected: state.isConnected,
                isInternetReachable: state.isInternetReachable,
                isWifiEnabled: state.isWifiEnabled,
                type: state.type
            }});
        }
        const netInfoUnsubscribe = NetInfo.addEventListener(handleConnectivityChange);

        // Cleanup - Remove event listener
        return () => {
            try {
                if (typeof netInfoUnsubscribe !== 'undefined') netInfoUnsubscribe();
                if (typeof dimensionListener !== 'undefined') dimensionsListener.remove();
            } catch(err) {
                console.error(err);
            }
        }
    }, []);

    return specs;
}