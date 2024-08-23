document.addEventListener("DOMContentLoaded", () => {
    let targetId = new URL(document.location.toString()).searchParams.get("id"),
    cardTitle = document.getElementById("cardTitle"),
    cardText = document.getElementById("cardText"),
    cardImg = document.getElementById("cardImg");

    fetch("../php/getItemById.php" , {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

          method: "POST",
          
          body: JSON.stringify({id:targetId})

    }).then((r) => r.json()).then((r) => {

            cardImg.setAttribute("src", r[0].img);
            cardTitle.innerText = r[0].name;
            cardText.innerText = r[0].description;

        });

});