/* eslint-disable no-use-before-define */

$(document).ready(() => {
  M.AutoInit(); // Initialize Toasts
  // Getting references to our form and inputs
  let loginForm = $("form.login");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      M.toast({ html: "Ooops! <br> You forgot to enter your email and/or password.", classes: "rounded" });
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the dashboard page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/dashboard");
      })
      .catch((error) => { // If there's an error, log the error
        console.log(`An error occured: ${JSON.stringify(error)}`);
        if (error.status === 401) {
          M.toast({ html: "Ooops! <br> Wrong email and/or password.", classes: "rounded" });
        }
      });
  }
});
