import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import TaskItem from '../components/TaskItem'

export default function TasksScreen() {
  return (
    <ScrollView>
      <TaskItem name="Drink Water" content="Drink water, at least 7 glasses a day!" />
    </ScrollView>
  )
}
