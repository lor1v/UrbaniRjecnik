const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector(".words-container")
const searchInput = document.querySelector("#search")

let words = [];
endpointDefault = "http://netwwork.duckdns.org:8080/words";

function searchfunction(e) {
   if (e.key === "Enter") {
      hideAllDisplayedDivs();
      if (searchInput.value != "") {
         const substring = searchInput.value;
         const endpoint = "http://netwwork.duckdns.org:8080/words/search?word="

         searchDisplay(endpoint + substring);
         searchInput.value = "";
      }
      else {
         defaultDisplay();

      }
   }

}

/*
//radilo je prije za search
searchInput.addEventListener("input", (e) => {
   const value = e.target.value
   console.log(words)
   users.forEach(word => {
      const isVisible = word.title.includes(value)
      word.element.classList.toggle("hide", !isVisible)
   })
})
*/

/*
//ovo je radilo inace s placholdr podacima
fetch("https://jsonplaceholder.typicode.com/posts")
   .then(res => res.json())
   .then(data => {
      users = data.map(user => {
         const card = userCardTemplate.content.cloneNode(true).querySelector(".word-bg")
         const header = card.querySelector(".the-word")
         const body = card.querySelector(".meaning")
         header.textContent = user.title
         body.textContent = user.body
         userCardContainer.append(card)
         return { title: user.title, body: user.body, element: card }
      })
   })
*/

function searchDisplay(endpoint) {

   fetch(endpoint, { mode: 'cors' }).then(res => res.json()).then(data => {
      /*
      hideAllDisplayedDivs();*/

      words = data.map(word => {
         for (const elem of word.definitions) {

            const card = userCardTemplate.content.cloneNode(true).querySelector(".word-bg")
            const header = card.querySelector(".the-word")
            const body = card.querySelector(".meaning")
            header.textContent = word.word;
            body.textContent = elem.definition; //deifnition
            userCardContainer.append(card)

         } return;
      }

      )
   })

   /*
   displayFetch("http://netwwork.duckdns.org:8080/words");*/

}

function hideAllDisplayedDivs() {
   const divs = userCardContainer.querySelectorAll(".word-bg");
   divs.forEach((div) => {
      div.style.display = "none";
   });
}

const wordId = "";
//radi
function defaultDisplay() {

   fetch(endpointDefault, { mode: 'cors' }).then(res => res.json()).then(data => {
      words = data.content.map(word => {

         for (const elem of word.definitions) {

            const card = userCardTemplate.content.cloneNode(true).querySelector(".word-bg")
            const header = card.querySelector(".the-word")
            const body = card.querySelector(".meaning")
            header.textContent = word.word;
            body.textContent = elem.definition; //deifnition
            userCardContainer.append(card)

         } return;


      }

      )
   })
}

const container = document.querySelector('.words-container');

container.addEventListener('click', (event) => {
   if (event.target.classList.contains('like')) {

      addLike(event.target);
      //run function addLike()

   }
});

function addLike() {

}


defaultDisplay();


