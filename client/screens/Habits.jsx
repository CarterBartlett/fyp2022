import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios';
import UnifiedView from '../components/UnifiedView';

import HabitItem from '../components/HabitItem'

export default function HabitsScreen() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function fetchData() {
      try {
        setLoading(true);
        const habits = await axios.get('/habits');
        setHabits(habits.data);
        setLoading(false);
      } catch(err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const handleCounterChange = (id, e) => {
    const requestBody = {
      habitCount: {
        set: e.set,
        transform: e.transform
      }
    }
    axios.patch(`/habits/${id}`, requestBody)
  }

  if (loading) return <UnifiedView><Text>Loading...</Text></UnifiedView>

  return (
    <ScrollView style={styles.container}>
      {habits.length==0 && <Text style={{margin:12}}>No habits found, use the "add" button in the bottom right to begin!</Text>}
      {habits && habits.map((habit,i)=>
        <HabitItem
          key={i}
          name={habit.title}
          content={habit.description}
          count={habit.habitCount}
          onChange={(e)=>handleCounterChange(habit._id, e)}
          style={styles.HabitItem}
          />)
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
});