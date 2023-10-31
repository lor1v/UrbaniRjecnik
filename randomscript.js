const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector(".words-container")

fetch('http://netwwork.duckdns.org:8080/words/random', { mode: 'cors' }).then(res => res.json()).then(data => {

   const card = userCardTemplate.content.cloneNode(true).querySelector(".word-bg");
   const header = card.querySelector(".the-word")
   const body = card.querySelector(".meaning")

   header.textContent = data.word;
   body.textContent = data.definitions[0].definition;
   userCardContainer.append(card);
   /*
   return {
      title: word.title, body: word.body, element: card
   }/*
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

   )*/
})