const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector(".words-container")

fetch('http://netwwork.duckdns.org:8080/words/random', { mode: 'cors' }).then(res => res.json()).then(data => {

   const card = userCardTemplate.content.cloneNode(true).querySelector(".word-bg");
   const header = card.querySelector(".the-word")
   const body = card.querySelector(".meaning")
   const dislike = card.querySelector(".dislike");
   const like = card.querySelector(".like");


   header.textContent = data.word;
   body.textContent = data.definitions[0].definition;

   like.id = data.definitions[0].id;
   like.textContent = "Sviđatelj: " + data.definitions[0].upvotes;
   like.num = data.definitions[0].upvotes;
   dislike.id = data.definitions[0].id;
   dislike.textContent = "Mrzitelj: " + data.definitions[0].downvotes;
   dislike.num = data.definitions[0].downvotes;


   userCardContainer.append(card);

})


const container = document.querySelector('.words-container');

container.addEventListener('click', (event) => {
   if (event.target.classList.contains('like')) {
      addLike(event.target);
      event.target.textContent = "Sviđatelj: " + (parseInt(event.target.textContent.replace("Sviđatelj: ", "")) + 1);
   }
   if (event.target.classList.contains('dislike')) {
      addDislike(event.target);
      event.target.textContent = "Mrzitelj: " + (parseInt(event.target.textContent.replace("Mrzitelj: ", "")) + 1);
   }

});

function addLike(button) {
   fetch("http://netwwork.duckdns.org:8080/definitions/" + button.id + "/upvote", { mode: 'cors', method: 'PUT' });
}
function addDislike(button) {
   fetch("http://netwwork.duckdns.org:8080/definitions/" + button.id + "/downvote", { mode: 'cors', method: 'PUT' });
}     