//Récupéreation des paramètre de l'url.
//function idConfirm(confirm){
  //   confirm = document.getElementById("res.orderId");
   //  confirm.innerHTML = localStorage.getItem("res.orderId");
   //  console.log(localStorage.getItem("res.orderId"))
     // Vider le panier => localStorage.clear()
   //  localStorage.clear();
//}

 // Récupération des paramètre de l'URL.
fetch("http://localhost:3000/api/produtc/order")
    .then (function(res){
      return res.json();
    })

function data(confirm){
  confirm = document.getElementById('orderId');
  confirm.innerText = localStorage.getItem('orderId');
//Vider le panier
localStorage.cleat();


}

   
//Confirmation avec le numéro de commande a usage unique.
  //const popUpConfirm = () => {
  //  if(window.confirm(`Commande validée ! Votre numéro de commande est : ${id="orderId"} `)){
     //     window.location.href = "confirmation.htlm";
    //  }
   //} 

 