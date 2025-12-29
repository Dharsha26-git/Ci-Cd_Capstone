function loadData() {
  fetch("http://backend:5000/")
    .then(response => response.json())
    .then(data => {
      document.getElementById("result").innerText = data.message;
    })
    .catch(error => {
      document.getElementById("result").innerText = "Backend not reachable";
    });
}
