// Add all global variables at the top to clean up functions below
var generateBtn = document.querySelector('#generate');
var passwordText = document.querySelector('#password');

const filters = document.querySelector('.card-criteria');
const cardFooter = document.querySelector('.card-footer');
const updateMsg = document.getElementById('update-msg');
var runOnce = true; // Declare this variable to determine when to reveal filter opttions
// and when to execute the generate password function

// --------------- Declare all necessary parameter for creating the password
// Declare all criteria's in one object to keep it simple
var parameters = {
  // Create a separate array for each parameter using the .split method
  // The .split method cleans up the code and is more efficient
  lettersLower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  lettersUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  numbers: '0123456789'.split(''),
  symbols: '!@#$%*()_+-=?/'.split(''),
};

// --------------- This function displays error message if condition is not met
function displayError() {
  // Upon initial execution, reveal the message
  updateMsg.style.display = 'flex';
  // Then after 2 seconds, hide it
  setTimeout(() => {
    updateMsg.style.display = 'none';
  }, 2000);
}
// --------------- This function reveal the filter options
function revealFilters() {
  // Set display to flex and extend height of footer
  filters.style.display = 'flex';
  cardFooter.style.height = '140px';
  runOnce = false;
  generateBtn.innerHTML = 'Generate Password';
}

// --------------- After successful password generation, clear all input fields
function clearFilters() {
  document.getElementById('numOfChar').value = '';
  numOfChar = '';
  runOnce = true;
  filters.style.display = 'none';
  cardFooter.style.height = 'initial';
}

// Assignment code here
function generatePassword() {
  // This will hold the values of the filters, one MUST be true in order to
  // generate the password
  var tempReqs = [false, false, false, false];

  // --------------- Extract conditional data (num-of-chars, special-chars and etc.)
  // Extract the value from the number of characters input
  var numOfChar = document.getElementById('numOfChar').value;

  // Extract the value from the checkboxes
  // If checkbox has been checked, convert the boolean to true
  var specialChars = document.getElementById('special-chars');
  specialChars.checked ? (tempReqs[0] = true) : '';

  var lowerChar = document.getElementById('lower-char');
  lowerChar.checked ? (tempReqs[1] = true) : '';

  var upperChar = document.getElementById('upper-char');
  upperChar.checked ? (tempReqs[2] = true) : '';

  var numericVal = document.getElementById('numeric-val');
  numericVal.checked ? (tempReqs[3] = true) : '';

  // --------------- Check all criteria's
  // If all is true, create and write password to HTML element
  if (
    tempReqs[0] == false &&
    tempReqs[1] == false &&
    tempReqs[2] == false &&
    tempReqs[3] == false &&
    numOfChar == ''
  ) {
    displayError();
    updateMsg.innerText =
      'Please use at least one criteria and fill in character count.';
  } else if (
    (tempReqs[0] == false &&
      tempReqs[1] == false &&
      tempReqs[2] == false &&
      tempReqs[3] == false &&
      numOfChar > 128) ||
    (tempReqs[0] == false &&
      tempReqs[1] == false &&
      tempReqs[2] == false &&
      tempReqs[3] == false &&
      numOfChar < 8)
  ) {
    displayError();
    updateMsg.innerText =
      'Please use at least one criteria and choose a valid character count between 8 and 128';
  } else if (
    tempReqs[0] == false &&
    tempReqs[1] == false &&
    tempReqs[2] == false &&
    tempReqs[3] == false
  ) {
    displayError();
    updateMsg.innerText = 'Please use at least one criteria.';
  } else if (numOfChar < 8 || numOfChar > 128) {
    displayError();
    updateMsg.innerText =
      'Please type a valid character count between 8 and 128';
  } else {
    // If all conditions are met, then generate password
    var password = 'abcdefghi';
    // Temporarily create an array out of the password so we can shuffle it
    const shuffledArray = password
      .split('')
      .sort((a, b) => 0.5 - Math.random());

    passwordText.value = shuffledArray;
    generateBtn.innerHTML = 'Generator another';

    // Revert back to the original state
    clearFilters();
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', () => {
  // Reveal the filters on initial button click
  if (runOnce) {
    revealFilters();
  } else {
    // Then execute this function after
    generatePassword();
  }
});

/*
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
*/
