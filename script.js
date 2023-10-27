const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector(".words-container")
const searchInput = document.querySelector("[data-search]")

let words = []

searchInput.addEventListener("input", (e) => {
   const value = e.target.value
   console.log(words)
   users.forEach(word => {
      const isVisible = word.title.includes(value)
      word.element.classList.toggle("hide", !isVisible)
   })
})

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
const wordId = "";


//ovo nis ne radi rn

fetch('http://netwwork.duckdns.org:8080/words', { mode: 'cors' }).then(res => { console.log(res); return res.json() }).then(data => {
   console.log(data);
   words = data.map(word => {
      const card = userCardTemplate.content.cloneNode(true).querySelector(".word-bg")
      const header = card.querySelector(".the-word")
      const body = card.querySelector(".meaning")
      console.log(word.word);
      header.textContent = word.word;
      body.textContent = word.definitions[0].definition; //deifnition
      console.log(body.textContent);
      userCardContainer.append(card)
      return {
         title: word.title, body: word.body, element: card
      }
   }

   )
})

const container = document.querySelector('.words-container');

container.addEventListener('click', (event) => {
   if (event.target.classList.contains('like')) {
      console.log("clicked");
      if (event.target.textContent == "more likes") {
         event.target.textContent = "less likes"
      } else {
         event.target.textContent = "more likes";
      }
      // Handle the "like" button click here
   }
});






/*
//moj pokusaj koji nije radio
document.addEventListener("DOMContentLoaded", () => {
   const likeButton = document.getElementById("like")
   let likeCount = 0
   fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json)
      .then(data => {
         data
      })

})
*/