import React, {useContext, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import UseDeviceSpecs from '../hooks/Device';
import { DataTable } from 'react-native-paper';
import { UserContext } from '../context/User';

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
                    <DataTable.Cell>userContext._id</DataTable.Cell>
                    <DataTable.Cell>{user?._id}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>userContext.username</DataTable.Cell>
                    <DataTable.Cell>{user?.username}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>userContext.firstName</DataTable.Cell>
                    <DataTable.Cell>{user?.firstName}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>userContext.lastName</DataTable.Cell>
                    <DataTable.Cell>{user?.lastName}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </View>
    )
}