# Interactive-Form
Project 3 for Treehouse Full Stack JavaScript Techdegree
JavaScript enhanced interactive registration form.

## Description:
An interactive form that uses JavaScript to enhance interactivity and perform validation. Form provides helpful error messages when the user interacts with the form.

## Technologies used:
- HTML
- CSS
- JavaScript

## Real-time error messages
- Basic Info Section
  - Name input - Name field cannot be blank

- Payment Info Section
  - Expiration Date - error if none selected
  - Expiration Year - error if none selected
  - Credit Card - Credit card number must be between 13 - 16 digits
  - ZipCode - Zip Code must be 5 digits
  - CVV - CVV must be 3 digits

 ## Conditional error messages for email input
 -	User will receive error message as to which part of email address is formatted incorrectly
   - Conditional errors based on user email input
     - invalid username
     - missing @ symbol
     - invalid email domain 
   - note: validator only accepts .com top level domain