const data = JSON.parse(sessionStorage.getItem("user"));
const btnUsername = document.getElementById("btnUsername");
btnUsername.innerHTML = data.firstName
console.log(data.firstName)