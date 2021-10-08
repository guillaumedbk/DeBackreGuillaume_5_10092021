//Connexion à l'API
function fetchApi(){
    fetch("http://localhost:3000/api/teddies")
    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })
    .then(function(data) {
        console.log(data);
        //Nombre d'articles dans le panier
         nombrePanier()
        //For pour chaque élément du tableau
        affichageDesCards(data)
    })
    .catch(function(err) {
        console.log('Une erreur est survenue') 
        console.log(err)
    });
}
fetchApi();

//NOMBRE D'ARTICLES DANS LE PANIER
function nombrePanier(){
    let produitSession1 = JSON.parse(localStorage.getItem('panierClient'));
    if(!produitSession1){
        console.log("votre panier est vide");
        document.querySelector('#span_panier').textContent =0; 
    }else{
        let produitSession2 = produitSession1.length;
        document.querySelector('#span_panier').textContent = produitSession2;  
    } 
}

//For pour chaque élément du tableau
function affichageDesCards(data){
    data.forEach(element => {
        let nomProduit = element.name;
        let imageProduit = element.imageUrl;
        let descriptionProduit = element.description;
        let prixProduit = (element.price)/100;
        let idDuProduit = element._id;
        //Insertion des Cards dans le DOM
        let container = document.getElementById('row');
                container.innerHTML += `
                <div class="col-lg-4 col-sm-6 mb-4">       
                <div class="card h-100">
                    <a href="http://127.0.0.1:5500/Front-end/Html/produit.html?id=${idDuProduit}" ><img class="card-img-top" id="imageCard" src="${imageProduit}" alt=""></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                ${nomProduit}
                            </h4>
                            <p class="card-text description" id="description">${descriptionProduit}</p>
                            <p class="card-text price" id="price">${prixProduit}€</p>
                            
                        </div>
                </div>
                </div>
            `
    });
}

