var invoke_make_blank = true;

$("#loginForm").submit(function(e) {
  e.preventDefault();
});

function pageType() {
  localStorage.setItem('isBanking', document.getElementsByClassName("banking").length);
  localStorage.setItem('isCU', document.getElementsByClassName("credit-union").length);
}

function validate() {
  const password = document.getElementById("password").value;
  const username = document.getElementById("first_name").value;
  const isBanking = localStorage.getItem('isBanking');
  const isCU = localStorage.getItem('isCU');
  var loggedIn = false;

  if (username.length > 1 && password == "glia123") {
    loggedIn = true;
    localStorage.setItem('loggingStatus', loggedIn);
    localStorage.setItem('username', username);
    if (isBanking > 0) {
      window.location = "account-summary-banking.html";
      return true;
    } else if (isCU > 0) {
      window.location = "account-summary-credit-union.html";
      return true;
    } else {
      window.location = "account-summary-insurance.html";
      return true;
    }

  } else if (!(username.length > 1 && password == "glia123") && invoke_make_blank) {
    var newDiv = document.createElement("div");
    var newContent = document.createTextNode("*Failed Login Attempt");
    newDiv.appendChild(newContent);
    newDiv.id = "error-login";
    var element = document.getElementById("username-div");
    var child = document.getElementById("username-label");
    element.insertBefore(newDiv, child);
    invoke_make_blank = false;
    loggedIn = false;
    localStorage.setItem('loggingStatus', loggedIn);
    return false;
  }
}

function loggingToggle() {
  const loggedStatus = localStorage.getItem('loggingStatus');
  const username = localStorage.getItem('username');
  const isBanking = localStorage.getItem('isBanking');
  const isCU = localStorage.getItem('isCU');
  if (loggedStatus) {
    document.getElementsByClassName("login-section")[0].innerHTML = "<div class='control-label'>Welcome, " + username + "</div><a href='index.html' id='log-out'><span class='tooltiptext'>Log Out</span><img id='logout-icon' src='images/logout.png'</a>";
    logOut();

  } else {
      if (isBanking > 0) {
        document.getElementsByClassName("login-section")[0].innerHTML = "<a href='login-credit-union.html' class='btn btn-default log-in'>Log In</a>";
      } else if (isCU > 0){
        document.getElementsByClassName("login-section")[0].innerHTML = "<a href='login-banking.html' class='btn btn-default log-in'>Log In</a>";
      } else {
        document.getElementsByClassName("login-section")[0].innerHTML = "<a href='login-insurance.html' class='btn btn-default log-in'>Log In</a>";
      }
  }
}

function logOut() {
  const logOutButton =  document.getElementById("log-out");
  logOutButton.addEventListener("click", function() {
    localStorage.removeItem('loggingStatus', 'username');
  });
}
