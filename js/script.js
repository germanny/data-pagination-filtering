/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/**
 * Add a search form to the page.
 * @return {object} Form to search for students in the list
 */
function displayFilterForm() {
  function createElement(elementName, atts) {
    const element = document.createElement(elementName);

    for (key in atts) {
      element.setAttribute(key, atts[key]);
    }

    return element;
  }

  function appendToLabel(elementName, atts) {
    const element = createElement(elementName, atts);
    label.appendChild(element);
    return element;
  }

  const header = document.querySelector('header');
  const label = createElement('label', { for: 'search', class: 'student-search' });

  appendToLabel('input', { id: 'search', placeholder: 'Search by name ...' });
  appendToLabel('button', { type: 'button', id: 'submit' })
    .appendChild(createElement('img', { src: 'img/icn-search.svg', alt: 'Search icon' }));

  return header.appendChild(label);
}


/**
 * Create and insert/append the elements needed to display a "page" of nine students.
 * @param {array} list - Array of student data we are working with
 * @param {integer} page - Page number that we want to display
 */
function showPage(list, page) {
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

/**
 * Create and insert/append the elements needed for the pagination buttons.
 * @param {array} list - Array of student data we are working with
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
/**
 * Search for value in list of students.
 * @param {object} searchInput - Input field with the value to search for
 * @param {array} list - Array of student data we are working with
 */
function searchNames(searchInput, list) {
  let filteredList = [];

  // Loop over the `list`
  for (let i = 0; i < list.length; i++) {
    const name = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`;
    // Create a conditional that checks two conditions:
    // If the `searchInput.value.length` does not equal the digit zero AND `list[i].textContent.toLowerCase()` includes `searchInput.value.toLowerCase())`
    if (
      searchInput.value.length !== 0 &&
      name.includes(searchInput.value.toLowerCase())
    ) {
      // Add `list[i]` to filteredList
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


// Filtering Event Handlers
const search = document.querySelector('#search');
const submit = document.querySelector('#submit');

/* submit listener */
submit.addEventListener('click', (e) => {
  e.preventDefault();
  searchNames(search, data);
});

/* submit listener */
search.addEventListener('keyup', () => {
  searchNames(search, data);
});
