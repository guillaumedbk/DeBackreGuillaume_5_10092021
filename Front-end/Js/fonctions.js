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
        calculatePrice(data);
        auChargement2();
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
    }
    
fetchApi();


function afficheLePanier(data){
    total=[];
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
                    <td>Quantité : <input type="number" id="${teddy._id}" value="${countTeddies(teddy._id)}" class="listenQte"></input></td>
                    <td>${(teddy.price/100)*countTeddies(teddy._id)}€</td>
                </tr>
                
            `
            }
            
            remove()
            
            changed3() 
        }
            
}
//Tableau vide pour stocker les prix
let total = [];

//Ajoute les prix de chaque élément du panier dans le tableau
function calculatePrice(data){
    
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
    for(ours of data){
        for(element of monPanier){
            if(ours._id == element){
                total.push(ours.price/100)
            }
        }
    }
   //Appel de la fonction pour afficher le prix total calculé par la fonction somme
    showPrice()
}

function showPrice(){
    //Affichage panier
    let totalPanier = document.getElementById('total_panier');
    totalPanier.innerHTML = `
            <tr class="table-success"> 
                        <td> Prix total:</td>
                        <td></td>
                        <td></td>
                        <td>${somme()}€</td>
            </tr>
        `
}
function somme(){
    let prix=0;
    for(el of total){
        prix+=el;
    }
    return(prix)
}


function changed3(){
    let inputQte = document.querySelectorAll('.listenQte'); 
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
   
    inputQte.forEach(element => {
        
        element.addEventListener('change', () =>{
            fetchApi()
        
            newQte = element.value;   
            let teddyid = element.getAttribute("id");
            let panierSansOursEnQuestion = monPanier.filter(el => el != teddyid);
              
            for(i=0;i<newQte;i++){
                panierSansOursEnQuestion.push(teddyid);
                
            }
            localStorage.setItem('panierClient', JSON.stringify(panierSansOursEnQuestion));
            
        })
    })
    console.log(monPanier)
}

//Suppression des éléments au clic
function remove(){
    let boutonRemove = document.querySelectorAll('.remove');
    let monPanier = JSON.parse(localStorage.getItem("panierClient"));
    boutonRemove.forEach(element => {
        element.addEventListener('click', () => {
            let teddyid = element.getAttribute("id");
                let filtre = monPanier.filter(item => item != teddyid);
              
                localStorage.setItem('panierClient', JSON.stringify(filtre))
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
/*
document.getElementById('confirmation').addEventListener('click', () => {
    let firstName = document.getElementById('firstName').value;
    let secondName = document.getElementById('secondName').value;
    let inputEmail = document.getElementById('inputEmail').value;
    let inputCity = document.getElementById('inputCity').value;
    let inputStreet = document.getElementById('inputStreet').value;

    let contact =
    {
        firstName: document.getElementById('firstName').value,
        secondName: document.getElementById('secondName').value,
        inputEmail: document.getElementById('inputEmail').value,
        inputCity: document.getElementById('inputCity').value,
        inputStreet: document.getElementById('inputStreet').value
    }
   
})
*/