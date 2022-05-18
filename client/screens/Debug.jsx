import React, {useContext, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import UseDeviceSpecs from '../hooks/Device';
import { DataTable } from 'react-native-paper';
import { UserContext } from '../context/User';
import useDeviceSpecs from '../hooks/Device';

export default function DebugScreen() {
    const deviceSpecs = UseDeviceSpecs();

    const [loading, setLoading] = useState(true);
    const {user, setUser} = useContext(UserContext);
    
    useEffect(async ()=>{
        setLoading(false);
    },[])

    if (loading) return <View><Text>Loading...</Text></View>

    return (
        <View>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.window.width</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs.window?.width}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.window.height</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs.window?.height}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.deviceType</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs.deviceType}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.os</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs.os}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.online</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs.netInfo?.isConnected ? 'online' : 'offline'}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.netInfo.type</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs.netInfo?.type}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.orientation</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs.orientation}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>userContext.id</DataTable.Cell>
                    <DataTable.Cell>{user?.id}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </View>
    )
}