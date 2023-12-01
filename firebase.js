// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, getDoc, getDocs, setDoc, collection, doc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnceffVFPblyxLawJNhfWfCOB7heGMH6Q",
  authDomain: "tid-axel.firebaseapp.com",
  projectId: "tid-axel",
  storageBucket: "tid-axel.appspot.com",
  messagingSenderId: "272603934681",
  appId: "1:272603934681:web:0da1add16421ed7a8633c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

function subscribe_players(collection_name, game_name, update) {
    const unsub = onSnapshot(collection(db, collection_name, game_name, "players"), (docs) => {
        let players = [];
        docs.forEach((doc)=>{
            players.push(doc.data());
            console.log("Current data: ", doc.data());
        });
        update(players);
    });
}

function subscribe(collection, game_name, update) {
    const unsub = onSnapshot(doc(db, collection, game_name), (doc) => {
        console.log("Current data: ", doc.data());
        update(doc.data());
    });
}

function next_card(collection_name, game_name, new_index) {
    const docRef = doc(db,collection_name,game_name);
    await setDoc(docRef, {current_card: new_index});
}

async function start_game(collection_name, game_name, name) {
    const docRef = doc(db,collection_name,game_name);
    const game = await getDoc(docRef);
    if (!game) {
        console.log("no game with that name, creating it...");
        const querySnapshot = await getDocs(collection(db, "cards"));
        let cards = [];
        querySnapshot.forEach((doc) => {

            cards.push({url: doc.data().url, text: doc.data().text, year:doc.data().year});
            console.log(cards);

        });

        function getRandomCards(cards) {
          const shuffledCards = cards.sort(() => 0.5 - Math.random()); // Shuffle the array
          return shuffledCards.slice(0, 5); // Get the first 5 elements of the shuffled array
        }

        const randomCards = getRandomCards(cards);
        const obj = {
            name: game_name,
            current_card: 0,
            cards: randomCards,
        }; 
        console.log("setting doc", obj); 
        return await setDoc(doc(db, "games", game_name), obj);
    }
    
    return update_player(collection_name, game_name, name, []);
}

async function update_player(collection, game_name, name, cards) {
    return await setDoc(doc(db, collection, game_name, "players", name), {
        name: name,
        cards: cards,
    });
}

export { subscribe_players, db, subscribe, start_game, update_player };
