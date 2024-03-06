//Importar funcions database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://proyectotic-d310f-default-rtdb.europe-west1.firebasedatabase.app/"
}

//crear variables de la BD
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppinglist");
//crear referencies a los elements del HTML
const inputFieldEl = document.getElementById("input");
const addButtonEl = document.getElementById("boto");
const shoppinglistE1 = document.getElementById("shopping-list")

//Pintar las cosas
onValue(shoppingListInDB, function (snapshot) {
    if(snapshot.exists()){
    clearshoppinglistE1();

    let shoppingarray = Object.entries(snapshot.val());

    for (let i = 0; i < shoppingarray.length; i++) {
        appendItemToshoppingListE1(shoppingarray[i])
    };}
    else{
        shoppinglistE1.innerHTML = "Tu lista esta vacía...."
    }
})
//Clic per afegir elements a la BD
addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);

    clearInputFieldE1();

    console.log(`${inputValue} añadido base de datos`);
})
//Borrar valor 
function clearInputFieldE1() {
    inputFieldEl.value = "";
}
//
function clearshoppinglistE1() {
    shoppinglistE1.innerHTML = "";
}
//Afegir elemetn a la llista del HTML
function appendItemToshoppingListE1(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener('click', function () {
        let location = ref(database, `shoppinglist/${itemID}`)
        let quieres = confirm("¿¿QUIERES QUITARLO??")
        if (quieres) {
            remove(location)
        }
    })

    shoppinglistE1.append(newEl)
}

