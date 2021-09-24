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


//////////////METTRE DANS UNE FONCTION/////////////////
 
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




    //////////////AFFICHER LE RECAPITULATIF DE COMMANDE/////////////////
let containerPanier = document.getElementById('container_panier');
containerPanier.innerHTML += `
        <h1>Voici le récapitulatif de votre commande : </h1>

        <table>
            <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix</th>
            </tr>

            <tr> 
                <td>Ours Norbert : </td>
                <td>${lesArticlesNorbert} </td>
                <td>*${lesArticlesNorbert} </td>
            </tr>

        </table>

`

