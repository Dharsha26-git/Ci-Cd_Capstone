document.getElementById("check").addEventListener("click", () => {
  fetch("http://localhost:5000/health")
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText =
        "Backend is running";
    })
    .catch(err => {
      document.getElementById("result").innerText =
        "Backend not reachable";
    });
});
