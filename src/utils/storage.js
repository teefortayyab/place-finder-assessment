import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@search_history';

export const storeHistory = async (place) => {
  try {
    const history = await getHistory();
    history.unshift(place);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
  } catch (e) {
    console.error('Failed to store history', e);
  }
};

export const getHistory = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load history', e);
    return [];
  }
};
