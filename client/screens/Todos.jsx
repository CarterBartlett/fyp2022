import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
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
        axios.patch(`/todos/${id}`, {completed: val})
    }


    return (
        <UnifiedView style={styles.container}>
            {todos && _(todos)
            .sortBy(v=>v.priority&&v.priority>0?v.priority:999)
            .value()
            .map((props, i)=>{
                const {title, description, completed, priority, _id, due} = props;
                return <TodoItem
                    key={i}
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
        </UnifiedView>
    )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row'
    },
    TodoItem: {
      flexBasis: '100%',
      flexGrow: 0,
      flexShrink: 0
    }
  })