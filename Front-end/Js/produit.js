const idDuProduit = getArticleId();
const urlProduit = "http://localhost:3000/api/teddies".concat('/', idDuProduit);
let panier = localStorage.getItem("panierClient");

function getArticleId(){
    return new URL(location.href).searchParams.get("id");
}

function getArticle(){
    return fetch(urlProduit)
    .then(function(reponse) {
       if (reponse.ok) {
       return reponse.json();
       }
   })
   .then(function(data) {
       //AJOUT AU PANIER
       bouton.addEventListener('click', () => {
        let initPanier = JSON.parse(localStorage.getItem("panierClient"));

      
        let idPanier = JSON.parse(localStorage.getItem(data._id))
        //Vérifier si le panier existe déjà
        if(localStorage.getItem('panierClient')){
            //Pousser les éléments dans le tableau initPanier qui comprend tous les produits
            initPanier.push(data._id);
            localStorage.setItem("panierClient", JSON.stringify(initPanier));

            /*
            let id = localStorage.getItem(data._id);
            id++;
            localStorage.setItem(data._id, id)
          */
          
        //Si il n'existe pas, initialisation du panier
        }else{
            //Tableau qui comprendra tous les objets
            let initPanier = [];
            localStorage.setItem("panierClient", JSON.stringify(initPanier));
        }
       })
       
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
       
   })
   .catch(function(err) {
       // Une erreur est survenue
   });
}

getArticle(idDuProduit);


//NOMBRE D'AJOUT AU PANIER
let bouton = document.querySelector('#ajout_panier');

bouton.addEventListener('click', () => {
    nombrePanier();
})
function nombrePanier(produit){
    
    let produitSession = localStorage.getItem('nombrePanier');
    localStorage.setItem('nombrePanier', 1);
    produitSession = parseInt(produitSession);
    
    if(produitSession){
        localStorage.setItem('nombrePanier', produitSession + 1);
        document.querySelector('#span_panier').textContent = produitSession + 1;
    }else{
        localStorage.setItem('nombreProduits', 1);
        document.querySelector('#span_panier').textContent= 1;
    } 
  
}
//Empecher la réiniatialisation du nombre de pdts dans le panier au chargement
function auChargement(){
    let produitSession = localStorage.getItem('nombrePanier');

    if(produitSession){
        document.querySelector('#span_panier').textContent = produitSession;
        
    }
}
auChargement();