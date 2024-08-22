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

            headder.classList.add("card-title");
            headder.innerText = item.name;

            descr.classList.add("card-text", "overflow-auto", "p-2");
            descr.style.maxHeight ="100px"
            descr.innerText = item.description;

            btn.classList.add("btn", "btn-primary");
            btn.innerText ="Добавить в корзину";

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

    function filterItems(){
        let 
        itemColumns = document.getElementsByClassName("itemColumns");

        // console.log(itemColumns);
        Array.from(itemColumns).forEach((col) => {
            console.log(col.dataset.type.toLowerCase() != typeSelector.value.toLowerCase());
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

    fetch('php/getItems.php').then((r) => r.json()).then((r) =>  constructItems(r));

    searchBar.addEventListener("input", ()=>{
        filterItems();
    });
    typeSelector.addEventListener("input", () => {
        filterItems();
    });
});