import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';
import _ from 'lodash';

import TodoItem from '../components/TodoItem';
import UnifiedView from '../components/UnifiedView';

import UseDeviceSpecs from '../hooks/Device';

export default function TodosScreen() {
    const deviceSpecs = UseDeviceSpecs();
    const { deviceType } = deviceSpecs;

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [timestamp, setTimestamp] = useState(new Date()); // Used for forcing a re-render
    const forceRerender = () => setTimestamp(new Date());

    useEffect(async ()=>{
        try {
            const todos = await axios.get('/todos');
            setTodos(todos.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleCheckboxToggle = (id, val) => {
        axios.patch(`/todos/${id}`, {completed: val});
        const newState = todos;
        const idx = _.findIndex(todos, {_id:id});
        newState[idx].completed = val;
        setTodos(newState);
        forceRerender();
    }

    if (loading) return <UnifiedView><Text>Loading...</Text></UnifiedView>

    return (
        <UnifiedView style={styles.outercontainer}>
            {todos.length==0 && <Text style={{margin:12}}>No habits found, use the "add" button in the bottom right to begin!</Text>}

            {todos.length>0 && <>
            <Text style={styles.title}>Priority 1</Text>
            <View style={styles.container}>
                {_.filter(todos, v=>v.priority==1 && !v.completed).length==0 && <Text style={styles.notaskstext}>No Tasks!</Text>}
                {todos && _(todos)
                .filter(v=>v.priority==1 && !v.completed)
                .sortBy(v=>v.due)
                .value()
                .map((props)=>{
                    const {title, description, completed, priority, _id, due} = props;
                    return <TodoItem
                        key={_id}
                        name={title}
                        content={description}
                        checked={completed}
                        priority={priority}
                        onCheckboxToggle={(val)=>handleCheckboxToggle(_id, val)}
                        due={due} 
                        style={[styles.TodoItem, {
                            flexBasis: deviceType=='desktop' ? '33.333%' :
                                    deviceType=='tablet' ? '50%' : '100%'
                        }]} />
                })}
            </View>
            
            <Text style={styles.title}>Priority 2</Text>
            <View style={styles.container}>
                {_.filter(todos, v=>v.priority==2 && !v.completed).length==0 && <Text style={styles.notaskstext}>No Tasks!</Text>}
                {todos && _(todos)
                .filter(v=>v.priority==2 && !v.completed)
                .sortBy(v=>v.due)
                .value()
                .map((props)=>{
                    const {title, description, completed, priority, _id, due} = props;
                    return <TodoItem
                        key={_id}
                        name={title}
                        content={description}
                        checked={completed}
                        priority={priority}
                        onCheckboxToggle={(val)=>handleCheckboxToggle(_id, val)}
                        due={due} 
                        style={[styles.TodoItem, {
                            flexBasis: deviceType=='desktop' ? '33.333%' :
                                    deviceType=='tablet' ? '50%' : '100%'
                        }]} />
                })}
            </View>
            
            <Text style={styles.title}>Priority 3</Text>
            <View style={styles.container}>
                {_.filter(todos, v=>v.priority==3 && !v.completed).length==0 && <Text style={styles.notaskstext}>No Tasks!</Text>}
                {todos && _(todos)
                .filter(v=>v.priority==3 && !v.completed)
                .sortBy(v=>v.due)
                .value()
                .map((props)=>{
                    const {title, description, completed, priority, _id, due} = props;
                    return <TodoItem
                        key={_id}
                        name={title}
                        content={description}
                        checked={completed}
                        priority={priority}
                        onCheckboxToggle={(val)=>handleCheckboxToggle(_id, val)}
                        due={due} 
                        style={[styles.TodoItem, {
                            flexBasis: deviceType=='desktop' ? '33.333%' :
                                    deviceType=='tablet' ? '50%' : '100%'
                        }]} />
                })}
            </View>

            <Text style={styles.title}>No Priority</Text>
            <View style={styles.container}>
                {_.filter(todos, v=>(v.priority==0 || !v.priority) && !v.completed).length==0 && <Text style={styles.notaskstext}>No Tasks!</Text>}
                {todos && _(todos)
                .filter(v=>(v.priority==0 || !v.priority) && !v.completed)
                .sortBy(v=>v.due)
                .value()
                .map((props)=>{
                    const {title, description, completed, priority, _id, due} = props;
                    return <TodoItem
                        key={_id}
                        name={title}
                        content={description}
                        checked={completed}
                        priority={priority}
                        onCheckboxToggle={(val)=>handleCheckboxToggle(_id, val)}
                        due={due} 
                        style={[styles.TodoItem, {
                            flexBasis: deviceType=='desktop' ? '33.333%' :
                                    deviceType=='tablet' ? '50%' : '100%'
                        }]} />
                })}
            </View>

            
            <Text style={styles.title}>Completed</Text>
            <View style={styles.container}>
                {_.filter(todos, v=>v.completed).length==0 && <Text style={styles.notaskstext}>No Tasks!</Text>}
                {todos && _(todos)
                .filter(v=>v.completed)
                .sortBy(v=>v.due)
                .value()
                .map((props)=>{
                    const {title, description, completed, priority, _id, due} = props;
                    return <TodoItem
                        key={_id}
                        name={title}
                        content={description}
                        checked={completed}
                        priority={priority}
                        onCheckboxToggle={(val)=>handleCheckboxToggle(_id, val)}
                        due={due} 
                        style={[styles.TodoItem, {
                            flexBasis: deviceType=='desktop' ? '33.333%' :
                                       deviceType=='tablet' ? '50%' : '100%'
                        }]} />
                })}
            </View>
            </>}
        </UnifiedView>
    )
}

const styles = StyleSheet.create({
    outercontainer: {
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      marginBottom: 12
    },
    TodoItem: {
      flexBasis: '100%',
      //flexGrow: 0,
      //flexShrink: 0
    },
    title: {
        fontSize: 36,
    },
    notaskstext: {
        fontSize: 18,
        marginLeft: 10
    }
  })