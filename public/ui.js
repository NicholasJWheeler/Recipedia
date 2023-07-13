import { AuthErrorCodes } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Initialize Constants for hiding/showing Email + Password login
// based on the auth state. These const variables are used elsewhere
export const txtEmail = document.querySelector('#txtEmail')
export const txtPassword = document.querySelector('#txtPassword')
export const btnLogin = document.querySelector('#btnLogin')
export const btnSignup = document.querySelector('#btnSignup')
export const btnLogout = document.querySelector('#btnLogout')
export const divAuthState = document.querySelector('#divAuthState')
export const lblAuthState = document.querySelector('#lblAuthState')
export const divLoginError = document.querySelector('#divLoginError')
export const lblLoginErrorMessage = document.querySelector('#lblLoginErrorMessage')

// Initialize functions to be used in the app.js file to show/hide UI elements
export const showLoginForm = () => {
  login.style.display = 'block'
  app.style.display = 'none'  
}

export const showApp = () => {
  login.style.display = 'none'
  app.style.display = 'block'
}

export const hideLoginError = () => {
  divLoginError.style.display = 'none'
  lblLoginErrorMessage.innerHTML = ''
}

export const showLoginError = (error) => {
  divLoginError.style.display = 'block'    
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`
  }
  else {
    lblLoginErrorMessage.innerHTML = `Invalid email or password, try again.`      
  }
}

export const showLoginState = (user) => {
  lblAuthState.innerHTML = `You're logged in as ${user.displayName} (uid: ${user.uid}, email: ${user.email}) `
}

hideLoginError()