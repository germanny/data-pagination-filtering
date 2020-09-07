/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Add filter form
 */
function displayFilterForm() {
  const header = document.querySelector('header');

  const label = document.createElement('label');
  label.for = 'search';
  label.className = 'student-search';

  const input = document.createElement('input');
  input.id = 'search';
  input.placeholder = 'Search by name ...';

  const searchButton = document.createElement('button');
  searchButton.type = 'button';
  searchButton.id = 'submit';

  const buttonIcon = document.createElement('img');
  buttonIcon.src = 'img/icn-search.svg';
  buttonIcon.alt = 'Search icon';

  searchButton.appendChild(buttonIcon);
  label.appendChild(input);
  label.appendChild(searchButton);

  return header.appendChild(label);
}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students.

This function will take two parameters: list, and page. The list parameter will represent the array of student data we are working with and page parameter will be the page number that we want to display.
*/
function showPage(list, page) {
  // create two variables which will represent the index for the first and last student on the page
  const itemsPerPage = 9;
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;

  // select the element with a class of `student-list` and assign it to a variable
  let studentList = document.querySelector('.student-list');

  // set the innerHTML property of the variable you just created to an empty string
  studentList.textContent = '';

  // loop over the length of the `list` parameter
  for (let i = 0; i < list.length; i++) {
    // inside the loop create a conditional to display the proper students
    if (i >= startIndex && i < endIndex) {
      // inside the conditional:
        // create the elements needed to display the student information
      let studentItem = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].name.first} ${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>
      `;
        // insert the above elements
      studentList.insertAdjacentHTML('beforeend', studentItem);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  // create a variable to calculate the number of pages needed
  const itemsPerPage = 9;
  const numOfPages = Math.ceil(list.length / itemsPerPage);

  // select the element with a class of `link-list` and assign it to a variable
  let linkList = document.querySelector('.link-list');

  // set the innerHTML property of the variable you just created to an empty string
  linkList.textContent = '';

  if (numOfPages > 1) {
    // loop over the number of pages needed
    for (let i = 1; i < (numOfPages + 1); i++) {
      // create the elements needed to display the pagination button
      let linkItem = `
        <li>
          <button type="button">${i}</button>
        </li>
      `;

      // insert the above elements
      linkList.insertAdjacentHTML('beforeend', linkItem);
    }

    // give the first pagination button a class of "active"
    const firstButton = linkList.querySelector('button');
    firstButton.classList.add('active');
  }

  // create an event listener on the `link-list` element
  linkList.addEventListener('click', (e) => {
    // if the click target is a button:
    if (e.target.tagName === 'BUTTON') {
      // remove the "active" class from the previous button
      const activeButton = linkList.querySelector('button.active');
      activeButton.classList.remove('active');
      // add the active class to the clicked button
      e.target.className = 'active';
      // call the showPage function passing the `list` parameter and page to display as arguments
      showPage(list, e.target.textContent);
    }
  });
}



/*
  Data Filtering
*/
// 1. Create a function to perform your search - it should accept two parameters: searchInput, names.
function searchNames(searchInput, list) {
  let filteredList = [];

  // 1. Loop over the `list` parameter
  for (let i = 0; i < list.length; i++) {
    const name = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
    // 1b. Create a conditional that checks two conditions:
      // 1ba. If the `searchInput.value.length` does not equal the digit zero AND `list[i].textContent.toLowerCase()` includes `searchInput.value.toLowerCase())`
    if (
      searchInput.value.length !== 0 &&
      name.includes(searchInput.value.toLowerCase())
    ) {
      // 1bb. Add `list[i]` to filteredList
      filteredList.push(list[i]);
    }
  }

  if (filteredList.length === 0) {
    filteredList = list;
  }

  showPage(filteredList, 1);
  addPagination(filteredList);
}


// Call functions
displayFilterForm();
showPage(data, 1);
addPagination(data);

const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

/* submit listener */
submit.addEventListener('click', (event) => {
  event.preventDefault();

  // Invoke your search function here - Arguments: search, data
  searchNames(search, data);
});

/* submit listener */
search.addEventListener('keyup', () => {

  // Invoke your search function here - Arguments: search, data
  searchNames(search, data);
});
