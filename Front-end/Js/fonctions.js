//Connexion base de données
function fetchApi (){
    fetch("http://localhost:3000/api/teddies")
    .then(function(reponse) {
        if (reponse.ok) {
        return reponse.json();
        }
    })
    .then(function(data) {
        let containerPanier = document.getElementById("container_panier");
                containerPanier.innerHTML = ``
    console.log(data)
        afficheLePanier(data);
        auChargement2();
        
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
                //APPEL DE LA FONCTION COUNT
                //countTeddies(teddy._id);

                //APPEL DE LA FONCTION affichePanier()
                let containerPanier = document.getElementById("container_panier");
                containerPanier.innerHTML += `
                <tr class="table-light"> 
                <td> <button class="remove btn btn-danger" id="${teddy._id}" type="button"><i class="fas fa-minus-circle"></i></button></td>
                    <td>Ours : ${teddy.name} </td>
                    <td>Quantité : <input type="number" value="${countTeddies(teddy._id)}" id="listenQte" onClick="changed();"></input></td>
                    <td>${(teddy.price/100)*countTeddies(teddy._id)}€</td>
                </tr>
            `
           
            }
            changed()
            remove()
           
        }
}
//Modification dynamique de la quantité dans le panier
function changed(){
    
}




//Suppression des éléments au clic
function remove(){
    let boutonRemove = document.querySelectorAll('.remove');
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
    boutonRemove.forEach(element => {
        element.addEventListener('click', () => {
            let teddyid = element.getAttribute("id");
            console.log(teddyid);
                let filtre = monPanier.filter(item => item != teddyid);
              
                localStorage.setItem('panierClient', JSON.stringify(filtre))
                console.log(filtre);
                fetchApi();
        })
    });
}


//Compter le nombre d'id d'un element
function countTeddies(id){
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));

    let qteTeddies = {};
    for(let i=0; i<monPanier.length; i++){
        let iteration = monPanier[i];
        qteTeddies[iteration] = qteTeddies[iteration] ? qteTeddies[iteration] +1 :1;
    }
    //return(qteTeddies.id);
    return(qteTeddies[id])
}


function auChargement2(){
    let produitSession1 = JSON.parse(localStorage.getItem('panierClient'));
    let produitSession2 = produitSession1.length;
        document.querySelector('#span_panier').textContent = produitSession2;  
}


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
