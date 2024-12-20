const storageKey = 'dailyItems'

export const LocalStorageService = {
  getItem(key: string) {
    try {
      const existingItems = JSON.parse(localStorage.getItem(storageKey)!)
      return existingItems[key] || []
    } catch (e) {
      console.error('Error getting items from local storage', e)
      return null
    }
  },
  setItem(key: string, value: unknown) {
    let existingItems = JSON.parse(localStorage.getItem(storageKey)!)
    if (!existingItems) {
      existingItems = {}
    }
    existingItems[key] = value
    localStorage.setItem(storageKey, JSON.stringify(existingItems))
  },
  removeItem(key: string) {
    try {
      const existingItems = JSON.parse(localStorage.getItem(storageKey)!)
      delete existingItems[key]
      localStorage.setItem(storageKey, JSON.stringify(existingItems))
    } catch (e) {
      console.error('Error deleting items from local storage', e)
      return null
    }
  },
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)!)
    } catch (e) {
      console.error('Could not fetch items', e)
    }
  },
}
