console.log("JS LOADED");

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("check");
  const result = document.getElementById("result");

  btn.addEventListener("click", function () {
    fetch("http://localhost:5000/health")
      .then(res => res.json())
      .then(data => {
        result.innerText = "Backend is UP and running";
      })
      .catch(err => {
        result.innerText = "Backend not reachable";
      });
  });
});
