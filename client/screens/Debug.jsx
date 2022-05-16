import React, {useContext} from 'react';
import { Text, ScrollView } from 'react-native';
import UseDeviceSpecs from '../hooks/Device';
import { DataTable } from 'react-native-paper';
import { UserContext } from '../context/User';

export default function DebugScreen() {
    const deviceSpecs = UseDeviceSpecs();

    const {user, setUser} = useContext(UserContext);

    return (
        <ScrollView>
            <DataTable>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.window.width</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs?.window?.width}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.window.height</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs?.window?.height}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.deviceType</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs?.deviceType}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.os</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs?.os}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.online</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs?.netInfo?.isConnected ? 'online' : 'offline'}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>deviceSpecs.netInfo.type</DataTable.Cell>
                    <DataTable.Cell>{deviceSpecs?.netInfo?.type}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>userContext.user</DataTable.Cell>
                    <DataTable.Cell>{user?.firstName}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </ScrollView>
    )
}