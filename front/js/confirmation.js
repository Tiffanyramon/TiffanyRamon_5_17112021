//Récupéreation des paramètre de l'url.
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct)

//création de numero de commande unique avec fonction et méthode Math.floor
 function generate() {
         let id = () => {
           return Math.floor((1 + Math.random()) * 0x10000000)
               .toString(16)
               .substring(1);
         }
         
           document.getElementById("orderId").innerHTML = id();
         }
 // Vider le panier => localStorage.clear()
            localStorage.clear();