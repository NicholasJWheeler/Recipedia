import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLogout
} from './ui.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Required Link to Firebase Project
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAMRwszrWvCTbJ0EvEDcadH2q2lIAFAr5U",
    authDomain: "recipedia-cc9fb.firebaseapp.com",
    projectId: "recipedia-cc9fb",
    storageBucket: "recipedia-cc9fb.appspot.com",
    messagingSenderId: "230919453627",
    appId: "1:230919453627:web:3cfa886dcd34a6e8d9a29e",
    measurementId: "G-12GKBV75Z8"
  });

///// User Authentication /////
//// Email & Password Sign-In ////

// Login using email/password
const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value
    const loginPassword = txtPassword.value
  
    // step 1: try doing this w/o error handling, and then add try/catch
    //await signInWithEmailAndPassword(authentication, loginEmail, loginPassword)
  
    //step 2: add error handling
    try {
      await signInWithEmailAndPassword(authentication, loginEmail, loginPassword)
    }
    catch(error) {
      console.log(`There was an error: ${error}`)
      showLoginError(error)
    }
  }
  
  // Create new account using email/password
  const createAccount = async () => {
    const email = txtEmail.value
    const password = txtPassword.value
  
    try {
      await createUserWithEmailAndPassword(authentication, email, password)
    }
    catch(error) {
      console.log(`There was an error: ${error}`)
      showLoginError(error)
    } 
  }
  
  // Monitor auth state
  const monitorAuthState = async () => {
    onAuthStateChanged(authentication, user => {
      if (user) {
        console.log(user)
        showApp()
        showLoginState(user)
  
        hideLoginError()
        //hideLinkError()
      }
      else {
        showLoginForm()
        lblAuthState.innerHTML = `You're not logged in.`
      }
    })
  }
  
  // Log out
  const logout = async () => {
    await signOut(auth);
  }

// Button Click Event Listeners (Email Login, Logout)
btnLogin.addEventListener("click", loginEmailPassword) 
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)

// Core constant variable used to regulate a user's authenticated 'state'
const auth = firebase.auth();

const authentication = getAuth(firebaseApp);
//connectAuthEmulator(authentication, "http://localhost:9099");
monitorAuthState();

/// Hide or Show Menus ///
// Nav Bar Visibility
const navBarNotVisible = document.getElementById('navBarNotVisible');

// Collection Creation Menu
const newCollection = document.getElementById('newCollection');
const makeColBtn = document.getElementById('makeCollection');

// Ingredients Collection Menu
const ingredientListContainer = document.getElementById('ingredientList-container');

// Search Box Menu
const searchBox = document.getElementById('searchBox');
const generateBtn = document.getElementById('generateBtn');
generateBtn.addEventListener("click", findMaxAmountObject);

// Favorite Recipes Menu
const favoritesContainer = document.getElementById("favoriteMenu");

//////////////////////////// Meat/Fish/Poultry ///////////////////////////
/// ADD ///
// Add Meat Button (Create menu)
const addMeatBtn = document.getElementById('addMeatBtn');
// Button event
addMeatBtn.addEventListener("click", toggleAddMeatIngredient);
// Update (add) Meat item
const updateAddMeatBtn = document.getElementById("updateAddMeat");
// Update (add) Meat item function for update button
updateAddMeatBtn.addEventListener("click", (event) => {
  event.preventDefault();
  auth.onAuthStateChanged(user => { // Used to get access correct user data
    if (user) {
      const selectedIngredient = document.getElementById("selectedIngredientAddMeat").value;
      const amountWholeNumber = parseInt(document.getElementById("amountWholeNumberAddMeat").value);
      const amountFraction = parseFloat(document.getElementById("amountFractionAddMeat").value);
      const thingsRef = db.collection("things");
      const query = thingsRef.where('uid', '==', user.uid).where("searchName", "==", selectedIngredient);
      query.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            const newAmount = data.amount + amountWholeNumber + amountFraction;
            thingsRef.doc(doc.id).update({ amount: newAmount });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      const addMeatIngredientDiv = document.getElementById("addMeatIngredient");
      addMeatIngredientDiv.hidden = true;
    } else {
      // Unsubscribe when the user signs out
      unsubscribe && unsubscribe();
    }
  })
});
/// DELETE ///
// Delete Meat Button (Create menu)
const deleteMeatBtn = document.getElementById('deleteMeatBtn');
// Button event
deleteMeatBtn.addEventListener("click", toggleDeleteMeatIngredient);
// Update (delete) Meat item
const updateDeleteMeatBtn = document.getElementById("updateDeleteMeat");
// Update (delete) Meat item function for update button
updateDeleteMeatBtn.addEventListener("click", (event) => {
  event.preventDefault();
  auth.onAuthStateChanged(user => { // Used to get access correct user data
    if (user) {
      const selectedIngredient = document.getElementById("selectedDeleteMeatIngredient").value;
      const amountWholeNumber = parseInt(document.getElementById("amountWholeNumberDeleteMeat").value);
      const amountFraction = parseFloat(document.getElementById("amountFractionDeleteMeat").value);
      // calculate the total amount to subtract
      var amountToSubtract = amountWholeNumber + amountFraction;
      const thingsRef = db.collection("things");
      const query = thingsRef.where('uid', '==', user.uid).where("searchName", "==", selectedIngredient);
      query.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            var newAmount = data.amount - amountToSubtract;
            // Prevent negative values
            if (newAmount < 0) {
              newAmount = 0;
            }
            thingsRef.doc(doc.id).update({ amount: newAmount });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      const deleteMeatIngredientDiv = document.getElementById("deleteMeatIngredient");
      deleteMeatIngredientDiv.hidden = true;
    } else {
      // Unsubscribe when the user signs out
      unsubscribe && unsubscribe();
    }
  })
});

///////////////////////////// Vegetables /////////////////////////////////
/// ADD ///
// Add Vegetable Button (Create menu)
const addVegetableBtn = document.getElementById('addVegetableBtn');
// Button event
addVegetableBtn.addEventListener("click", toggleAddVegetableIngredient);
// Update (add) Vegetable item
const updateAddVegetableBtn = document.getElementById("updateAddVegetable");
// Update (add) Vegetable item function for update button
updateAddVegetableBtn.addEventListener("click", (event) => {
  event.preventDefault();
  auth.onAuthStateChanged(user => { // Used to get access correct user data
    if (user) {
      const selectedIngredient = document.getElementById("selectedIngredientAddVegetable").value;
      const amountWholeNumber = parseInt(document.getElementById("amountWholeNumberAddVegetable").value);
      const amountFraction = parseFloat(document.getElementById("amountFractionAddVegetable").value);
      const thingsRef = db.collection("things");
      const query = thingsRef.where('uid', '==', user.uid).where("searchName", "==", selectedIngredient);
      query.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            const newAmount = data.amount + amountWholeNumber + amountFraction;
            thingsRef.doc(doc.id).update({ amount: newAmount });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      const addVegetableIngredientDiv = document.getElementById("addVegetableIngredient");
      addVegetableIngredientDiv.hidden = true;
    } else {
      // Unsubscribe when the user signs out
      unsubscribe && unsubscribe();
    }
  })
});
/// DELETE ///
// Delete Vegetable Button (Create menu)
const deleteVegetableBtn = document.getElementById('deleteVegetableBtn');
// Button event
deleteVegetableBtn.addEventListener("click", toggleDeleteVegetableIngredient);
// Update (delete) Vegetable item
const updateDeleteVegetableBtn = document.getElementById("updateDeleteVegetable");
// Update (add) Vegetable item function for update button
updateDeleteVegetableBtn.addEventListener("click", (event) => {
  event.preventDefault();
  auth.onAuthStateChanged(user => { // Used to get access correct user data
    if (user) {
      const selectedIngredient = document.getElementById("selectedIngredientDeleteVegetable").value;
      const amountWholeNumber = parseInt(document.getElementById("amountWholeNumberDeleteVegetable").value);
      const amountFraction = parseFloat(document.getElementById("amountFractionDeleteVegetable").value);
      // calculate the total amount to subtract
      var amountToSubtract = amountWholeNumber + amountFraction;
      const thingsRef = db.collection("things");
      const query = thingsRef.where('uid', '==', user.uid).where("searchName", "==", selectedIngredient);
      query.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            var newAmount = data.amount - amountToSubtract;
            // Prevent negative values
            if (newAmount < 0) {
              newAmount = 0;
            }
            thingsRef.doc(doc.id).update({ amount: newAmount });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      const deleteVegetableIngredientDiv = document.getElementById("deleteVegetableIngredient");
      deleteVegetableIngredientDiv.hidden = true;
    } else {
      // Unsubscribe when the user signs out
      unsubscribe && unsubscribe();
    }
  })
});

///////////////////////////// Dairy /////////////////////////////////
/// ADD ///
// Add Dairy Button (Create menu)
const addDairyBtn = document.getElementById('addDairyBtn');
// Button event
addDairyBtn.addEventListener("click", toggleAddDairyIngredient);
// Update (add) Dairy item
const updateAddDairyBtn = document.getElementById("updateAddDairy");
// Update (add) Dairy item function for update button
updateAddDairyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  auth.onAuthStateChanged(user => { // Used to get access correct user data
    if (user) {
      const selectedIngredient = document.getElementById("selectedIngredientAddDairy").value;
      const amountWholeNumber = parseInt(document.getElementById("amountWholeNumberAddDairy").value);
      const amountFraction = parseFloat(document.getElementById("amountFractionAddDairy").value);
      const thingsRef = db.collection("things");
      const query = thingsRef.where('uid', '==', user.uid).where("searchName", "==", selectedIngredient);
      query.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            const newAmount = data.amount + amountWholeNumber + amountFraction;
            thingsRef.doc(doc.id).update({ amount: newAmount });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      const addDairyIngredientDiv = document.getElementById("addDairyIngredient");
      addDairyIngredientDiv.hidden = true;
    } else {
      // Unsubscribe when the user signs out
      unsubscribe && unsubscribe();
    }
  })
});
/// DELETE ///
// Delete Dairy Button (Create menu)
const deleteDairyBtn = document.getElementById('deleteDairyBtn');
// Button event
deleteDairyBtn.addEventListener("click", toggleDeleteDairyIngredient);
// Update (delete) Dairy item
const updateDeleteDairyBtn = document.getElementById("updateDeleteDairy");
// Update (add) Dairy item function for update button
updateDeleteDairyBtn.addEventListener("click", (event) => {
  event.preventDefault();
  auth.onAuthStateChanged(user => { // Used to get access correct user data
    if (user) {
      const selectedIngredient = document.getElementById("selectedIngredientDeleteDairy").value;
      const amountWholeNumber = parseInt(document.getElementById("amountWholeNumberDeleteDairy").value);
      const amountFraction = parseFloat(document.getElementById("amountFractionDeleteDairy").value);
      // calculate the total amount to subtract
      var amountToSubtract = amountWholeNumber + amountFraction;
      const thingsRef = db.collection("things");
      const query = thingsRef.where('uid', '==', user.uid).where("searchName", "==", selectedIngredient);
      query.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            var newAmount = data.amount - amountToSubtract;
            // Prevent negative values
            if (newAmount < 0) {
              newAmount = 0;
            }
            thingsRef.doc(doc.id).update({ amount: newAmount });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      const deleteDairyIngredientDiv = document.getElementById("deleteDairyIngredient");
      deleteDairyIngredientDiv.hidden = true;
    } else {
      // Unsubscribe when the user signs out
      unsubscribe && unsubscribe();
    }
  });
});

///////////////////////////// Fruit /////////////////////////////////
/// ADD ///
// Add Fruit Button (Create menu)
const addFruitBtn = document.getElementById('addFruitBtn');
// Button event
addFruitBtn.addEventListener("click", toggleAddFruitIngredient);
// Update (add) Fruit item
const updateAddFruitBtn = document.getElementById("updateAddFruit");
// Update (add) Fruit item function for update button
updateAddFruitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  auth.onAuthStateChanged(user => { // Used to get access correct user data
    if (user) {
      const selectedIngredient = document.getElementById("selectedIngredientAddFruit").value;
      const amountWholeNumber = parseInt(document.getElementById("amountWholeNumberAddFruit").value);
      const amountFraction = parseFloat(document.getElementById("amountFractionAddFruit").value);
      const thingsRef = db.collection("things");
      const query = thingsRef.where('uid', '==', user.uid).where("searchName", "==", selectedIngredient);
      query.get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            const newAmount = data.amount + amountWholeNumber + amountFraction;
            thingsRef.doc(doc.id).update({ amount: newAmount });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      const addFruitIngredientDiv = document.getElementById("addFruitIngredient");
      addFruitIngredientDiv.hidden = true;
    } else {
      // Unsubscribe when the user signs out
      unsubscribe && unsubscribe();
    }
  })
});
/// DELETE ///
// Delete Fruit Button (Create menu)
const deleteFruitBtn = document.getElementById('deleteFruitBtn');
// Button event
deleteFruitBtn.addEventListener("click", toggleDeleteFruitIngredient);
// Update (delete) Fruit item
const updateDeleteFruitBtn = document.getElementById("updateDeleteFruit");
// Update (add) Fruit item function for update button
updateDeleteFruitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  auth.onAuthStateChanged(user => {
    if (user) {
      // Initialize document variables
      const selectedIngredient = document.getElementById("selectedIngredientDeleteFruit").value;
      const amountWholeNumber = parseInt(document.getElementById("amountWholeNumberDeleteFruit").value);
      const amountFraction = parseFloat(document.getElementById("amountFractionDeleteFruit").value);
      // calculate the total amount to subtract
      var amountToSubtract = amountWholeNumber + amountFraction;
      const thingsRef = db.collection("things");
      const query = thingsRef.where('uid', '==', user.uid).where("searchName", "==", selectedIngredient);
      // Query and update database if possible
      query.get()
      .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        var newAmount = data.amount - amountToSubtract;
        // Prevent negative values
        if (newAmount < 0) {
          newAmount = 0;
        }
        thingsRef.doc(doc.id).update({ amount: newAmount });
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
    const deleteFruitIngredientDiv = document.getElementById("deleteFruitIngredient");
    deleteFruitIngredientDiv.hidden = true;
    } else {
      // Unsubscribe when the user signs out
      unsubscribe && unsubscribe();
    }
  })
});

///////////////////// Nav Bar Buttons /////////////////////////////
const navIngredientsBtn = document.getElementById('listIngredients');
navIngredientsBtn.addEventListener("click", viewIngredients);

const navSearhBtn = document.getElementById('searchButtonNav');
navSearhBtn.addEventListener("click", viewSearch);

const favoritesBtn = document.getElementById('btnFavorites');
favoritesBtn.addEventListener("click", viewFavorites);

/// Google Authentication ///
// Variable Declaration
const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');
const altLoginBox = document.getElementById('altLogins');
const provider = new firebase.auth.GoogleAuthProvider();

/// Google Sign-in event handlers
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

// This authentication listener regulates what the user sees
// on the page depending on the authentication state.
auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        altLoginBox.hidden = true;

        // Check if user owns something, shows new collection if not
        newCollection.hidden = true;
        userOwnsSomething(user.uid)
          .then((userOwnsThings) => {
            console.log("User owns things? ", userOwnsThings);
            if (!userOwnsThings) {
              newCollection.hidden = false;
            } else {
              // Show Ingredients Collection
              ingredientListContainer.hidden = false;
            }
          });

        // Show the Nav Bar
        navBarNotVisible.hidden = false;

        // Show username
        if (user.displayName === null) {
          userDetails.innerHTML = `<h3 style="text-align: center;">Hello User!</h3>`;
        } else {
          userDetails.innerHTML = `<h3 style="text-align: center;">Hello ${user.displayName}!</h3>`;
        }

    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        altLoginBox.hidden = false;
        // Hide Make Collection
        newCollection.hidden = true;
        // Hide the Nav Bar
        navBarNotVisible.hidden = true;
        // Hide the Search Box
        searchBox.hidden = true;
        userDetails.innerHTML = '';
        // Hide Ingredients Collection
        ingredientListContainer.hidden = true;
        // Hide Favorites Collection
        favoritesContainer.hidden = true;
    }
});

///// Firestore /////
const db = firebase.firestore();

let thingsRef; // Reference to the document or collection we want to access
let unsubscribe; // For telling the app when to stop listening to the realtime stream of updates (could lead to memory leaks if not done)
let unsubscribe2; // No memory leaks!
let unsubscribe3; // No memory leaks!
let unsubscribe4; // No memory leaks!

// Search the Cloud Firestore database to either create a new ingredient collection
// for the authenticated user, or display the stored ingredients to the user if they exist
auth.onAuthStateChanged(user => {

    if (user) { // Only allows a logged in user to change database


        // Database Reference
        thingsRef = db.collection('things')

        makeColBtn.onclick = () => {

            //const { serverTimestamp } = firebase.firestore.FieldValue;

            // Meats
            thingsRef.add({ 
              uid: user.uid,
              displayName: '🍗 Chicken',
              searchName: 'chicken',
              foodGroup: 'meat',
              amount: 0
            });

            thingsRef.add({ 
              uid: user.uid,
              displayName: '🥩 Beef',
              searchName: 'beef',
              foodGroup: 'meat',
              amount: 0 
            });

            thingsRef.add({ 
              uid: user.uid,
              displayName: '🐖 Pork',
              searchName: 'pork',
              foodGroup: 'meat',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🦃 Turkey',
              searchName: 'turkey',
              foodGroup: 'meat',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🥚 Egg',
              searchName: 'egg',
              foodGroup: 'meat',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🐟Tuna',
              searchName: 'tuna',
              foodGroup: 'meat',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🐠Salmon',
              searchName: 'salmon',
              foodGroup: 'meat',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🦀 Crab',
              searchName: 'crab',
              foodGroup: 'meat',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🦞Lobster',
              searchName: 'lobster',
              foodGroup: 'meat',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🦑Squid',
              searchName: 'squid',
              foodGroup: 'meat',
              amount: 0
            });

            // Vegetables

            thingsRef.add({
              uid: user.uid,
              displayName: '🥔Potato',
              searchName: 'potato',
              foodGroup: 'vegetable',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🍅Tomato',
              searchName: 'tomato',
              foodGroup: 'vegetable',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🧅Onion',
              searchName: 'onion',
              foodGroup: 'vegetable',
              amount: 0
            });
            
            thingsRef.add({
              uid: user.uid,
              displayName: '🥕Carrot',
              searchName: 'carrot',
              foodGroup: 'vegetable',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🫑Bell Pepper',
              searchName: 'bellpepper',
              foodGroup: 'vegetable',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🥦Broccoli',
              searchName: 'broccoli',
              foodGroup: 'vegetable',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🥒Cucumber',
              searchName: 'cucumber',
              foodGroup: 'vegetable',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🥬Lettuce Head',
              searchName: 'lettuce',
              foodGroup: 'vegetable',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🌽 Ear of Corn',
              searchName: 'corn',
              foodGroup: 'vegetable',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🧄 Garlic',
              searchName: 'garlic',
              foodGroup: 'vegetable',
              amount: 0
            });

            // Fruits
            thingsRef.add({
              uid: user.uid,
              displayName: '🍌Banana',
              searchName: 'banana',
              foodGroup: 'fruit',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🍓Strawberry',
              searchName: 'strawberry',
              foodGroup: 'fruit',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🥭Mango',
              searchName: 'mango',
              foodGroup: 'fruit',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🍎Apple',
              searchName: 'apple',
              foodGroup: 'fruit',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🍉 Watermelon',
              searchName: 'watermelon',
              foodGroup: 'fruit',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🍊Tangerine',
              searchName: 'tangerine',
              foodGroup: 'fruit',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🍍Pineapple',
              searchName: 'pineapple',
              foodGroup: 'fruit',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🍋 Lemon',
              searchName: 'lemon',
              foodGroup: 'fruit',
              amount: 0
            });

            thingsRef.add({
              uid: user.uid,
              displayName: '🍑 Peach',
              searchName: 'peach',
              foodGroup: 'fruit',
              amount: 0
            });
            
            thingsRef.add({ 
              uid: user.uid,
              displayName: '🥑 Avocado',
              searchName: 'avocado',
              foodGroup: 'fruit',
              amount: 0
            });
          
            // Dairy
            thingsRef.add({ 
              uid: user.uid,
              displayName: '🥛 Milk',
              searchName: 'milk',
              foodGroup: 'dairy',
              amount: 0
            });

            thingsRef.add({ 
              uid: user.uid,
              displayName: '🧈 Butter',
              searchName: 'butter',
              foodGroup: 'dairy',
              amount: 0
            });

            thingsRef.add({ 
              uid: user.uid,
              displayName: '🧀 Cheese',
              searchName: 'cheese',
              foodGroup: 'dairy',
              amount: 0
            });
            
            thingsRef.add({ 
              uid: user.uid,
              displayName: '🍨 Ice Cream',
              searchName: 'icecream',
              foodGroup: 'dairy',
              amount: 0
            });
            
            thingsRef.add({ 
              uid: user.uid,
              displayName: '🍶 Yogurt',
              searchName: 'yogurt',
              foodGroup: 'dairy',
              amount: 0
            });

          // Don't allow the user to create a new collection
          newCollection.hidden = true;
          // Show the ingredients collection to the user
          ingredientListContainer.hidden = false;
        }

        // Query (meat)
        unsubscribe = thingsRef
          .where('uid', '==', user.uid)
          .where('foodGroup', '==', 'meat')
          .orderBy('searchName') // Order by 'searchName' field
          .onSnapshot(querySnapshot => {

              const meatList = document.getElementById('meatList');

                // Clear previous content of meatList
                meatList.innerHTML = '';

                // Initialize variables for table creation
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');
                let row = document.createElement('tr');
                let colCount = 0;

                // Loop through query results and create table rows and columns
                querySnapshot.docs.forEach(doc => {
                    const item = doc.data();
                    const name = item.displayName;
                    const amount = item.amount;
                    const col = document.createElement('td');
                    col.textContent = `${name}: ${amount}`;
                    row.appendChild(col);
                    colCount++;

                    // If there are 5 columns in this row, append it to the table body and start a new row
                    if (colCount === 5) {
                        tbody.appendChild(row);
                        row = document.createElement('tr');
                        colCount = 0;
                    }
                });

                // If there are remaining columns in the last row, append it to the table body
                if (colCount > 0) {
                    tbody.appendChild(row);
                }

                // Add the table body to the table and the table to the meatList div
                table.appendChild(tbody);
                meatList.appendChild(table);

          });

          // Query (Vegetables)
          unsubscribe2 = thingsRef
          .where('uid', '==', user.uid)
          .where('foodGroup', '==', 'vegetable')
          .orderBy('searchName') // Order by 'searchName' field
          .onSnapshot(querySnapshot => {

                const vegetableList = document.getElementById('vegetableList');

                // Clear previous content of vegetableList
                vegetableList.innerHTML = '';

                // Initialize variables for table creation
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');
                let row = document.createElement('tr');
                let colCount = 0;

                // Loop through query results and create table rows and columns
                querySnapshot.docs.forEach(doc => {
                    const item = doc.data();
                    const name = item.displayName;
                    const amount = item.amount;
                    const col = document.createElement('td');
                    col.textContent = `${name}: ${amount}`;
                    row.appendChild(col);
                    colCount++;

                    // If there are 5 columns in this row, append it to the table body and start a new row
                    if (colCount === 5) {
                        tbody.appendChild(row);
                        row = document.createElement('tr');
                        colCount = 0;
                    }
                });

                // If there are remaining columns in the last row, append it to the table body
                if (colCount > 0) {
                    tbody.appendChild(row);
                }

                // Add the table body to the table and the table to the meatList div
                table.appendChild(tbody);
                vegetableList.appendChild(table);

          });

          // Query (Dairy)
          unsubscribe3 = thingsRef
          .where('uid', '==', user.uid)
          .where('foodGroup', '==', 'dairy')
          .orderBy('searchName') // Order by 'searchName' field
          .onSnapshot(querySnapshot => {

                const dairyList = document.getElementById('dairyList');

                // Clear previous content of dairyList
                dairyList.innerHTML = '';

                // Initialize variables for table creation
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');
                let row = document.createElement('tr');
                let colCount = 0;

                // Loop through query results and create table rows and columns
                querySnapshot.docs.forEach(doc => {
                    const item = doc.data();
                    const name = item.displayName;
                    const amount = item.amount;
                    const col = document.createElement('td');
                    col.textContent = `${name}: ${amount}`;
                    row.appendChild(col);
                    colCount++;

                    // If there are 5 columns in this row, append it to the table body and start a new row
                    if (colCount === 5) {
                        tbody.appendChild(row);
                        row = document.createElement('tr');
                        colCount = 0;
                    }
                });

                // If there are remaining columns in the last row, append it to the table body
                if (colCount > 0) {
                    tbody.appendChild(row);
                }

                // Add the table body to the table and the table to the meatList div
                table.appendChild(tbody);
                dairyList.appendChild(table);

          });

          // Query (Fruit)
          unsubscribe4 = thingsRef
          .where('uid', '==', user.uid)
          .where('foodGroup', '==', 'fruit')
          .orderBy('searchName') // Order by 'searchName' field
          .onSnapshot(querySnapshot => {

                const fruitList = document.getElementById('fruitList');

                // Clear previous content of fruitList
                fruitList.innerHTML = '';

                // Initialize variables for table creation
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');
                let row = document.createElement('tr');
                let colCount = 0;

                // Loop through query results and create table rows and columns
                querySnapshot.docs.forEach(doc => {
                    const item = doc.data();
                    const name = item.displayName;
                    const amount = item.amount;
                    const col = document.createElement('td');
                    col.textContent = `${name}: ${amount}`;
                    row.appendChild(col);
                    colCount++;

                    // If there are 5 columns in this row, append it to the table body and start a new row
                    if (colCount === 5) {
                        tbody.appendChild(row);
                        row = document.createElement('tr');
                        colCount = 0;
                    }
                });

                // If there are remaining columns in the last row, append it to the table body
                if (colCount > 0) {
                    tbody.appendChild(row);
                }

                // Add the table body to the table and the table to the meatList div
                table.appendChild(tbody);
                fruitList.appendChild(table);

          });
    } else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
        unsubscribe2 && unsubscribe();
        unsubscribe3 && unsubscribe();
        unsubscribe4 && unsubscribe();
    }
});


// Function to check if a user owns any items in the Cloud Firestore database
function userOwnsSomething(userId) {
  return db.collection("things")
    .where("uid", "==", userId)
    .get()
    .then((querySnapshot) => {
      return !querySnapshot.empty; // returns true if user owns things, false otherwise
    })
    .catch((error) => {
      return false; // return false if there was an error [nothing owned]
    });
}

// Function to toggle the visibility of adding new meat ingredients
function toggleAddMeatIngredient() {
  const addMeatIngredientDiv = document.getElementById("addMeatIngredient");
  addMeatIngredientDiv.hidden = !addMeatIngredientDiv.hidden;
  // Hide Delete Menu if needed
  const deleteMeatIngredientDiv = document.getElementById("deleteMeatIngredient");
  deleteMeatIngredientDiv.hidden = true;
}

// Function to toggle the visibility of deleting meat ingredients
function toggleDeleteMeatIngredient() {
  const deleteMeatIngredientDiv = document.getElementById("deleteMeatIngredient");
  deleteMeatIngredientDiv.hidden = !deleteMeatIngredientDiv.hidden;
  // Hide Add Menu if needed
  const addMeatIngredientDiv = document.getElementById("addMeatIngredient");
  addMeatIngredientDiv.hidden = true;
}

// Function to toggle the visibility of adding new vegetable ingredients
function toggleAddVegetableIngredient() {
  const addVegetableIngredientDiv = document.getElementById("addVegetableIngredient");
  addVegetableIngredientDiv.hidden = !addVegetableIngredientDiv.hidden;
  // Hide Delete Menu if needed
  const deleteVegetableIngredientDiv = document.getElementById("deleteVegetableIngredient");
  deleteVegetableIngredientDiv.hidden = true;
}

// Function to toggle the visibility of deleting vegetable ingredients
function toggleDeleteVegetableIngredient() {
  const deleteVegetableIngredientDiv = document.getElementById("deleteVegetableIngredient");
  deleteVegetableIngredientDiv.hidden = !deleteVegetableIngredientDiv.hidden;
  // Hide Add Menu if needed
  const addVegetableIngredientDiv = document.getElementById("addVegetableIngredient");
  addVegetableIngredientDiv.hidden = true;
}

// Function to toggle the visibility of adding new dairy ingredients
function toggleAddDairyIngredient() {
  const addDairyIngredientDiv = document.getElementById("addDairyIngredient");
  addDairyIngredientDiv.hidden = !addDairyIngredientDiv.hidden;
  // Hide Delete Menu if needed
  const deleteDairyIngredientDiv = document.getElementById("deleteDairyIngredient");
  deleteDairyIngredientDiv.hidden = true;
}

// Function to toggle the visibility of deleting dairy ingredients
function toggleDeleteDairyIngredient() {
  const deleteDairyIngredientDiv = document.getElementById("deleteDairyIngredient");
  deleteDairyIngredientDiv.hidden = !deleteDairyIngredientDiv.hidden;
  // Hide Add Menu if needed
  const addDairyIngredientDiv = document.getElementById("addDairyIngredient");
  addDairyIngredientDiv.hidden = true;
}

// Function to toggle the visibility of adding new fruit ingredients
function toggleAddFruitIngredient() {
  const addFruitIngredientDiv = document.getElementById("addFruitIngredient");
  addFruitIngredientDiv.hidden = !addFruitIngredientDiv.hidden;
  // Hide Delete Menu if needed
  const deleteFruitIngredientDiv = document.getElementById("deleteFruitIngredient");
  deleteFruitIngredientDiv.hidden = true;
}

// Function to toggle the visibility of deleting fruit ingredients
function toggleDeleteFruitIngredient() {
  const deleteFruitIngredientDiv = document.getElementById("deleteFruitIngredient");
  deleteFruitIngredientDiv.hidden = !deleteFruitIngredientDiv.hidden;
  // Hide Add Menu if needed
  const addFruitIngredientDiv = document.getElementById("addFruitIngredient");
  addFruitIngredientDiv.hidden = true;
}

// Function to toggle on the visibility of the user's ingredients
// This function will also disable the visibility of the search box + favorites
function viewIngredients() {
  // Hide Search Menu section
  const searchBox = document.getElementById("searchBox");
  searchBox.hidden = true;
  // Hide Favorites Menu section
  const favoritesContainer = document.getElementById("favoriteMenu");
  favoritesContainer.hidden = true;
  // Show Ingredients Menu section
  const ingredientContainer = document.getElementById("ingredientList-container");
  ingredientContainer.hidden = false;
}

// Function to toggle on the visibility of the search menu
// This function will also disable the visibility of the ingredients + favorites
function viewSearch() {
  // Hide Ingredients Menu section
  const ingredientContainer = document.getElementById("ingredientList-container");
  ingredientContainer.hidden = true;
  // Hide Favorites Menu section
  const favoritesContainer = document.getElementById("favoriteMenu");
  favoritesContainer.hidden = true;
  // Show Search Menu section
  const searchBox = document.getElementById("searchBox");
  searchBox.hidden = false;
}

// Function to toggle on the visibility of the favorite recipes menu
// This function will also disable the visibility of the ingredients + search
function viewFavorites() {
  // Update

  // Show Favorites Menu section
  const favoritesContainer = document.getElementById("favoriteMenu");
  favoritesContainer.hidden = false;
  // Hide Search Menu section
  const searchBox = document.getElementById("searchBox");
  searchBox.hidden = true;
  // Hide Ingredients Menu section
  const ingredientContainer = document.getElementById("ingredientList-container");
  ingredientContainer.hidden = true;
}

// This function will query the database to find the ingredient
// within a user's collection that is the most abundant. This
// function is used to help generate a recipe from a user ingredient.
function findMaxAmountObject() {
  auth.onAuthStateChanged(user => {
    if (user) {
      const userId = user.uid;
      thingsRef = db.collection('things');
      let maxAmount = 0;
      let abundantIngredientName;
      thingsRef.where('uid', '==', userId).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.amount > maxAmount) {
              maxAmount = data.amount;
              abundantIngredientName = data.searchName; // replace with your actual field name
            }
          });
          console.log('Abundant Ingredient:', abundantIngredientName, 'Max Amount:', maxAmount);
          if (maxAmount > 0) {
            generateRecipe(abundantIngredientName);
          } else {
            console.log('All ingredients are 0');
          }
        })
        .catch(error => {
          console.error('Error searching for items:', error);
        });
    } else {
      console.log('User is not authenticated');
    } 
  });
}

// This is a helper function that will connect to the Spoonacular API
// with a 'findByIngredients' recipe query based on the user's most
// abundant ingredient. Occurs when the "Generate" button is clicked.
async function generateRecipe(ingredientName) {
  let searchContainer = document.getElementById("search-container")
  const apikey = "7f9327223f0443e69a8a6a66ec79a8d3";
  let maxIngredient = ingredientName;
  let searchURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apikey}&ingredients=`;

    searchURL += `${maxIngredient},+`
    searchURL = searchURL.substring(0, searchURL.length - 2)
    searchURL += `&number=${1}`

    try {
        const response = await fetch(searchURL);
        const data = await response.json();
        let recipeString = ``
        for (let i = 0; i < data.length; i++) {
            let recipeURL = `https://api.spoonacular.com/recipes/${data[i].id}/information?apiKey=${apikey}&includeNutrition=false`
            const recipeResponse = await fetch(recipeURL)
            const recipeData = await recipeResponse.json()
            searchContainer.appendChild(takesRecipeDataGivesHTML(recipeData))

            recipeString += `${i + 1}. [${data[i].title}](${recipeData.sourceUrl})\n`
        }

    } catch (error) {
        console.log('Did not work')
    }
  
}

// This is a helper function that takes the data that Spoonacular API
// sends back and formats it into readable HTML for the user to view
// and provides a link for them to look at the full recipe details on
// the Spoonacular website.
function takesRecipeDataGivesHTML(data) {
  let element = document.createElement("div")
  element.setAttribute("class", "row")
  element.setAttribute("style", "padding:10px")
  element.innerHTML =
      `<div class="col-3">
              <img src="${data.image}" style="width:100%" />
          </div>
          <div class="col-8">
              <a href="${data.spoonacularSourceUrl}"><h3>${data.title}</h3></a>
              <p>
                  ${data.summary}
              </p>
          </div>
          <div class="col-1">
          <button class="btn btn-warning favorite-btn">Favorite</button> 
        </div>
      `;
    
      const favoriteBtn = element.querySelector('.favorite-btn');
      favoriteBtn.addEventListener('click', () => {
        storeFavoritedRecipe(data);
      });
    
      return element;
}

// This function is almost the same as 'takesRecipeDataGivesHTML' except
// this function takes recipe data from the database and will display HTML
// to the user in the favorite recipes section. This HTML also includes a
// 'Remove' button instead of a 'Favorite' button so the user can remove
// any recipe from their favorites list when they don't want it.
function takesRecipeDataGivesHTMLREMOVE(image, summary, title, url) {
  let element = document.createElement("div")
  element.setAttribute("class", "row")
  element.setAttribute("style", "padding:10px")
  element.innerHTML =
      `<div class="col-3">
              <img src="${image}" style="width:100%" />
          </div>
          <div class="col-8">
              <a href="${url}"><h3>${title}</h3></a>
              <p>
                  ${summary}
              </p>
          </div>
          <div class="col-1">
          <button class="btn btn-danger remove-btn">Remove</button> 
        </div>`;
    
      const removeBtn = element.querySelector('.remove-btn');
      removeBtn.addEventListener('click', () => {
        removeFavoritedRecipe(summary);
      });
    
      return element;
}

// The 'export' tag is added to this function to allow it to be used by the search.js
// file. This is to prevent needing to import the Recipedia project into another JavaScript
// file when it would be unnecessary.
export function storeFavoritedRecipe(data) {
  let data_image = `${data.image}`;
  let data_sourceUrl = `${data.spoonacularSourceUrl}`;
  let data_title = `${data.title}`;
  let data_summary = `${data.summary}`;

  // Store some JSON data in a new object for a user's collection of recipes
  auth.onAuthStateChanged(user => {
    if (user) {
      thingsRef = db.collection('things')
      thingsRef.add({ 
        uid: user.uid,
        image: data_image,
        url: data_sourceUrl,
        title: data_title,
        summary: data_summary,
      });
    } else {
      console.log('User is not authenticated');
    } 
  });
}

// This is a helper function that will take the information about a recipe
// that is currently stored in the user's favorites, and will remove it from
// their information in the database so it will not appear in the favorites
// section. All recipes that share the same selected summary will be eliminated
// with the removal of a specified recipe.
function removeFavoritedRecipe(summary) {
  auth.onAuthStateChanged(user => {
    if (user) {
      thingsRef = db.collection('things')
      thingsRef.where('uid', '==', user.uid)
               .where('summary', '==', summary)
               .get()
               .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    doc.ref.delete();
                  });
               })
               .catch(error => {
                  console.error('Error removing document: ', error);
               });
    } else {
      console.log('User is not authenticated');
    } 
  });
}

// This monitors when the authenticated state is changed, and
// will populate the favorited recipes menu if the user is correctly
// signed in. This method will 'unsubscribe' and stop listening when
// the user is signed out.
auth.onAuthStateChanged(user => {

  if (user) { // Only allows a logged in user to access database

    // Database Reference
    thingsRef = db.collection('things')

    // Query (user's recipes to display)
    unsubscribe = thingsRef
    .where('uid', '==', user.uid)
    .where('title', '>=', "")
    .orderBy('title') // Order by 'title' field
    .onSnapshot(querySnapshot => {

        const favoriteBox = document.getElementById('favoriteBox');

          // Clear previous content of the favorite recipes list
          favoriteBox.innerHTML = '';

          // Loop through query results and create table rows and columns
          querySnapshot.docs.forEach(doc => {
              const item = doc.data();
              const image = item.image;
              const summary = item.summary;
              const title = item.title;
              const url = item.url;
              favoriteBox.appendChild(takesRecipeDataGivesHTMLREMOVE(image, summary, title, url));
          });
    });
  } else {
    // Unsubscribe when the user signs out
    unsubscribe && unsubscribe();
  }
});