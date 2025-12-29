function callBackend() {
  fetch("http://backend:5000/")
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText = data.message;
    })
    .catch(() => {
      document.getElementById("result").innerText = "Backend not reachable";
    });
}
