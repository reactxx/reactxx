import Expo from 'expo'
import React from 'react'
import ReactN from 'react-native'
import { Text } from 'react-native'

const text = async () => 'ASYNC'

const app = () => {
  text().then(res => alert(res))
  return <Text style={{ fontSize: 32, fontWeight: '500', color: 'red' }}>HALLO WORLD x</Text>
}

Expo.registerRootComponent(app)


