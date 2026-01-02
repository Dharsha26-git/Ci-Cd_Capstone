document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("table-body");

  function loadData() {
    fetch("http://localhost:5000/data")
      .then(res => res.json())
      .then(data => {
        tableBody.innerHTML = "";

        data.forEach((student, index) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td>${index + 1}</td>

            <td>
              <span class="name-text">${student.name}</span>
              <input class="name-input" value="${student.name}" style="display:none" />
            </td>

            <td>
              <span class="course-text">${student.course}</span>
              <input class="course-input" value="${student.course}" style="display:none" />
            </td>

            <td>
              <button class="edit-btn">Edit</button>
              <button class="save-btn" style="display:none">Save</button>
              <button class="delete-btn">Delete</button>
            </td>
            `;


          const editBtn = row.querySelector(".edit-btn");
          const saveBtn = row.querySelector(".save-btn");
          const deleteBtn = row.querySelector(".delete-btn");

          const nameText = row.querySelector(".name-text");
          const courseText = row.querySelector(".course-text");
          const nameInput = row.querySelector(".name-input");
          const courseInput = row.querySelector(".course-input");

          
          editBtn.addEventListener("click", () => {
            nameText.style.display = "none";
            courseText.style.display = "none";
            nameInput.style.display = "inline";
            courseInput.style.display = "inline";

            editBtn.style.display = "none";
            saveBtn.style.display = "inline";
          });

          
          saveBtn.addEventListener("click", () => {
            fetch(`http://localhost:5000/update/${student.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: nameInput.value,
                course: courseInput.value
              })
            })
            .then(() => {
              nameText.textContent = nameInput.value;
              courseText.textContent = courseInput.value;

              nameText.style.display = "inline";
              courseText.style.display = "inline";
              nameInput.style.display = "none";
              courseInput.style.display = "none";

              saveBtn.style.display = "none";
              editBtn.style.display = "inline";
            });
          });

          
          deleteBtn.addEventListener("click", () => {
            if (!confirm("Are you sure you want to delete this record?")) return;

            fetch(`http://localhost:5000/delete/${student.id}`, {
              method: "DELETE"
            })
            .then(() => {
              row.remove();
            });
          });

          tableBody.appendChild(row);
        });
      });
  }

  
  document.getElementById("add").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const course = document.getElementById("course").value;

    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, course })
    })
    .then(() => {
      document.getElementById("name").value = "";
      document.getElementById("course").value = "";
      loadData();
    });
  });

  loadData();
});
