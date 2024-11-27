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

function disableFormInputsOnSuccess() {
  submitButton.textContent = 'submitted';
  submitButton.disabled = true;
  const formInputs = userDetailsForm.querySelectorAll('input');
  formInputs.forEach(input => {
    input.disabled = true;
  });
}

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
