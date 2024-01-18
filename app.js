
///NUMBERS

//Variables for the target funds
const targetFund = 100000; //change this to whatever you want
const targetFundText = document.getElementById('targetFundText'); //Gets the text that will display the target fund
targetFundText.innerText = "Raised out of $" + targetFund.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ":"; //Displays the target fund with comma ($1000 -> $1.000)

//Variables for the current fund
let currentFund = 57997;  //change this using the updateCurrentFund() function
const currentFundText = document.getElementById('currentFundText'); //Gets the text that will display the current fund
currentFundText.innerText = "$" + currentFund.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //Displays the current fund with comma ($1000 -> $1.000)

//Variables for the percentage
const targetProgress = Math.round((currentFund/targetFund)*100); //Calculate the percentage
const targetProgressText = document.getElementById('targetProgressText'); //should be self-explanatory by now
targetProgressText.innerText = targetProgress + "%";

//Variables for the amount of donors
let totalDonors = 2487; //Replace this using the updateTotalDonors() function
const totalDonorsText = document.getElementById('totalDonorsText');
totalDonorsText.innerText = totalDonors;

//Function you need to call with the Stripe API to change the current fund
function updateCurrentFund(newFund){
    currentFund = newFund;
}

//Function you need to call with the Stripe API to change the amount of donors
function updateTotalDonors(newTotalDonors){
    totalDonors = newTotalDonors;
}
/*--------------*/

///Simulate progress increase over time
const progressBar = document.getElementById('myProgressBar');
let progress = 0;

function updateProgress() {
    if (progress <= targetProgress) {
        progressBar.style.width = `${progress}%`;
        progress++;
        setTimeout(updateProgress, 10);
    }
}

updateProgress();
/*--------------*/

///Read More Function
function toggleReadMore() {
    const textContainer = document.getElementById('descriptionTextContainer');
    textContainer.classList.toggle('show-more');

    const readMoreBtn = document.querySelector('.read-more-btn');
    readMoreBtn.textContent = textContainer.classList.contains('show-more') ? 'Read Less' : 'Read More';
}
/*--------------*/

///Functions for the "Recent-Donators"-Bar
const donationText = document.getElementById('donationText');
let messageIndex = 0; //index of message


//If you want to change the Interval, you have to change the animation duration in styles.css to the same value
let messageChangeInterval = 5//seconds;

//Array of messages - dummy data
let messages = [
    "Dale Carnegie donated $20",
    "Bill Clinton donated $60",
    "Simone Jefferson donated $10",
    "Felix Luckman donated $30",
    "Mathilda Junior donated $80",
]

function showNotification() {
    var popupSection = document.getElementById('NotificationSection');
    updateNotification(messageIndex);
    messageIndex += 1; //increase message index by 1 ti show the next message the next time
}

showNotification();

setInterval(showNotification, messageChangeInterval*1000); //Change the message every 5s

function updateNotification(messageIndex) {
    //Check if the index is bigger than the amount of messages - if it is, bring it back to zero
    if(messageIndex > messages.length - 1){
        messageIndex = 0;
    }

    //Update/Change the notification
    donationText.textContent = messages[messageIndex];
}

//Function to add a new name to the messages array
//Call every time a new person donates and fill in the varibales with the Stripe API
function addMessage(donorName, currency, amount){
    var message = donorName + " donated " + currency + amount; //Create the message

    messages.push(message); //Add new message to the messages array
    messages.shift(); //Remove the first message from the messages array
}
/*--------------*/

///Functions for changing the currencies
const currencySymbol = document.getElementById('currencySymbol');
const currencyMenu = document.getElementById('currencyMenu');

// Add event listener to detect changes in the currency menu
currencyMenu.addEventListener('change', function () {
    updateSelectedCurrency();
});

// Function to update the selected currency
function updateSelectedCurrency() {
    const selectedCurrencyCode = currencyMenu.value;
    const selectedCurrencyData = currencies.find(currency => currency.code === selectedCurrencyCode);
    if (selectedCurrencyData) {
        currencySymbol.textContent = selectedCurrencyData.symbol;
    }
}

// Array of supported currencies
const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    // Add more currencies as needed
];
/*--------------*/


///Functions for submitting the donation form
const stripeCheckoutSection = document.getElementById('stripeCheckoutSection');
const errorSection = document.getElementById('errorSection');

const fundButton = document.getElementById('fundButton');
const emailField = document.querySelector('input[name="email"]');
const amountField = document.querySelector('input[name="amount"]');

let donationAmount = 0; //The variable you need to use for your stripe chckout

// Add event listener to the button to toggle the display of the Stripe Checkout section
fundButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior -> usually updates the page, which we don't want

    // Check if email and amount fields are filled in
    if (validateForm()) {
        // If email and amount fields are filled in, show the Stripe Checkout
        toggleStripeCheckoutSection();
    } else {
        // If email and amount fields are not filled in, show the Error Message
        errorSection.style.display = 'block';
    }
});

fundButton.addEventListener('mouseover', function () {
    //If the fields are filled in, the cursor should be a pointer on hover
    //If the fields aren't filled in, the cursor should be that "not-allowed"-cursor on hover
    fundButton.style.cursor = validateForm() ? 'pointer' : 'not-allowed';
});

// Function to toggle the display of the Stripe Checkout section
function toggleStripeCheckoutSection() {
    //Set the donation amount to whatever was put in the field for later use with the Stripe API
    //If the checkout is displayed, that means that the amount field is filled in so we can store the donation amount here
    donationAmount = amountField.value;

    stripeCheckoutSection.style.display = 'block'; //Activate the Stripe Checkout section
    errorSection.style.display = 'none'; //Deactivate the error section ("Invalid E-Mail or funding amount!") just in case it was displayed
}

// Function to validate the form
function validateForm() {
    return emailField.value.trim() !== '' && amountField.value.trim() !== '';
}
/*--------------*/
