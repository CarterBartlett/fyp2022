import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import axios from 'axios';
import _ from 'lodash';

import TodoItem from '../components/TodoItem';

export default function TodosScreen() {
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
        <SafeAreaView>
            <ScrollView>
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
                        due={due} />
                })}
            </ScrollView>
        </SafeAreaView>
    )
}