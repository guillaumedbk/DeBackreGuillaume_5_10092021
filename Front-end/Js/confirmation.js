let confirmation = JSON.parse(localStorage.getItem('orderConfirmation'))
console.log(confirmation)

let products= JSON.parse(localStorage.getItem('panierClient'))
let i=0;
products.forEach(element => {
    i++;
});

let orderId= confirmation.orderId;
let nom= confirmation.contact.lastName;
let prenom= confirmation.contact.firstName;
let adresse= confirmation.contact.address;
let ville= confirmation.contact.city;


let recap = document.getElementById('recapitulatif').innerHTML=`
<p>Votre numéro de commande : ${orderId}
</br>Nombre d'articles commandés : ${i}
</br>Le colis sera bien envoyé à ${nom} ${prenom}
</br>À l'adresse suivante : ${adresse} à ${ville} </p>
`

//Nombre de produit dans le panier
function auChargement2(){
    let produitSession1 = JSON.parse(localStorage.getItem('panierClient'));
    let produitSession2 = produitSession1.length;
        document.querySelector('#span_panier').textContent = produitSession2;  
}
auChargement2();


