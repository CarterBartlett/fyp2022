import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { UserContext } from '../context/User';
import UnifiedView from '../components/UnifiedView';
import  { CircularProgressBase } from 'react-native-circular-progress-indicator';
import useDeviceSpecs from '../hooks/Device';
import axios from 'axios';

export default function HomeScreen() {
    const {user, setUser} = useContext(UserContext);
    const deviceSpecs = useDeviceSpecs();
    const { deviceType } = deviceSpecs;

    const [summaryData, setSummaryData] = useState({});

    useEffect(async ()=>{
        try {
            const req = axios.get('/summary');
        } catch(err) {
            console.error(err);
        }
    },[]);

    const circleColors = {
        task: {
            active: '#e84118',
            inactive:'#e84118'
        },
        todo: {
            active: '#badc58',
            inactive: '#badc58'
        }
    }

    return (
        <UnifiedView style={styles.container}>
            <Text style={styles.title}>Welcome {user?.firstName}!</Text>
            <Text style={styles.subtitle}>Here's a quick summary of things to keep an eye on...</Text>
            <View style={[{},
                    deviceType=='smartphone' ? {

                    } : {
                        flexDirection: 'row-reverse'
                    }
                ]}>
                <View>
                    <CircularProgressBase
                        value={80}
                        radius={150}
                        activeStrokeColor={circleColors.task.active}
                        inActiveStrokeColor={circleColors.task.inactive}
                        activeStrokeWidth={25}
                        inActiveStrokeWidth={25}
                        inActiveStrokeOpacity={0.2}
                        >
                        <CircularProgressBase
                            value={87}
                            radius={125}
                            activeStrokeColor={circleColors.todo.active}
                            inActiveStrokeColor={circleColors.todo.inactive}
                            activeStrokeWidth={25}
                            inActiveStrokeWidth={25}
                            inActiveStrokeOpacity={0.2}
                        >
                            <Text style={styles.circleProgressText}>11/12 tasks</Text>
                            <Text style={styles.circleProgressText}>11/12 todos</Text>
                        </CircularProgressBase>
                    </CircularProgressBase>
                </View>

                <View style={{flexGrow:1}}>
                    <View>
                        <Text>Todos</Text>
                        <Text>You have X tasks due in within the next week!</Text>
                        <Text>You have completed X tasks!</Text>
                    </View>

                    <View>
                        <Text>Habits</Text>
                    </View>
                </View>
            </View>
        </UnifiedView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12,
        maxWidth: 2000,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%'
    },
    title: {
        fontSize: 32,
        marginBottom: 12
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 6
    },
    circleProgressText: {
        fontSize: 24,

    }
})