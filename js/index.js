// ------------------------------
// STYLING RELATED SETUP
// ------------------------------

const article = document.querySelector('.article');
const articleTitle = article.querySelector('#article-title');
article.style.setProperty('--_title-width', articleTitle.offsetWidth + 'px');

// ------------------------------
// FORM SUBMISSION SETUP AND HANDLING
// ------------------------------

// Placeholder API for testing purposes:
// This URL is used for local testing to ensure the form submission works with a mock API.
// The URL returns a correct response, simulating a successful submission.
const USER_DETAILS_SUBMISSION_URL = 'https://httpbin.org/post';

// API URL for production:
// This is the actual API endpoint that will handle form submissions in the live environment.
// Uncomment this line and delete the testing URL above once the production API is operational.
// const USER_DETAILS_SUBMISSION_URL = 'https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar';

const userDetailsForm = document.querySelector('#user-details-form');
const submitButton = userDetailsForm.querySelector('#submit-button');
const phoneInput = userDetailsForm.querySelector('#phone-number');

/*
  * Formats a given phone number to the format (xxx) xxx-xxxx.
  * Assumes input is a string that may contain non-digit characters.
  * It strips out non-digit characters and formats the phone number accordingly.

  Expected Usage:
  * This function should be used to format the phone number string before displaying it to the user.
  
  Dependencies:
  * - `value`: A string that may contain the raw phone number (with or without non-digit characters).

  * @param {string} value - The phone number string to format.
  * @returns {string} - The formatted phone number in the format (xxx) xxx-xxxx, or an incomplete format if there are not enough digits.
*/
function phoneNumberFormatter(value) {
  if (!value) return value;

  // Remove non-digit characters
  let phoneNumber = value.replace(/\D/g, '');
  const phoneNumberLength = phoneNumber.length;

  const areaCode = phoneNumber.slice(0, 3);
  const prefix = phoneNumber.slice(3, 6);
  const lineNumber = phoneNumber.slice(6, 10);

  if (phoneNumberLength < 4) { return phoneNumber; }
  if (phoneNumberLength < 7) { return `(${areaCode}) ${prefix}`; }
  return `(${areaCode}) ${prefix}-${lineNumber}`;
}

/*
  * Handles phone number input and applies formatting.
  * Triggered on blur event of the phone number input field.
  * This function formats the phone number string once the user leaves the input field.
 
  Expected Usage:
  * Bind this function to the blur event of the phone number input to format the value when the user leaves the field.
  
  Dependencies:
  * - `event.target.value`: The current value of the phone number input field.
  
  * @param {Event} event - The blur event object triggered when the user leaves the phone number input field.
  * @returns {void}
*/
function phoneNumberHandler(event) {
  const formattedInput = phoneNumberFormatter(event.target.value);
  event.target.value = formattedInput;
}

phoneInput.addEventListener('blur', phoneNumberHandler);

/*
  * Validates individual form fields based on specific rules.
  * For name, phone, and email, it checks specific formatting requirements.
  
  Expected Usage:
  * Call this function on each input field before submitting the form to ensure each field's value is valid.
  
  * @param {HTMLInputElement} input - The input field to validate.
  * @returns {boolean} - true if the input is valid; false otherwise.
 */
function validateField(input) {
  const value = input.value.trim();
  const id = input.id;

  let isValid = true;

  if (input.hasAttribute('required') && !value) {
    isValid = false;
  }

  if (id === 'name' && value.length < 2) {
    isValid = false;
  }

  if (id === 'phone' && !/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
    isValid = false;
  }

  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    isValid = false;
  }

  return isValid;
}

/*
  * Disables all input fields and the submit button of the form to prevent further interaction after the form has been submitted successfully.
  
  Expected Usage:
  * Call this function only after confirming that the form submission   succeeded.

  Dependencies:
  * - `submitButton`: A reference to the submit button element.
  * - `userDetailsForm`: A reference to the form element containing the   inputs.
  
  * @returns {void}
*/
function disableFormInputsOnSuccess() {
  submitButton.textContent = 'submitted';
  submitButton.disabled = true;
  const formInputs = userDetailsForm.querySelectorAll('input');
  formInputs.forEach(input => {
    input.disabled = true;
  });
}

/*
  * Submits the form data to the API endpoint.
  * Fetches the form data, converts it, and sends a POST request.
  * Disables inputs and updates button text upon success.
 
  Expected Usage:
  * Call this function after ensuring that form validation has passed. 
   
  Dependencies:
  * - `userDetailsForm`: A reference to the form element containing the inputs.
  
  * @returns {Promise<void>} - Resolves when the form submission is complete (successful or failed).
*/
async function submitForm() {
  const formData = new FormData(userDetailsForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(USER_DETAILS_SUBMISSION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error occurred during form submission:", error);
  } finally {
    disableFormInputsOnSuccess();
  }
}

/*
  * Handles the form submission event.
  * Validates all fields, and if valid, calls the submitForm function.
  
  Expected Usage:
  * This function is bound to the form submission event. It prevents the default form submission behavior and handles the validation and submission process.

  Dependencies:
  * - `userDetailsForm`: A reference to the form element containing the inputs.

  * @param {Event} event - The submit event object.
  * @returns {void}
*/
function submitHandler(event) {
  event.preventDefault();

  let isValid = true;
  const inputs = userDetailsForm.querySelectorAll('input');

  inputs.forEach((input) => {
    const isFieldValid = validateField(input);
    isValid = isValid && isFieldValid;
  });

  if (isValid) {
    submitForm();
  } else {
    alert('Please correct the form errors and try again.');
  }
}

userDetailsForm.addEventListener('submit', submitHandler);
