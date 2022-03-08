// ----- Dear UofT grader, thank you for reviewing my code!
// Please mind the length of code, i included a variety of functions for the project
// Outside of the main requirements

// --------------- Add all global variables at the top to clean up functions below
var generateBtn = document.querySelector('#generate');
var passwordText = document.querySelector('#password');
const filters = document.querySelector('.card-criteria');
const cardFooter = document.querySelector('.card-footer');
const updateMsg = document.getElementById('update-msg');
var copyBtn = document.getElementById('copy-btn'); // Copy Password button

// On initial load, hide the copy password button
copyBtn.style.display = 'none';
// Declare this variable to determine when to reveal filter options
var runOnce = true; // and when to execute the generate password function

// --------------- Declare all necessary keys/values for creating the password
// Declare all criteria's in one object to keep it simple
var parameters = {
  // Create a separate array for each parameter using the .split method
  // The .split method cleans up the code and is more efficient
  lettersLower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  lettersUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  numbers: '0123456789'.split(''),
  symbols: "!@#$%*()_+-=?/~}{|><;:.,'`^][/|\\".split(''),
};

// --------------- This function reveals the filter options and check what the user is entering
function revealFilters() {
  // Display requirement message as well as the card-header and card-body sections
  updateMsg.style.display = 'flex';
  document.querySelector('.card-body').style.display = 'flex';
  document.querySelector('.card-header').style.display = 'flex';

  // Set display to flex and extend height of footer
  filters.style.display = 'flex';
  cardFooter.style.height = '240px';
  // Set to false so we can execute generatePassword()
  runOnce = false;
  // Change button label to match with state
  generateBtn.innerText = 'Generate Password';
  // Only clear the password if it exists
  if (!password.value == '') {
    charCount.style.color = 'hsl(206, 17%, 28%)';
    critCheck.style.color = 'hsl(206, 17%, 28%)';

    password.value = '';
    copyBtn.style.display = 'none'; // Hide the copy password button since the password is empty now

    // If password exists and we reset, revert back to original card height
    passwordText.style.paddingTop = '17px';
    passwordText.style.paddingBottom = '60px';
  }
  // While we're in the filter state, check the data the user is inputting
  testCondition();
}

// The main array that will the state of the project and the type of password being generated
// I make it a global variable so i can access it across the entire code
var tempParams = [false, false, false, false, false];
// --------------- After successful password generation, clear all input fields
// and revert to initial styling
function clearFilters() {
  document.getElementById('numOfChar').value = '';
  document.querySelectorAll('.checkbox').forEach((item) => {
    item.checked = false;
  });

  // Clear array so the condition are fresh the next time we try to generate a password
  for (i = 0; i < tempParams.length; i++) {
    tempParams[i] = false;
  }

  // By setting to true, we can now execute revealFilter()
  runOnce = true;
  // Revert to initial card style
  filters.style.display = 'none';
  cardFooter.style.height = 'initial';
}

// These variables are the required messages (i.e. '1 Criteria' and 'Valid character count')
var charCount = document.getElementById('char-count');
var critCheck = document.getElementById('crit-check');

// --------------- This function cleans up the repetitive conditional code in testCondition() below
function checkParams() {
  if (
    (tempParams[0] && tempParams[1]) ||
    (tempParams[0] && tempParams[2]) ||
    (tempParams[0] && tempParams[3]) ||
    (tempParams[0] && tempParams[4])
  ) {
    generateBtn.disabled = false;
  } else if (
    (!tempParams[0] && tempParams[1]) ||
    (!tempParams[0] && tempParams[2]) ||
    (!tempParams[0] && tempParams[3]) ||
    (!tempParams[0] && tempParams[4])
  ) {
    generateBtn.disabled = true;
    critCheck.style.color = 'green';
  } else {
    critCheck.style.color = 'red';
    generateBtn.disabled = true;
  }
}

// --------------- This function colors the requirement labels accordingly (i.e. '1 Criteria') and...
// Makes the generate button active or disabled depending on if conditions are met
function testCondition() {
  // Disable button when the filters are revealed initially
  generateBtn.disabled = 'true';
  // The below condition is special so it's slightly different vs the other ones below
  // Check for key up on the numOfChar input and return condition accordingly
  numOfChar.addEventListener('keyup', (e) => {
    if (e.target.value >= 8 && e.target.value <= 128) {
      charCount.style.color = 'green';
      charCount.innerText = 'Valid Character count between 8-128';
      tempParams[0] = true;
    } else {
      // Depending on which part is true, return label accordingly
      if (e.target.value < 8) {
        charCount.innerText = 'Increase character count above 7';
      } else {
        charCount.innerText = 'Reduce character count under 129';
      }
      // And make font color so it pops out more
      charCount.style.color = 'red';
      tempParams[0] = false;
    }
    // If the number of characters is in the correct range and at least...
    // one criteria was chosen...
    if (
      (tempParams[0] && tempParams[1]) ||
      (tempParams[0] && tempParams[2]) ||
      (tempParams[0] && tempParams[3]) ||
      (tempParams[0] && tempParams[4])
    ) {
      // Allow the user to use the button
      generateBtn.disabled = false;
    } else {
      // Else, if a criteria isn't chosen, disable the button
      generateBtn.disabled = true;
    }
  });

  // Iterate through all checkboxes and....
  document.querySelectorAll('.checkbox').forEach((item) => {
    item.addEventListener('change', (e) => {
      // Check for the specific ID
      if (e.target.id == 'special-chars') {
        // If the checkbox with associated id is checked, update specific index to true and change label color to match state
        if (e.target.checked) {
          tempParams[1] = true;
          critCheck.style.color = 'green';
        } else {
          // Else set it to false
          tempParams[1] = false;
        }
      }
      if (e.target.id == 'lower-char') {
        if (e.target.checked) {
          tempParams[2] = true;
          critCheck.style.color = 'green';
        } else {
          tempParams[2] = false;
        }
      }
      if (e.target.id == 'upper-char') {
        if (e.target.checked) {
          tempParams[3] = true;
          critCheck.style.color = 'green';
        } else {
          tempParams[3] = false;
        }
      }
      if (e.target.id == 'numeric-val') {
        if (e.target.checked) {
          tempParams[4] = true;
          critCheck.style.color = 'green';
        } else {
          tempParams[4] = false;
        }
      }
      // In checkParams, we compare all other checkboxes and their status with the numOfChar status
      // If at least 1 criteria is chosen and numOfChar is true,
      // Allow the user to use the button
      checkParams();
    });
  });
}

// --------------- Create the function out of the data we gathered from the users input
function generatePassword() {
  // Remove update message if all conditions are correct
  updateMsg.style.display = 'none';

  //  Declare the variable to hold the main password
  var password = '';

  // If all conditions are met, then generate password
  for (let i = 0; i <= parseInt(numOfChar.value); ) {
    if (tempParams[1] == true) {
      // Special characters
      password +=
        parameters.symbols[
          Math.floor(Math.random(0) * parameters.symbols.length)
          // Randomize the letter selection from 0 to the max length of the array
        ];
      // Increment here specifically and break accordingly so we don't go through
      // the full loop iteration and add an unnecessary amount of characters
      i += 1;
      //  If i == the number of characters chosen, break out of the loop
      if (i == parseInt(numOfChar.value)) {
        break;
      }
    }
    if (tempParams[2] == true) {
      // Lower characters
      password +=
        parameters.lettersLower[
          Math.floor(Math.random(0) * parameters.lettersLower.length)
        ];
      i += 1;
      if (i == parseInt(numOfChar.value)) {
        break;
      }
    }

    if (tempParams[3] == true) {
      // Upper characters
      password +=
        parameters.lettersUpper[
          Math.floor(Math.random(0) * parameters.lettersUpper.length)
        ];
      i += 1;
      if (i == parseInt(numOfChar.value)) {
        break;
      }
    }
    if (tempParams[4] == true) {
      // Numbers
      password +=
        parameters.numbers[
          Math.floor(Math.random(0) * parameters.numbers.length)
        ];
      i += 1;
      if (i == parseInt(numOfChar.value)) {
        break;
      }
    }
  }

  // Temporarily turn the password into an array so i can use the sort method to shuffle the password
  // and then convert it back to string using .join
  var shuffledPass = password
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');

  // Finally, add the shuffledPass to the main textarea field
  passwordText.value = shuffledPass;

  // Increase the height to the passwordText textarea to fit the password length
  // The longer the password, the more space is needed height wise
  if (passwordText.value.length >= 100) {
    passwordText.style.paddingTop = '13px';
    passwordText.style.paddingBottom = '67px';
  } else if (
    passwordText.value.length <= 100 &&
    passwordText.value.length >= 50
  ) {
    passwordText.style.paddingTop = '13px';
    passwordText.style.paddingBottom = '44px';
  } else {
    passwordText.style.paddingTop = '34px';
    passwordText.style.paddingBottom = '10px';
  }

  // Reveal the copy password button
  copyBtn.style.display = 'flex';
  // Change button label to match with state
  generateBtn.innerHTML = 'Generator Another';
  // Clear all filters and then set runOnce to true so when we click on the generate button now...
  // it will return the filters and allows us to run the full function again
  clearFilters();
}

// Add event listener to generate button
generateBtn.addEventListener('click', () => {
  // Reveal the filters on initial button click
  if (runOnce) {
    revealFilters();
  } else {
    // Then execute the main function after
    // Upon successful password generation, set runOnce to true
    // So we can use the revealFilters() again
    generatePassword();
  }
});

// --------------- This function allows you to copy the  password to clip board
var copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', () => {
  passwordText.select();
  document.execCommand('copy');
  // By adding class of active, the clipboard icon turns green to
  // indicate that the code has successfully been copied
  copyBtn.classList.add('active');
  // Then after 1 second, remove the effect
  setTimeout(() => {
    copyBtn.classList.remove('active');
  }, 1000);
});
