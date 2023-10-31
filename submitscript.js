const submittedWord = document.getElementById("wordsubmit");
const submittedDef = document.getElementById("defsubmit");
const submitButton = document.getElementById('submit-button');
const submittedUser = document.getElementById('usersubmit');
/*
const submittedConvo = document.getElementById('convosubmit');
*/
const constWord = "";

submitButton.addEventListener('click', function () {
   if (submittedWord.value != "" && submittedDef.value != "" && submittedUser.value != "") {
      fetch(`http://netwwork.duckdns.org:8080/definitions?word=${submittedWord.value}&definition=${submittedDef.value}&conversation=""&submittedByUser=${submittedUser.value}`, {
         mode: 'cors',
         method: "POST",
      });
      submittedWord.value = "";
      submittedDef.value = "";


   }


});

function nextField1(e) {
   if (e.key === "Enter") {
      document.getElementById('defsubmit').focus();
   }
}
function nextField2(e) {
   if (e.key === "Enter") {
      document.getElementById('usersubmit').focus();
   }
}
