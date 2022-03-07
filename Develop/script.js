// --------------- Add all global variables at the top to clean up functions below
var generateBtn = document.querySelector('#generate');
var passwordText = document.querySelector('#password');
const filters = document.querySelector('.card-criteria');
const cardFooter = document.querySelector('.card-footer');
const updateMsg = document.getElementById('update-msg');

var runOnce = true; // Declare this variable to determine when to reveal filter options
// and when to execute the generate password function

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
  // Display requirement  message
  updateMsg.style.display = 'flex';

  // Set display to flex and extend height of footer
  filters.style.display = 'flex';
  cardFooter.style.height = '240px';
  // Set to false so we can execute generatePassword()
  runOnce = false;
  // Change button label to match with state
  generateBtn.innerHTML = 'Generate Password';
  // Only clear the password if it exists
  if (!password.value == '') {
    displayRequirement();
    password.value = '';
    // If password exists and we reset, revert back to original card height
    passwordText.style.paddingTop = '24px';
    passwordText.style.paddingBottom = '0';
  }
  // While we're in the filter state, check the data the user is inputting
  testCondition();
}

// --------------- This function re-displays the initial requirement message
function displayRequirement() {
  updateMsg.innerHTML = `Required:
            <em id="char-count">Valid Character count between 8-128</em>
            <em id="crit-check">1 criteria</em>`;
  updateMsg.style.color = 'hsl(206, 17%, 28%)';
}

// Make this a global array so we can access it in checkParams() and testCondition()
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
    document.getElementById('crit-check').style.color = 'green';
  } else {
    document.getElementById('crit-check').style.color = 'hsl(206, 17%, 28%)';
    generateBtn.disabled = true;
  }
}

// --------------- This function colors the labels requirement labels accordingly (i.e. '1 Criteria') and...
// makes the generate button active or disabled depending on if conditions are met
function testCondition() {
  // Disable button when the filters are revealed initially
  generateBtn.disabled = 'true';

  // The below condition is special so it's slightly different vs the other ones below
  // Check for key up on the numOfChar input and return condition accordingly
  numOfChar.addEventListener('keyup', (e) => {
    if (e.target.value >= 8 && e.target.value <= 128) {
      document.getElementById('char-count').style.color = 'green';

      tempParams[0] = true;
    } else {
      document.getElementById('char-count').style.color = 'hsl(206, 17%, 28%)';
      tempParams[0] = false;
    }
    if (
      (tempParams[0] && tempParams[1]) ||
      (tempParams[0] && tempParams[2]) ||
      (tempParams[0] && tempParams[3]) ||
      (tempParams[0] && tempParams[4])
    ) {
      generateBtn.disabled = false;
    } else {
      generateBtn.disabled = true;
    }
  });

  // Listen for a checkbox change event and return condition accordingly
  var specialChars = document.getElementById('special-chars');
  specialChars.addEventListener('change', (e) => {
    if (e.target.checked) {
      tempParams[1] = true;
      document.getElementById('crit-check').style.color = 'green';
    } else {
      tempParams[1] = false;
    }
    checkParams();
  });

  var lowerChar = document.getElementById('lower-char');
  lowerChar.addEventListener('change', (e) => {
    if (e.target.checked) {
      // Highlight the words green as an indicator ("1 Criteria")
      tempParams[2] = true;
      document.getElementById('crit-check').style.color = 'green';
    } else {
      tempParams[2] = false;
    }
    checkParams();
  });

  var upperChar = document.getElementById('upper-char');
  upperChar.addEventListener('change', (e) => {
    if (e.target.checked) {
      tempParams[3] = true;
      document.getElementById('crit-check').style.color = 'green';
    } else {
      tempParams[3] = false;
    }
    checkParams();
  });

  var numericVal = document.getElementById('numeric-val');
  numericVal.addEventListener('change', (e) => {
    if (e.target.checked) {
      tempParams[4] = true;
      document.getElementById('crit-check').style.color = 'green';
    } else {
      tempParams[4] = false;
    }
    checkParams();
  });
}

// Assignment code here
function generatePassword() {
  // Remove update message if all conditions are correct
  updateMsg.style.display = 'none';
  // Increase the height to the textarea to fit the password
  passwordText.style.paddingTop = '13px';
  passwordText.style.paddingBottom = '45px';

  // If all conditions are met, then generate password
  var password = '';
  for (let i = 0; i < parseInt(numOfChar.value); i++) {
    // If I is even, add upper case letter
    if (i % 2 == 0) {
      console.log(i);
      password +=
        parameters.lettersUpper[
          Math.floor(Math.random(0) * parameters.lettersUpper.length)
          // Randomize the letter selection from 0 to the max length of the array
        ];
    } else {
      password +=
        parameters.lettersLower[
          Math.floor(Math.random(0) * parameters.lettersLower.length)
        ];
    }
  }

  // Temporarily create an array out of the password so we can shuffle it
  // Then convert it to string, replace all commas and put it together as a new shuffled string
  const passShuffled = password
    .split('')
    .sort((a, b) => 0.5 - Math.random())
    .toString()
    .replace(/,/g, '');

  passwordText.value = passShuffled;
  console.log(passShuffled.length);
  // Change button label to match with state
  generateBtn.innerHTML = 'Reset';
  // Revert back to the original state
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
    generatePassword();
  }
});

var copyBtn = document.querySelector('.copy-btn');
copyBtn.addEventListener('click', () => {
  /* Select the text field */
  passwordText.select();
  passwordText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(passwordText.value);

  /* Alert the copied text */
  alert('Copied the text: ' + passwordText.value);
});
