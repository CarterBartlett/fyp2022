import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import HabitItem from '../components/HabitItem'

export default function HabitsScreen() {
  return (
    <ScrollView>
      <HabitItem name="Drink Water" content="Drink water, at least 7 glasses a day!" />
    </ScrollView>
  )
}
