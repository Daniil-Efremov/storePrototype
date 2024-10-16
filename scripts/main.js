document.addEventListener("DOMContentLoaded", () => {
    let
    searchBar = document.getElementById("searchBar"),
    typeSelector = document.getElementById("typeSelector"),
    mainRow = document.getElementById("mainRow");

    function addCategories(categories){
        categories.forEach((type) =>{
            let
            option = document.createElement('option');

            option.setAttribute('value', type.type);
            option.innerText = type.type;

            typeSelector.append(option);
        })
    };

    function constructItems(itemList){
        itemList.forEach((item) => {
            let
            col = document.createElement('div'),
            card = document.createElement('div'),
            img = document.createElement('img'),
            cardBody = document.createElement('div'),
            headder = document.createElement('h5'),
            headderLink = document.createElement('a'),
            descr = document.createElement('p'),
            btn = document.createElement('a'),
            cardFooter = document.createElement('div');

            col.classList.add("col-lg-3", "col-md-6", "col-sm-12", "itemColumns");
            col.setAttribute("data-id", item.id);
            col.setAttribute("data-name", item.name);
            col.setAttribute("data-type", item.type);
            col.setAttribute("data-price", item.price);

            card.classList.add("card", "h-100", "w-100");
           
            img.classList.add("card-img-top");
            img.setAttribute('src', item.img);
            img.style.width ="100%";

            cardBody.classList.add("card-body");

            let link = new URL("pages/item.html", document.location);
            link.searchParams.append("id",item.id);
            headderLink.setAttribute('href', link.href);
            headderLink.classList.add("text-decoration-none");
            headderLink.innerText = item.name

            headder.classList.add("card-title");
            headder.appendChild(headderLink);

            descr.classList.add("card-text", "overflow-auto");
            descr.style.maxHeight ="40px"
            descr.innerText = "Цена в р. :" + item.price;

            btn.classList.add("btn", "btn-primary");
            btn.setAttribute('data-itemId', item.id);
            btn.addEventListener("click", (e)=>{
                addCartStorage(item);
                cartUpdate(itemList);
            });
            btn.innerText = "Добавить в корзину";

            cardFooter.classList.add("card-footer");

            cardBody.appendChild(headder);
            cardBody.appendChild(descr);
            cardFooter.appendChild(btn);
            card.appendChild(img);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);
            col.appendChild(card);
            mainRow.appendChild(col);   
               
        })
    };

    function addCartStorage(item){

        if(!localStorage.getItem('cart')){
            let cart = [];
            cart.push({id:parseInt(item.id), amount:1})
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            let cart = JSON.parse(localStorage.getItem('cart'));
            if( cart.findIndex((cartItem) => cartItem.id == item.id) >= 0){
                cart[cart.findIndex((cartItem) => cartItem.id == item.id)].amount++;
                localStorage.setItem('cart', JSON.stringify(cart));
         }else{
            cart.push({id:parseInt(item.id), amount:1});
            localStorage.setItem('cart', JSON.stringify(cart));
         }
        }
        
    };
    
    function decCartStorage(targetId){

        let 
        cart = JSON.parse(localStorage.getItem('cart'));
        let
        id = cart.findIndex((item)=> item.id == targetId);
        console.log(targetId);
        // console.log(cart);
        if(cart[id].amount > 1){
            cart[id].amount--;
        }else{
            cart.splice(id, 1);
        };
        

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    function cartUpdate(mainItems){
        let 
        cartData = JSON.parse(localStorage.getItem('cart')),
        cartModal = document.getElementById("cart"),
        cartTotalContainer = document.getElementById("cartTotal"),
        cartTotal = 0;


        cartModal.innerHTML = "";

        cartData.forEach((cartEntry)=>{
            let
                cartItem = document.createElement('div'),
                cartItemInfo = document.createElement('div'),
                cartItemBtn = document.createElement('div'),
                cartItemName = document.createElement('div'),
                cartItemPrice = document.createElement('div'),
                cartItemAmount = document.createElement('div'),
                cartItemTotal = document.createElement('div'),
                cartItemAdd = document.createElement('img'),
                cartItemDec = document.createElement('img'),
                id = mainItems.findIndex((element)=>element.id.toString() == cartEntry.id.toString());
                
            cartItemAdd.setAttribute('data-itemId', cartEntry.id.toString());
            cartItemAdd.classList.add("cart-icon", "m-1");
            cartItemAdd.setAttribute("src","bag-plus-fill.svg");
            cartItemAdd.addEventListener("click", (e) =>{
                addCartStorage(mainItems[id]);
                cartUpdate(mainItems);
            });

            cartItemDec.setAttribute('data-itemId', cartEntry.id.toString());
            cartItemDec.classList.add("cart-icon", "m-1");
            cartItemDec.setAttribute("src","bag-dash-fill.svg");
            cartItemDec.addEventListener("click", (e) =>{
                decCartStorage(cartEntry.id);
                cartUpdate(mainItems);
            });

            cartItemBtn.classList.add("cart-item-btn","col-2", "d-flex", "justify-content-center", "flex-column", "flex-sm-row",);

            cartItemName.innerText = mainItems[id].name;
            cartItemName.classList.add("cart-item-name", "m-1","col-3");

            cartItemPrice.innerText = "Стоимость: " + mainItems[id].price + "р";
            cartItemPrice.classList.add("cart-item-price", "m-1","col-3");
            
            cartItemAmount.innerText = "Кол-во: " + cartEntry.amount;
            cartItemAmount.classList.add("cart-item-amount", "m-1" ,"col-3");

            cartItemTotal.innerText = "= " + mainItems[id].price * cartEntry.amount + "р";
            cartItemTotal.classList.add("cart-item-total", "m-1","col-3");
            cartTotal += mainItems[id].price * cartEntry.amount;
            
            cartItemInfo.classList.add("cart-item-info", "d-flex", "justify-content-between", "col-10");

            cartItem.classList.add("cart-item-wrapper", "cart-modal-font", "d-flex", "justify-content-between", "container-fluid", "m-0", "border-bottom", "border-dark");

            

            cartItemInfo.appendChild(cartItemName);
            cartItemInfo.appendChild(cartItemPrice);
            cartItemInfo.appendChild(cartItemAmount);
            cartItemInfo.appendChild(cartItemTotal);

            cartItemBtn.appendChild(cartItemAdd);
            cartItemBtn.appendChild(cartItemDec);

            cartItem.appendChild(cartItemInfo);
            cartItem.appendChild(cartItemBtn);

            cartModal.appendChild(cartItem);
            // cartItemName.innerText = mainItems[id].name;
            // cartModal.appendChild(cartItemName);

        });
        cartTotalContainer.innerText = "Вего: " + cartTotal; 

    };

    function filterItems(){
        let 
        itemColumns = document.getElementsByClassName("itemColumns");

        Array.from(itemColumns).forEach((col) => {
            col.classList.remove("visually-hidden");
            if(searchBar.value != ""){
                if(!col.dataset.name.toLowerCase().includes(searchBar.value.toLowerCase())){
                    col.classList.add("visually-hidden");
                }
            }
            if(typeSelector.value != ""){
                if(col.dataset.type.toLowerCase() != typeSelector.value.toLowerCase()){
                    col.classList.add("visually-hidden");
                }
            }
        });

    };

    fetch('php/getCategories.php').then((r) => r.json()).then((r) => addCategories(r));

    fetch('php/getItems.php').then((r) => r.json()).then((itemsList) =>  {
        constructItems(itemsList);
        cartUpdate(itemsList);
    });

    searchBar.addEventListener("input", ()=>{
        filterItems();
    });
    typeSelector.addEventListener("input", () => {
        filterItems();
    });
});