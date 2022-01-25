
//Récupéreation des paramètre de l'url.
var str = window.location.href;
var url = new URL(str);
var orderId = url.searchParams.get("id");
idConfirm()

function idConfirm(){
   const confirm = document.getElementById("orderId");
   confirm.innerHTML = orderId;
    //Vider le panier => localStorage.clear()
     localStorage.clear();
}





   

 