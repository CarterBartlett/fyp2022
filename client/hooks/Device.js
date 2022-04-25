import { setState, useLayoutEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

function getDeviceSpecs() {
    const { width, height } = Dimensions.get('window');

    return { 
        window: { width, height },
        deviceType: height < 768 ? "smartphone" : height < 1024 ? "tablet" : "desktop",
        os: Platform.OS
    }
}

export default function useDeviceSpecs() {
    const [specs, setDeviceSpecs] = useState(getDeviceSpecs());
    
    useLayoutEffect(()=>{
        function resizeHandler() {
            setDeviceSpecs(getDeviceSpecs());
        }

        if (Platform.OS==='web') {
            window.addEventListener('resize', resizeHandler)
            return () => window.removeEventListener('resize', resizeHandler)
        } 
    }, []);

    return specs;
}