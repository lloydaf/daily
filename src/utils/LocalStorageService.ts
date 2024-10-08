const storageKey = 'dailyItems'

export const LocalStorageService = {
    getItem(key: any) {
        try {
            const existingItems = JSON.parse(localStorage.getItem(storageKey)!)
            return existingItems[key] || []
        } catch (e) {
            console.warn('Error getting items from local storage', e)
            return null
        }
    },
    setItem(key: any, value: any) {
        let existingItems = JSON.parse(localStorage.getItem(storageKey)!)
        if (!existingItems) {
            existingItems = {}
        }
        existingItems[key] = value;
        localStorage.setItem(storageKey, JSON.stringify(existingItems))
    },
    removeItem(key: any) {
        try {
            const existingItems = JSON.parse(localStorage.getItem(storageKey)!)
            delete existingItems[key]
            localStorage.setItem(storageKey, JSON.stringify(existingItems))
        } catch (e) {
            console.warn('Error deleting items from local storage', e)
            return null
        }
    },
}