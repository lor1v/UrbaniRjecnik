const submittedWord = document.getElementById("wordsubmit");
const submittedDef = document.getElementById("defsubmit");
const submitButton = document.getElementById('submit-button');
const submittedUser = document.getElementById('usersubmit');
const submittedConvo = document.getElementById('convosubmit');
const constWord = "";

submitButton.addEventListener('click', function () {
   console.log("clcicked");
   if (submittedWord.value != "" && submittedDef.value != "" && submittedUser.value != "") {
      fetch(`http://netwwork.duckdns.org:8080/definitions?word=${submittedWord.value}&definition=${submittedDef.value}&conversation=""&submittedByUser=${submittedUser.value}`, {
         mode: 'cors',
         method: "POST",
      });
      submittedWord.value = "";
      submittedDef.value = "";
      submittedConvo.value = "";



      /*
      //dino kaz da ne radi
            fetch("http://netwwork.duckdns.org:8080/definitions", {
               mode: 'no-cors',
               method: "POST",
               body: JSON.stringify({
                  word: submittedWord.value,
                  definition: submittedDef.value,
                  conversation: "p",
                  submittedByUser: "lor"
               }),
               headers: {
                  "Content-type": "application/json; charset=UTF-8"
               }
            });*/

      //exampleFetch();

      console.log(submittedWord.value);
      console.log(submittedDef.value);
   }


});

async function exampleFetch() {
   const response = await fetch("http://netwwork.duckdns.org:8080/definitions", { mode: 'no-cors' });
   console.log(response.json());
}