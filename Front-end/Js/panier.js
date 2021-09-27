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
console.log(data)

        //Quantité de produits
        for (produits of monPanier){
        
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
        
        //////////////AFFICHER LE RECAPITULATIF DE COMMANDE/////////////////
        let containerPanier = document.getElementById('container_panier');
        let totalDuPanier = document.getElementById('total_panier');

    let totalNorbert = lesArticlesNorbert*29;
    let totalArnold = lesArticlesArnold*39;
    let totalLenny = lesArticlesLenny*59;
    let totalGustav = lesArticlesGustav*45;
    let totalGarfunkel = lesArticlesGarfunkel*55;

    let totalPanier =0;

        if(lesArticlesNorbert > 0){
            totalPanier += totalNorbert;
            containerPanier.innerHTML += `
         
            <tr class="table-light"> 
                <td> <button class="remove btn btn-danger" type="button"><i class="fas fa-minus-circle"></i></button></td>
                <td>Ours Norbert : </td>
                <td><input type="number">${lesArticlesNorbert}</input></td>
                <td>${totalNorbert}€</td>
            </tr>
           `
        
        }
        if(lesArticlesArnold > 0){
            totalPanier += totalArnold;
            containerPanier.innerHTML += `
           
           <tr class="table-light"> 
                <td> <button id="remove" class="remove btn btn-danger" type="button"><i class="fas fa-minus-circle"></i></button></td>
                <td>Ours Arnold : </td>
                <td><input type="number" value="${lesArticlesArnold}" class="changeArnold"></input></td>
                <td>${totalArnold}€</td>
            </tr>
           `
           
        }
        if(lesArticlesLenny > 0){
            totalPanier += totalLenny;
            containerPanier.innerHTML += `
           
           <tr class="table-light"> 
                <td> <button class="remove btn btn-danger" type="button"><i class="fas fa-minus-circle"></i></button></td>
                <td>Ours Lenny : </td>
                <td>${lesArticlesLenny} </td>
                <td>${totalLenny}€</td>
            </tr>
           `
        
        }
        if(lesArticlesGustav > 0){
            totalPanier += totalGustav;
            containerPanier.innerHTML += `
           
           <tr class="table-light"> 
                <td> <button class="remove btn btn-danger" type="button"><i class="fas fa-minus-circle"></i></button></td>
                <td>Ours Gustav : </td>
                <td>${lesArticlesGustav} </td>
                <td>${totalGustav}€</td>
            </tr>
           `
        }
        if(lesArticlesGarfunkel > 0){
            totalPanier += totalGarfunkel;
            containerPanier.innerHTML += `
           
           <tr class="table-light"> 
                <td> <button class="remove btn btn-danger" type="button"><i class="fas fa-minus-circle"></i></button></td>
                <td>Ours Garfunkel: </td>
                <td>${lesArticlesGarfunkel} </td>
                <td>${totalGarfunkel}€</td>
            </tr>
           `
        }
        totalDuPanier.innerHTML=`
        <tr class="table-success"> 
            <td></td>
            <td>Prix total : </td>
            <td></td>
            <td>${totalPanier}€</td>
        </tr>
        `
//let tableau = document.getElementById('container_panier');
//tableau.deleteRow(1);

function removeQte(){
    let boutonRemove = document.querySelector('.remove');
    let produitSession = localStorage.getItem('nombrePanier');
    console.log(produitSession);
    boutonRemove.addEventListener('click', () => {
        lesArticlesArnold-=1;
        produitSession-=1;
        console.log(produitSession);
        //Valeur de l'input
        let changeArnold = document.querySelector('.changeArnold');
        changeArnold.value = lesArticlesArnold;
        //Valeur de l'icone panier
        document.querySelector('#span_panier').textContent= produitSession;
        //Suprrimer un article en question du localstorage
        let panierStorage = localStorage.getItem('panierClient');
        
    })
}
removeQte();

    });   








