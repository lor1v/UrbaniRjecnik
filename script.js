const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector(".words-container")
const searchInput = document.querySelector("#search")
const buttonNext = document.querySelector(".next");
const buttonPrev = document.querySelector(".prev");
let currentPageNumber = 0;


let words = [];

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


}

function hideAllDisplayedDivs() {
   const divs = userCardContainer.querySelectorAll(".word-bg");
   divs.forEach((div) => {
      div.style.display = "none";
   });
}

const wordId = "";

const defaultEnd = "http://netwwork.duckdns.org:8080/definitions/paged";
//radi
function display(endpoint) {
   hideAllDisplayedDivs();
   fetch(endpoint, { mode: 'cors' }).then(res => res.json()).then(data => {
      console.log(data)
      defs = data.content.map(elem => {

         const card = userCardTemplate.content.cloneNode(true).querySelector(".word-bg")
         const header = card.querySelector(".the-word")
         const body = card.querySelector(".meaning")
         const user = card.querySelector(".byUser")
         const dislike = card.querySelector(".dislike");
         const like = card.querySelector(".like");

         header.textContent = elem.word.word;
         body.textContent = elem.definition;
         user.textContent = "Predložio korisnik: " + elem.submitted_by_user;

         like.id = elem.id;
         like.textContent = "Sviđatelj: " + elem.upvotes;
         like.num = elem.upvotes;
         dislike.id = elem.id;
         dislike.textContent = "Mrzitelj: " + elem.downvotes;
         dislike.num = elem.downvotes;

         userCardContainer.append(card)
      });


      const pageable = data.pageable
      const first = pageable.pageNumber == 0;
      const last = data.last;
      currentPageNumber = pageable.pageNumber;

      if (first == true) {
         /*
         buttonPrev.style.display = "none";*/
         buttonPrev.style.visibility = "hidden";

      } else {
         buttonPrev.style.visibility = "visible";
      }
      if (last == true) {/*
         buttonNext.style.display = "none";*/
         buttonNext.style.visibility = "hidden";
      } else {
         buttonNext.style.visibility = "visible";
      }
      console.log(first, last);

   })

}


//const container = document.querySelector('.words-container');
const container = document.querySelector('.scrollable');

container.addEventListener('click', (event) => {
   if (event.target.classList.contains('like')) {
      addLike(event.target);
      event.target.textContent = "Sviđatelj: " + (parseInt(event.target.textContent.replace("Sviđatelj: ", "")) + 1);
   }
   if (event.target.classList.contains('dislike')) {
      addDislike(event.target);
      event.target.textContent = "Mrzitelj: " + (parseInt(event.target.textContent.replace("Mrzitelj: ", "")) + 1);
   }
   if (event.target.classList.contains('next')) {
      nextPage();
   }
   if (event.target.classList.contains('prev')) {
      prevPage();
   }

});

function addLike(button) {
   fetch("http://netwwork.duckdns.org:8080/definitions/" + button.id + "/upvote", { mode: 'cors', method: 'PUT' });
}
function addDislike(button) {
   fetch("http://netwwork.duckdns.org:8080/definitions/" + button.id + "/downvote", { mode: 'cors', method: 'PUT' });
}
function nextPage() {
   hideAllDisplayedDivs();
   currentPageNumber++;
   display("http://netwwork.duckdns.org:8080/definitions/paged?pageIndex=" + currentPageNumber)
}
function prevPage() {
   hideAllDisplayedDivs();
   currentPageNumber--;
   display("http://netwwork.duckdns.org:8080/definitions/paged?pageIndex=" + currentPageNumber)
}

display(defaultEnd);


