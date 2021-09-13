fetch("http://localhost:3000/api/teddies")
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
    })
    .catch(function(err) {
        // Une erreur est survenue
    });

let description_card= document.getElementById("description");
let titre_card= document.getElementById("titre");
let image=document.getElementById('image_card')

fetch("http://localhost:3000/api/teddies/5be9c8541c9d440000665243")
    .then(reponse => reponse.json())
    .then(data => {
        description_card.textContent=data.description;
        titre_card.textContent=data.name;
        image.src=data.imageUrl;
    }
        
        )
    
