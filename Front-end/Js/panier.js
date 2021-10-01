//Connexion base de données
function fetchApi (){
    fetch("http://localhost:3000/api/teddies")
    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })
    .then(function(data) {
        let containerPanier = document.getElementById("container_panier");
                containerPanier.innerHTML = ``
        console.log(data)
        afficheLePanier(data);
        calculatePrice(data);
        nombrePanier();
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
    }
    
fetchApi();

//RECUPERATION ET AFFICHAGE DU PANIER
function afficheLePanier(data){
    total=[];
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
    
    //VERIFIER SI LE PANIER EST VIDE OU NON
    if(monPanier == ""){
        //MENTIONNER QUE LE PANIER EST VIDE
        let main = document.getElementById('main');
        main.innerHTML=`<h2>Votre panier est vide</h2>`
        let formulaire = document.getElementById('formulaire');
        formulaire.innerHTML=``;
    }else{
        //AFFICHER LES DONNEES DU PANIER
        for (let teddy of data) {
            //BOUCLER SUR LE PANIER ET AFFICHER LES ELEMENTS CORRESPONDANT
            if(monPanier.includes(teddy._id)){
                let containerPanier = document.getElementById("container_panier");
                containerPanier.innerHTML += `
                <tr class="table-light"> 
                <td> <button class="remove btn btn-danger" id="${teddy._id}" type="button"><i class="fas fa-minus-circle"></i></button></td>
                    <td>Ours : ${teddy.name} </td>
                    <td><img src="${teddy.imageUrl}" width="100px"> </img></td>
                    <td>Quantité : <input type="number" id="${teddy._id}" value="${countTeddies(teddy._id)}" class="listenQte"></input></td>
                    <td>${(teddy.price/100)*countTeddies(teddy._id)}€</td>
                </tr>
                
            `
            }
            //Fonction pour la suppression des éléments au clic
            remove()
            //Fonction pour écouter la quantité de l'input
            changeQte() 
    }
    } 
}

//CREATION DU PANIER DANS LE LOCAL STORAGE 
function ajoutPanier(){
    let initPanier = JSON.parse(localStorage.getItem("panierClient"));
        if(localStorage.getItem('panierClient')){
            //Si present - ajout des données au panier
            initPanier.push(data_id);
            localStorage.setItem("panierClient", JSON.stringify(initPanier));
        }else{
            //Si vide - initialisation du panier dans le local storage
            let initPanier = [];
            localStorage.setItem("panierClient", JSON.stringify(initPanier));
        }
}

//Tableau vide pour stocker les prix des produits du panier
let total = [];

//Ajoute les prix de chaque élément du panier dans le tableau
function calculatePrice(data){
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
    for(ours of data){
        for(element of monPanier){
            //POUR LES ELEMENTS PRESENTS DANS LE PANIER, AJOUTER LEUR PRIX DANS LE TABLEAU
            if(ours._id == element){
                total.push(ours.price/100)
            }
        }
    }
   //Appel de la fonction pour afficher le prix total calculé par la fonction somme
    showPrice()
}

function showPrice(){
    //Affichage panier
    let totalPanier = document.getElementById('total_panier');
    //Ligne pour le total du panier
    totalPanier.innerHTML = `
            <tr class="table-success"> 
                        <td> Prix total:</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>${somme()}€</td>
            </tr>
        `
}
//Calcul du prix total
function somme(){
    let prix=0;
    //Additionne chaque élément du tableau l'un après l'autre
    for(el of total){
        prix+=el;
    }
    //Retour le montant total
    return(prix)
}

//FONCTION QUI ECOUTE L'INPUT QTE ET AJUSTE LES ELEMENTS
function  changeQte(){
    let inputQte = document.querySelectorAll('.listenQte'); 
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
   
    inputQte.forEach(element => {
        element.addEventListener('change', () =>{
            //Afficher avec les nouvelles valeurs
            fetchApi()
            
            newQte = element.value;   //Nouvelle valeur de l'input
            let teddyid = element.getAttribute("id"); //Recupère l'id de l'ours en question
            let panierSansOursEnQuestion = monPanier.filter(el => el != teddyid); //Panier sans les ours en question 
              
            for(i=0;i<newQte;i++){
                panierSansOursEnQuestion.push(teddyid); //Ajoute la nouvelle quantité de l'ours en question 
            }
            localStorage.setItem('panierClient', JSON.stringify(panierSansOursEnQuestion)); //Panier à jour dans le localstorage
            
        })
    })
}

//SUPPRESSION DES ELEMENTS AU CLIC
function remove(){
    let boutonRemove = document.querySelectorAll('.remove');
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
    boutonRemove.forEach(element => {
        element.addEventListener('click', () => {
            let teddyid = element.getAttribute("id"); //Récupère l'id de l'ours en question 
                let filtre = monPanier.filter(item => item != teddyid); //Renvoi le tableau (monPanier) sans les ours en question 

                localStorage.setItem('panierClient', JSON.stringify(filtre)) //Ajouter ce nouveau tableau au localstorage
                fetchApi(); //Appel de la fonction pour afficher avec les valeurs à jour
        })
    });
}

//COMPTAGE DES ELEMENTS
function countTeddies(id){
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));

    let qteTeddies = {}; 
    for(let i=0; i<monPanier.length; i++){
        let iteration = monPanier[i];
        qteTeddies[iteration] = qteTeddies[iteration] ? qteTeddies[iteration] +1 :1;
    }
    //return(qteTeddies.id);
    return(qteTeddies[id])
}

//NOMBRE D'ARTICLES DANS LE PANIER
function nombrePanier(){
    let produitSession1 = JSON.parse(localStorage.getItem('panierClient'));
    let produitSession2 = produitSession1.length;
        document.querySelector('#span_panier').textContent = produitSession2;  
}

// Récupération Formulaire
const getFormFirstName = document.getElementById("inputFirstName");
const getFormName = document.getElementById("inputName");
const getFormEmail = document.getElementById("inputEmail");
const getFormAdress1 = document.getElementById("inputAddress");
const getFormCity = document.getElementById("inputCity");
const getSubmitButton = document.getElementById("submitButton");

//Envoie des données du formulaire 
function sendToApi(){
    let contact = 
    {
        firstName: getFormFirstName.value,
        lastName: getFormName.value,
        address: getFormAdress1.value,
        city : getFormCity.value,
        email: getFormEmail.value,
    }
    let products=JSON.parse(localStorage.getItem("panierClient"));

    let body = {contact, products} //Objet avec tous les éléments

    fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body) 
    })
   .then(response => response.json())
    .then((response) => {
     console.log(response)
     localStorage.setItem("orderConfirmation", JSON.stringify(response)); //Envoi la réponse de l'api dans le locastorage
     window.location="./confirmation.html" //Renvoi à la page confirmation de commande
     })
      .catch(function(error) {
        alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      });
 }
 