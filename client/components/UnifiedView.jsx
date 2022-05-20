import React from 'react';
import { View, ScrollView } from 'react-native';

import UseDeviceSpecs from '../hooks/Device';

export default function UnifiedView(props) {
    const deviceSpecs = UseDeviceSpecs();
    const { deviceType } = deviceSpecs;

    if (deviceType=='desktop') {
        return <View style={props.style}>{props.children}</View>
    }
    return <ScrollView style={props.style} contentStyleContainer={props.style}>{props.children}</ScrollView>
}