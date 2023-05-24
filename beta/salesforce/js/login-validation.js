var invoke_make_blank = true;

$("#loginForm").submit(function(e) {
  e.preventDefault();
});

function pageType() {
  localStorage.setItem('isBanking', document.getElementsByClassName("banking").length);
}

function validate() {
  const password = document.getElementById("password").value;
  const username = document.getElementById("email").value;
  const isBanking = localStorage.getItem('isBanking');
  var loggedIn = false;

  if (username.length > 1 && password == "glia123") {
    loggedIn = true;
    localStorage.setItem('loggingStatus', loggedIn);
    localStorage.setItem('username', username);
    document.getElementById("loginForm").submit();
    //return true;
    
    

    window.location = "account-summary-banking.html";
    return true;    


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

function logOut() {
  const logOutButton =  document.getElementById("log-out");
  logOutButton.addEventListener("click", function() {
    localStorage.removeItem('loggedin', 'memberId');
  });
}
