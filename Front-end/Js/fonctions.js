function ajoutPanier(){
    let initPanier = JSON.parse(localStorage.getItem("panierClient"));
        if(localStorage.getItem('panierClient')){
            console.log("Le panier existe");
            initPanier.push(data_id);
            localStorage.setItem("panierClient", JSON.stringify(initPanier));
        }else{
            console.log("initialisation du panier")
            let initPanier = [];
            localStorage.setItem("panierClient", JSON.stringify(initPanier));
        }
}


 /*
//Récupération des produits du panier pour afficher
let monPanier = JSON.parse(localStorage.getItem("panierClient"));
console.log(monPanier)

let articlesNorbert='5be9c8541c9d440000665243';
let articlesArnold='5beaa8bf1c9d440000a57d94';
let articlesLenny='5beaaa8f1c9d440000a57d95';
let articlesGustav= '5beaabe91c9d440000a57d96';
let articlesGarfunkel='5beaacd41c9d440000a57d97';

let lesArticlesNorbert=0;
let lesArticlesArnold=0;
let lesArticlesLenny=0;
let lesArticlesGustav=0;
let lesArticlesGarfunkel=0;

fetch("http://localhost:3000/api/teddies")
    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })
    .then(function(data) {

        for (produits of monPanier){
            console.log(produits)
            if(produits == articlesNorbert){
                lesArticlesNorbert++;
            }
            if(produits == articlesArnold){
                lesArticlesArnold++;
            }
            if(produits == articlesLenny){
                lesArticlesLenny++;
            }
            if(produits == articlesGustav){
                lesArticlesGustav++;
            }
            if(produits == articlesGarfunkel){
                lesArticlesGarfunkel++;
            }
        }
    });   
   */
   
