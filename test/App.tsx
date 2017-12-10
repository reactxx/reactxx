import Expo from 'expo';
import React from 'react'
import { Text } from 'react-native'

const text = async () => 'ASYNC'

const app = () => {
  text().then(res => alert(res))
  return <Text style={{ fontSize: 32, fontWeight: '500', color: 'red' }}>HALLO WORLD </Text>
}

Expo.registerRootComponent(app)


