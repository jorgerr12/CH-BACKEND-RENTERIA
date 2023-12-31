const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm")

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(registerForm);
  const registerPayload = Object.fromEntries(data);

  await fetch("http://localhost:8080/api/session/register", {
    method: "POST",
    body: JSON.stringify(registerPayload),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(res =>{
    if(res.status === "success"){
      sessionStorage.setItem("user", JSON.stringify(res.user));
      location.href = '/products';
    }
  })
  .catch((err) => console.log(err));
});

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  const loginPayload = Object.fromEntries(data);

  await fetch("http://localhost:8080/api/session/login", {
    method: "POST",
    body: JSON.stringify(loginPayload),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(res =>{
    if(res.status === "success"){ 
       sessionStorage.setItem("user", JSON.stringify(res.user));
       location.href = '/products';
     }
  })
  .catch((err) => console.log(err));
});