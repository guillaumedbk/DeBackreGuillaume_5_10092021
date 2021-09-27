//Connexion base de données
function fetchApi (){
    fetch("http://localhost:3000/api/teddies")
    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })
    .then(function(data) {
    console.log(data)
        afficheLePanier(data);
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
    }
    
fetchApi();

function afficheLePanier(data){
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
        for (let teddy of data) {
                    
            if(monPanier.includes(teddy._id)){
                //APPELER LA FONCTION affichePanier()
                let containerPanier = document.getElementById("container_panier");
                containerPanier.innerHTML += `
                <tr class="table-light"> 
                    <td> <button class="remove btn btn-danger" type="button"><i class="fas fa-minus-circle"></i></button></td>
                    <td>Ours : ${teddy.name} </td>
                    <td></td>
                    <td>${teddy.price/100}€</td>
                </tr>
            `
            }
        }

}
/*
//Compter le nombre d'id d'un element
function countTeddies(idDuPanier){
    for (ids of monPanier){
        
    }
}
*/



//Empecher la réiniatialisation du nombre de pdts dans le panier au chargement
function auChargement(){
    let produitSession = localStorage.getItem('nombrePanier');
    if(produitSession){
        document.querySelector('#span_panier').textContent = produitSession;  
    }
}
auChargement();


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
