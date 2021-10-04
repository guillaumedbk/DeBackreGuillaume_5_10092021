//ID DU PRODUIT
const idDuProduit = getArticleId();
//URL AVEC L'ID DU PRODUIT EN QUESTION
const urlProduit = "http://localhost:3000/api/teddies".concat('/', idDuProduit);
let panier = localStorage.getItem("panierClient");

//Récupérer l'id de l'article
function getArticleId(){
    return new URL(location.href).searchParams.get("id");
}
getArticle(idDuProduit);
//Fonction principale qui fetch et affiche les produits
function getArticle(){
    return fetch(urlProduit) 
    .then(function(reponse) {
       if (reponse.ok) {
       return reponse.json();
       }
   })
   .then(function(data) {
       //Affichage du contenu de la page produit
       afficheProduit(data) 
       //Affichage du span panier avec le nombre d'article dans le panier
       nombrePanier();
       //Ajout au panier au clic 
       bouton.addEventListener('click', () => {
        ajoutPanier(data)
        nombrePanier();
       })   
   })
   .catch(function(err) {
       // Une erreur est survenue
   });
}

//NOMBRE D'ARTICLE DANS LE PANIER
let bouton = document.querySelector('#ajout_panier');
function nombrePanier(){
    let produitSession1 = JSON.parse(localStorage.getItem('panierClient'));
    let produitSession2 = produitSession1.length;
        document.querySelector('#span_panier').textContent = produitSession2;  
}

//AJOUT AU PANIER
function ajoutPanier(data){
        let initPanier = JSON.parse(localStorage.getItem("panierClient"));
        
        let idPanier = JSON.parse(localStorage.getItem(data._id))
        //Vérifier si le panier existe déjà
        if(localStorage.getItem('panierClient')){
            //Pousser les éléments dans le tableau initPanier qui comprend tous les produits
            initPanier.push(data._id);
            localStorage.setItem("panierClient", JSON.stringify(initPanier));
    
        //Si il n'existe pas, initialisation du panier
        }else{
            //Tableau qui comprendra tous les objets
            let initPanier = [];
            initPanier.push(data._id);
            localStorage.setItem("panierClient", JSON.stringify(initPanier));
        }
    }
//AFFICHAGE DES DONNEES DANS LA PAGE PRODUIT 
function afficheProduit(data){
    let nomProduit = data.name;
    let descriptionProduit = data.description;
    let imageProduit = data.imageUrl;
    let prixProduit = data.price;
    
    let titre = document.getElementById('titre').textContent= "Salut, moi c'est " .concat(nomProduit, " !");
    let titreProduit = document.getElementById('nomProduit').textContent= nomProduit;
    let description = document.getElementById('description').textContent= descriptionProduit;
    let image = document.getElementById('image').src= imageProduit;
    let prix = document.getElementById('prix').textContent= "".concat(prixProduit/100, "€");

     for(let colori of data.colors){
         document.getElementById('listeUl').innerHTML += ` <li>${colori}</li>  `
        }
}