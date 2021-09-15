
//Connexion à l'API
fetch("http://localhost:3000/api/teddies")
    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })
    .then(function(data) {
        console.log(data);
        //For pour chaque élément du tableau
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
                        <a href="#" ><img class="card-img-top" id="imageCard" src="${imageProduit}" alt=""></a>
                            <div class="card-body">
                                <h4 class="card-title">
                                    <a href="#" id="titre">${nomProduit}</a>
                                </h4>
                                <p class="card-text description" id="description">${descriptionProduit}</p>
                                <p class="card-text price" id="price">${prixProduit}€</p>
                                <button type="button" class="btn btn-primary">Ajouter au panier</button>
                            </div>
                    </div>
                    </div>
                `
        });

    })
    .catch(function(err) {
        // Une erreur est survenue
    });

//Direction vers la page produit
//Faire passer l'id du produit dans l'url 


  

