import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLocalStore = () => {
  
  const setUser = async  (user:any) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.log('setUser error', error)
    }
  }
  const getUser = async  () => {
    try {
      const response = await AsyncStorage.getItem('user')
      return response ? JSON.parse(response) : undefined
    } catch (error) {
      console.log('getUser error', error)
    }
  }
  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem('user')
    } catch (error) {
      console.log('removeUser error', error)
    }
  } 
  return { setUser, getUser, removeUser }
}