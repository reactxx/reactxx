import { Font } from 'expo'

export default async function loadFonts() {
  await Font.loadAsync({
    //'Roboto_Light': require('assets/fonts/Roboto-Light.ttf'),
    //'Roboto': require('assets/fonts/Roboto-Regular.ttf'),
    //'Roboto_Medium': require('assets/fonts/Roboto-Medium.ttf') 
    'Roboto_Light': require('./fonts/Roboto-Light.ttf'),
    'Roboto': require('./fonts/Roboto-Regular.ttf'),
    'Roboto_Medium': require('./fonts/Roboto-Medium.ttf') 
  })
}