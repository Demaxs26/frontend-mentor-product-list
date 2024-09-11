//fetch and constantes
const reponse = await fetch("data.json");
const data = await reponse.json();
const paymentPlace = document.querySelector(".nav-empty");
const navFooter = document.querySelector("#footer");

// this array will host  product ordered to facilitate the gestion
let productOrdered = [];
let nbOfProductOrdered =[] 
confirmCommand();
for(let i =0;i<data.length;i++){
    nbOfProductOrdered.push(0);
}


// this function add the 0 needful to have exatly three number in the price
export function displayCorrectPrice(price){
    price = price.toString();// convert the number to string
    if (price.includes(".")){  // verify if the price is a float or an integer
        if (price.length >= 3){  // if yes add one 0 if he dont have three number
            price = price + "0";
            return price;
        }
    }else if (price.length < 4){
        price = price + ".00";
        return price;
    }
    return price;
}
function f_generate_payment_place(remove,add){

    //change the display of these div if the user have order or not
    navFooter.querySelector(remove).style.display = "none";
    navFooter.querySelector(add).style.display = "flex";

}

function  f_displayAllOrder(){
    const placeToDisplay  = document.querySelector(".orderDisplay");
    console.log(productOrdered);
    let cardOrder = "";
    let totPrice = 0;
    for(let i = 0; i<productOrdered.length;i++){
        console.log('ok');
        totPrice =totPrice+ data[productOrdered[i]].price * nbOfProductOrdered[productOrdered[i]];
        cardOrder += `
            <div class = "cardsRewiewOrder">
                <div class ="separation">
                    <img src = ${data[productOrdered[i]].image.thumbnail} class ="thumbnail-product" alt = "thumbnail product">
                    <div class ="description-product">
                        <p class ="order-name">${data[productOrdered[i]].name}</p>
                        <div class ="price-place">
                            <p class ="nb-of-commands">${nbOfProductOrdered[productOrdered[i]]}x<p class ="item-price">@${displayCorrectPrice(data[productOrdered[i]].price)}</p></p>
                        </div>
                        </div>
                </div>
                <h3 class ="OrderPrice">$${displayCorrectPrice((data[productOrdered[i]].price)*nbOfProductOrdered[productOrdered[i]])}</h3>
            </div>
            `;
        
    }
    cardOrder += `    <div class ="final-price">
                        <p>Order Total</p>
                        <h2>$${displayCorrectPrice(totPrice)}</h2>
                      </div>
    `;
    placeToDisplay.innerHTML = cardOrder; 
}

function confirmCommand(){
    const confirmedOrdeDisplay = document.querySelector(".OrderConfirmationDisplay");
    const btnConfirmCommand = document.querySelector(".command-btn");
    const btnNewCommand = document.querySelector(".btn-new-command");
    btnConfirmCommand.addEventListener("click", function(){
        confirmedOrdeDisplay.style.display = "flex";
        f_displayAllOrder();
        cutAllListener();
    })

    btnNewCommand.addEventListener("click", function(){
        functionResetCommmand();
    })
}


function functionResetCommmand(){
    const placeToDisplay  = document.querySelectorAll(".order");
    for (let i = 0; i<productOrdered.length;i++){
        const nbOrder = productOrdered.findIndex((element) => element === i);
        paymentPlace.removeChild(placeToDisplay[i]);
        f_un_order_product(productOrdered[i],false);
        nbOfProductOrdered[productOrdered[i]] = 0;
    }
    productOrdered = [];
    
    const confirmedOrdeDisplay = document.querySelector(".OrderConfirmationDisplay");
    
    confirmedOrdeDisplay.style.display ="none";
    f_generate_payment_place(".finalise-command",".text-no-order");
    ajoutNewOrder();
    confirmCommand();
    


}

function f_un_order_product(i,choice){
    // function to switch betwen order btn and in/decrease button on the product cards
    // it take the parameter "i" to now the numero of the card
    // and the parameter "choice" to determine if it should display the order btn or the other one
    const btnBuyElement = document.getElementsByClassName("order-buton")[i];
    const btnChooseNb = document.getElementsByClassName("nb-order-switch-buton")[i];
    const imgProduct = document.getElementsByClassName("image-product")[i];

    if (choice){

        btnBuyElement.style.display = "none";
        btnChooseNb.style.display = "flex";
        imgProduct.style.border = "var(--basic-red) 2px solid";

    }else{
        btnBuyElement.style.display = "flex";
        btnChooseNb.style.display = "none";
        imgProduct.style.border = "unset";
        
    }

    


}




function removeOrder(i){
    //function is called to remove an order 
    // first we found the place of the order on the page using the list who have the same disposition
    // we search the parameter "i" in the list and get his placement in it
    const nbOrder = productOrdered.findIndex((element) => element === i);
    // we remove it from the list
    productOrdered.splice(nbOrder,1);
    // we search the order in the DOM 
    const orderToremove = paymentPlace.getElementsByClassName("order")[nbOrder];
    //we remove it
    paymentPlace.removeChild(orderToremove);
    cut_listener(i);
    // we call this function to switch the btn on the card of this product
    f_un_order_product(i,false);
    // we update the nb of order
    add_remove_item_cart();
    nbOfProductOrdered[i] = 0;
    updateNbOfItems(i);
    // chck if the user always get any order 
    if (productOrdered.length === 0){
        f_generate_payment_place(".finalise-command",".text-no-order");
    }
}

function know_if_removeOrder(i){
    // this funtion check if the user remove an  order from his cart
    const nbOrder = productOrdered.findIndex((element) => element === i);
    console.log(nbOrder);
    const  btnRemoveOrder = document.getElementsByClassName("icon-remove")[nbOrder];
    btnRemoveOrder.addEventListener("click", function(){
        removeOrder(i);
    })
}

function add_remove_item_cart(){
    // this function update the number of order displayed on the cart
    const nbItems = document.querySelector(".section-panier h2 span");
    nbItems.textContent = `(${productOrdered.length})`;
}



function cut_listener(i){
    // to prevent some bug these to listener put on the button for increase and decrease the number of itmes
    const btnAddMoreItem = document.querySelectorAll("#box-product-grid .box-product .box-image-product .order-place .nb-order-switch-buton .btn-add")[i];
    const btnlessItem = document.querySelectorAll("#box-product-grid .box-product .box-image-product .order-place .nb-order-switch-buton .btn-remove-one")[i];
    btnAddMoreItem.replaceWith(btnAddMoreItem.cloneNode(true)); // use replaceWith to kill the listener outsid of the listener
    btnlessItem.replaceWith(btnlessItem.cloneNode(true));

}

function cutAllListener(){
    const btnBuyElement = document.querySelectorAll("#box-product-grid .box-product .box-image-product .order-place .order-buton");
    const btnConfirmCommand = document.querySelector(".command-btn");
    console.log(btnBuyElement);
    for (let i = 0;i<data.length;i++){
        btnBuyElement[i].replaceWith(btnBuyElement[i].cloneNode(true));
        cut_listener(i);

    }
    for (let j = 0;j<productOrdered.length;j++){
        const  btnRemoveOrder = document.getElementsByClassName("icon-remove")[j];
        btnRemoveOrder.replaceWith(btnRemoveOrder.cloneNode(true));
    }
    btnConfirmCommand.replaceWith(btnConfirmCommand.cloneNode(true));

}


function updateNbOfItems(i){
    // function who update all the text relativ to the order price 
    const nbOrder = productOrdered.findIndex((element) => element === i);
    const nbOfItems = document.querySelectorAll("#box-product-grid .box-product .box-image-product .order-place .nb-order-switch-buton p")[i];
    nbOfItems.textContent = nbOfProductOrdered[i];
    const  nbOfItemsNav = document.getElementsByClassName("nb-of-commands")[nbOrder];
    nbOfItemsNav.textContent = nbOfProductOrdered[i] +"x";
    const  pricOfOrder = document.getElementsByClassName("order-price")[nbOrder];
    pricOfOrder.textContent ="$" + displayCorrectPrice((nbOfProductOrdered[i])*data[i].price) ;
    const FinalPrice = document.querySelector(".final-price h2");
    let calcFinalprice = 0;
    for (let i =0; i<data.length;i++){
        if(nbOfProductOrdered[i] > 0){
            calcFinalprice += (nbOfProductOrdered[i])*data[i].price;
        }
    }
    FinalPrice.textContent = "$" + displayCorrectPrice(calcFinalprice);
}



function less_more_same_item(i){
    // function who create the button to in/decrease the number of items in an order
    const btnAddMoreItem = document.querySelectorAll("#box-product-grid .box-product .box-image-product .order-place .nb-order-switch-buton .btn-add")[i];
    btnAddMoreItem.addEventListener("click", function ano1(){
        nbOfProductOrdered[i]++;
        console.log(nbOfProductOrdered);
        updateNbOfItems(i);
    });
    const btnlessItem = document.querySelectorAll("#box-product-grid .box-product .box-image-product .order-place .nb-order-switch-buton .btn-remove-one")[i];
    btnlessItem.addEventListener("click", function ano2(){

        if (nbOfProductOrdered[i] === 1){ // if user decrease the number to much : the order as to be removed
            removeOrder(i); 
            cut_listener(i);
        }else{
            nbOfProductOrdered[i]--;
            console.log(nbOfProductOrdered);
            updateNbOfItems(i);
        }
    });
}




export function ajoutNewOrder(){
    // this function is called when all the card are generated
        // for each one (selected on "btnBuyElement") it's see if the user click on it
    const btnBuyElement = document.querySelectorAll("#box-product-grid .box-product .box-image-product .order-place .order-buton");
    console.log(btnBuyElement)

    for (let i = 0; i<data.length;i++){
        btnBuyElement[i].addEventListener("click", function(){

            //when the user click  on the btn to add of one of the product 
            //it verify if the product isn't already ordered
            if (!productOrdered.includes(i)){
                // if no we create the card of the order
                f_generate_payment_place(".text-no-order",".finalise-command");
                const orderElement = document.createElement("div");
                orderElement.classList.add("order");
                orderElement.innerHTML += `
                        <div class ="order-details">
                            <p class ="order-name">${data[i].name}</p>
                            <div class ="price-place">
                                <p class ="nb-of-commands">1x</p><p class = "item-price">$${displayCorrectPrice(data[i].price)}</p> <p class ="order-price">$${displayCorrectPrice(data[i].price)}</p>
                            </div>
                        </div>
                        <img src ="assets/images/icon-remove-item.svg" alt =  "icon remove item" class ="icon-remove">
                `;
                // then we add it to the place with these card
                paymentPlace.appendChild(orderElement);
                // we use the function below to switch the style of the btn on the ordered product card 
                f_un_order_product(i,true);
                // we add to the list of order this order
                productOrdered.push(i);
                console.log(productOrdered);
                nbOfProductOrdered[i] += 1;
                //we update the number of order (in red on the top left)
                add_remove_item_cart();
                //we call the function below to detect if the user increase or decrease the number of this product to order
                less_more_same_item(i);
                //the function below will catch if the user unorder the product 
                know_if_removeOrder(i);
                updateNbOfItems(i);
            }
        })

    }
}

