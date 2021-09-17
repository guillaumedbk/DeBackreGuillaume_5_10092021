const idDuProduit = getArticleId();
const urlProduit = "http://localhost:3000/api/teddies".concat('/', idDuProduit);

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
       console.log(data);

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

