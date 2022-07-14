import AsyncStorage from "@react-native-async-storage/async-storage";


export const userValues = {
    user_pollen: 0,
    user_b0_count: 0,
    user_b1_count: 0,
    user_b2_count: 0,
    user_b3_count: 0, 
    user_b4_count: 0,
    current_butterfly: 0,
    user_current_mood: 0,
    user_current_mood_updated: "",
    mentorName: ""
}

export const userInfo = {
    userId: 0,
    user: "",
    mentorName: "",
    password: "",
    autoLogin: false,
    isLoggedIn: false,
    moodType: 0,
    stressType: 0,
    assigned_mentor: 0,
}

export const messages = {
    messages: []
}


const setItem = async ( key , item ) => {
    try{
        const parsedItem = JSON.stringify( item );
        await AsyncStorage.setItem( key , parsedItem );
    }
    catch( error ){
        console.error( error );
    }
}

const getItem = async ( key ) => {
    try{
        await AsyncStorage.getItem( key )
        .then( value => { 
                return value;
        })
    }
    catch ( error ){
        console.error( error );
    }
}

const removeItem = async ( key ) => {
    try {
        await AsyncStorage.removeItem( key );
    }
    catch ( error ) {
        console.error( error );
    }
}

const multiRemove = async ( keys ) => {
    try {
        await AsyncStorage.multiRemove( keys );
    }
    catch ( error ) {
        console.log( error );
    }
}

export { removeItem , getItem , setItem , multiRemove }

