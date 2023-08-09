// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/compat/app";
// // Required for side-effects
// import "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBLSX15gty8jTRPPe4zwGvQy3BxJxIU9gQ",
//   authDomain: "surf-sentinel-fc8a9.firebaseapp.com",
//   projectId: "surf-sentinel-fc8a9",
//   storageBucket: "surf-sentinel-fc8a9.appspot.com",
//   messagingSenderId: "7666181085",
//   appId: "1:7666181085:web:c56f28e996bd8fd3d5cc34",
//   measurementId: "G-3FHBWM8CPD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// try{
//   self.importScripts('firebase/app','firebase/firestore');
  
//   const firebaseConfig = {
//       apiKey: "AIzaSyBLSX15gty8jTRPPe4zwGvQy3BxJxIU9gQ",
//       authDomain: "surf-sentinel-fc8a9.firebaseapp.com",
//       projectId: "surf-sentinel-fc8a9",
//       storageBucket: "surf-sentinel-fc8a9.appspot.com",
//       messagingSenderId: "7666181085",
//       appId: "1:7666181085:web:c56f28e996bd8fd3d5cc34",
//       measurementId: "G-3FHBWM8CPD"
//     };

//     const app = initializeApp(firebaseConfig);
//     const analytics = getAnalytics(app);
//     const db = getFirestore(app);
    

//     firebase.initializeApp(firebaseConfig);
//     console.log(firebase);

        
//     //TABS

//     // get current active tab & update popup when it's loaded
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab = tabs[0];
//       const title = activeTab.title;
//       const url = activeTab.url;
//       updatePopupWithTabInfo(title, url);
//     });


//     // Function to display the title and URL in the popup (optional).
//     function displayTabInfo(tab) {

//     console.log(tab.title);
//     console.log(tab.url);

//     }

//     // Function to handle the response from the tabs.query() method.
//     function handleTabs(tabs) {
//     if (tabs && tabs.length > 0) {
//       const activeTab = tabs[0];
//       displayTabInfo(activeTab);
//     }
//     }

//     // Function to handle when tabs are switched
//     function handleTabChange() {
//     chrome.tabs.query({ active: true, currentWindow: true }, handleTabs);
//     }

//     // Function to handle when the tabs are updated
//     function handleTabUpdate(tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete' && tab.active) {
//       displayTabInfo(tab);
//     }
//     }

//     chrome.tabs.onActivated.addListener(handleTabChange);
//     chrome.tabs.onUpdated.addListener(handleTabUpdate);




// }catch(e){
//   console.log(e);
// }

import {initializeApp} from 'firebase/app'
import { collection, getDocs, getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLSX15gty8jTRPPe4zwGvQy3BxJxIU9gQ",
  authDomain: "surf-sentinel-fc8a9.firebaseapp.com",
  projectId: "surf-sentinel-fc8a9",
  storageBucket: "surf-sentinel-fc8a9.appspot.com",
  messagingSenderId: "7666181085",
  appId: "1:7666181085:web:c56f28e996bd8fd3d5cc34",
  measurementId: "G-3FHBWM8CPD"
};
//init firebase app
initializeApp(firebaseConfig)
//init services
const db =getFirestore();
//collection ref
const colRef= collection(db,'tabs');
//get collection data
getDocs(colRef).then((snapshot)=>{
  console.log(snapshot.docs)
})