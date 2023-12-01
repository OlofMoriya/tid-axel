// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, getDocs, setDoc, collection, doc } from "firebase/firestore";

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

function subscribe(collection, game_name, update) {
    const unsub = onSnapshot(doc(db, collection, game_name), (doc) => {
        console.log("Current data: ", doc.data());
        update(doc);
    });
}

async function start_game(collection_name, game_name) {
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

async function update_player(collection, game_name, name, cards) {
    return await setDoc(doc(db, collection, game_name, "players", name), {
        name: name,
        cards: cards,
    });
}

export { db, subscribe, start_game, update_player };
