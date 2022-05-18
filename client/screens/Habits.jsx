import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios';

import HabitItem from '../components/HabitItem'

export default function HabitsScreen() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async ()=>{
    try {
      const habits = await axios.get('/habits');
      setHabits(habits.data);
      setLoading(false);
    } catch(err) {
      console.error(err);
    }
  }, []);

  const handleCounterChange = (id, e) => {
    console.log({id, e})
    const requestBody = {
      habitCount: {
        set: e.set,
        transform: e.transform
      }
    }
    axios.patch(`/habits/${id}`, requestBody)
  }

  return (
    <ScrollView>
      {habits && habits.map((habit,i)=><HabitItem key={i} name={habit.title} content={habit.description} count={habit.habitCount} onChange={(e)=>handleCounterChange(habit._id, e)}/>)}
    </ScrollView>
  )
}
