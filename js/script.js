/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


const searchBar = `<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
document.querySelector("header").insertAdjacentHTML('beforeend', searchBar);
const itemsPerPage = 9; // Global variable which stores the nine student per page limit


// This function creates and adds elements displaying nine students per page
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   let studentList = document.querySelector(".student-list");
   studentList.innerHTML = ''; // Removes any previously displayed students
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentItem = list[i];
         // Dynamically inserts info for each student into DOM
         studentList = `<li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src="${studentItem.picture.medium}" alt="Profile Picture">
            <h3>Name: ${studentItem.name.first} ${studentItem.name.last}</h3>
            <span class="email">Email: ${studentItem.email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined:${studentItem.registered.date}</span>
            </div>
            </li>`;
         document.querySelector(".student-list").insertAdjacentHTML('beforeend', studentList);
      }
   }
}


// Function that adds/inserts pagination buttons
function addPagination(list) {
   let numOfPages = Math.ceil(list.length / itemsPerPage);//Calculates number of pagination buttons needed
   let linkList = document.querySelector(".link-list");
   linkList.innerHTML = ''; // Removes any prior pagination buttons
   // Loop through pages and start index at 1  so that shows on first button
   for (let i = 1; i <= numOfPages; i++) {
      const button = `<li>
         <button type="button">${i}</button>
         </li>`;
      linkList.insertAdjacentHTML('beforeend', button);
      document.querySelector("button").className = 'active';


   }
   // Makes the clicked page the highlighted active page
   linkList.addEventListener("click", (e) => {
      if (e.target.tagName === 'BUTTON') {
         const activeButton = document.querySelector(".active");
         activeButton.className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);

      }

   });

// Message to user when there aren't results   
let firstPage = linkList.querySelector('button:first-child');
   if (!firstPage) {
   linkList.innerHTML = `<h1> No Results Found</h1>`;
   return

   }


}

// This gives the search bar functionality

function performSearch(list){
   let userInput = document.getElementById('search');
   userInput.addEventListener('keyup',(event) => {
      let typedInput = event.target.value;
      let resultList = [];

      for (let i = 0; i < list.length; i ++){
         let firstName = list[i]['name']['first'].toLowerCase();
         let lastName = list[i]['name']['last'].toLowerCase();
         if (firstName.includes(typedInput) || lastName.includes(typedInput)){
            resultList.push(list[i]);


         }
      }
      showPage(resultList, 1);
      addPagination(resultList);
   });

}

addPagination(data);
showPage(data, 1);
performSearch(data);




