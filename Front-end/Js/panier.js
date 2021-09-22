//Ecouter le clic pour l'ajout au panier
let bouton = document.querySelector('#ajout_panier');

bouton.addEventListener('click', () => {
    nombrePanier();
    
})

//Nombre de produits dans le panier
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

//Récupération des données du panier
