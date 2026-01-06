const tableBody = document.getElementById("table-body");
const nameInput = document.getElementById("name");
const courseInput = document.getElementById("course");
const saveBtn = document.getElementById("save");

let editId = null;   


function loadData() {
  fetch("http://13.60.98.204:5000/data")
    .then(res => res.json())
    .then(data => {
      tableBody.innerHTML = "";

      data.forEach((s, index) => {
        const row = document.createElement("tr");
        row.id = `row-${s.id}`;

        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${s.name}</td>
          <td>${s.course}</td>
          <td>
            <button type="button" onclick="editRow(${s.id}, '${s.name}', '${s.course}')"> Edit</button>
            <button type="button" onclick="deleteRow(${s.id})">Delete</button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    });
}


function editRow(id, name, course) {
  nameInput.value = name;
  courseInput.value = course;

  editId = id;
  saveBtn.textContent = "Update";

  
  const row = document.getElementById(`row-${id}`);
  if (row) row.style.display = "none";
}


saveBtn.onclick = () => {
  const name = nameInput.value.trim();
  const course = courseInput.value.trim();

  if (!name || !course) return;

  
  if (editId !== null) {
    fetch(`http://13.60.98.204:5000/update/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course })
    })
    .then(() => {
      editId = null;
      saveBtn.textContent = "Add";
      nameInput.value = "";
      courseInput.value = "";
      loadData();
    });
  }
  
  else {
    fetch("http://13.60.98.204:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course })
    })
    .then(() => {
      nameInput.value = "";
      courseInput.value = "";
      loadData();
    });
  }
};


function deleteRow(id) {
  fetch(`http://13.60.98.204:5000/delete/${id}`, {
    method: "DELETE"
  })
  .then(() => loadData());
}



loadData();

