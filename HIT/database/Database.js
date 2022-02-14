import AsyncStorage from '@react-native-async-storage/async-storage';

export default function createDatabase() {
    return new Database();
}

class Database {
    constructor() {

    }
}

// export async function dbsetList(key, value) {
//     try {
//         const jsonValue = JSON.stringify(value);
//         // console.log(jsonValue);
//         await AsyncStorage.setItem(key, jsonValue)
//     } catch (e) {
//         // saving error
//     }
// }

// export async function dbgetList(key) {
//     try {
//         const jsonValue = await AsyncStorage.getItem(key)
//         return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch (e) {

//     }
// }


export async function dbset(key, value) {
    try {
        const jsonValue = JSON.stringify(value);
        // console.log(jsonValue);
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export async function dbget(key) {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {

    }
}

export async function dbdel(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
    }

    console.log('Done.')
}

export async function getAllKeys() {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
    } catch (e) {
        // read key error
    }

    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
}
export async function dbclearAll(){
    try {
        await AsyncStorage.clear();
    } catch (error) {
        
    }
}