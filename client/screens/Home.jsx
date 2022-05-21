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
            const req = await axios.get('/summary');
            setSummaryData(req.data);
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

    console.log(summaryData);

    return (
        <UnifiedView style={styles.container}>
            <Text style={styles.title}>Welcome {user?.firstName}!</Text>
            <Text style={styles.subtitle}>Here's a quick summary of things to keep an eye on...</Text>
            <View style={[{},
                    (deviceType=='smartphone') ? {
                        flexDirection: 'column'
                    } : {
                        flexDirection: 'row-reverse'
                    }
                ]}>
                <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10}}>
                    <CircularProgressBase
                        value={summaryData && summaryData.tasks ? (summaryData?.tasks?.complete?.total / summaryData?.tasks?.total)*100 : 0}
                        radius={150}
                        activeStrokeColor={circleColors.task.active}
                        inActiveStrokeColor={circleColors.task.inactive}
                        activeStrokeWidth={25}
                        inActiveStrokeWidth={25}
                        inActiveStrokeOpacity={0.2}
                        >
                        <CircularProgressBase
                            value={summaryData && summaryData.todos ? (summaryData?.todos?.complete?.total / summaryData?.todos?.total)*100 : 0}
                            radius={125}
                            activeStrokeColor={circleColors.todo.active}
                            inActiveStrokeColor={circleColors.todo.inactive}
                            activeStrokeWidth={25}
                            inActiveStrokeWidth={25}
                            inActiveStrokeOpacity={0.2}
                        >
                            <Text style={styles.circleProgressText}>{summaryData.tasks ? `${summaryData.tasks.complete.total}/${summaryData.tasks.total}` : 'N/A'} tasks</Text>
                            <Text style={styles.circleProgressText}>{summaryData.todos ? `${summaryData.todos.complete.total}/${summaryData.todos.total}` : 'N/A'} todos</Text>
                        </CircularProgressBase>
                    </CircularProgressBase>
                </View>

                <View style={{flexGrow:1}}>
                    <View>
                        <Text style={styles.subtitle}>Todos</Text>
                        <Text>You have {summaryData?.todos?.incomplete?.dueNextWeek} todos due in within the next week!</Text>
                        <Text>You have completed {summaryData?.todos?.complete?.completedInLastWeek} todos in the last week!</Text>
                    </View>

                    <View>
                        <Text style={styles.subtitle}>Tasks</Text>
                        <Text>You have X tasks due in within the next week!</Text>
                        <Text>You have completed X tasks this week!</Text>
                    </View>

                    <View>
                        <Text style={styles.subtitle}>Habits</Text>
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