const customerForm = document.getElementById("person-form");
const submitBtn = document.getElementById("submit-btn");
const deleteBtn = document.getElementById("delete-btn");
const clearBtn = document.getElementById("clear-btn");

async function loadCustomers() {
  const container = document.getElementById("customer-list");
  try {
    const res = await fetch("/api/persons");
    
    if (!res.ok) {
      container.innerHTML = "<p style='color:red;'>Server error: " + res.status + "</p>";
      return;
    }

    const data = await res.json();
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No customers found.</p>";
      return;
    }

    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";
      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong>
        <div style="font-size: 0.85rem; color: #666;">${person.email}</div>
      `;
      div.addEventListener("click", () => fillForm(person));
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Fetch error:", err);
    container.innerHTML = "<p style='color:red;'>Connection error. Is the backend running?</p>";
  }
}

function fillForm(person) {
  document.getElementById("person-id").value = person.id;
  document.getElementById("first_name").value = person.first_name;
  document.getElementById("last_name").value = person.last_name;
  document.getElementById("email").value = person.email;
  document.getElementById("phone").value = person.phone || "";
  
  if (person.birth_date) {
    document.getElementById("birth_date").value = person.birth_date.split('T')[0];
  } else {
    document.getElementById("birth_date").value = "";
  }
  
  submitBtn.textContent = "Update Customer";
  deleteBtn.style.display = "inline-block";
}

customerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("person-id").value;
  const personData = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    birth_date: document.getElementById("birth_date").value || null
  };

  const url = id ? `/api/persons/${id}` : "/api/persons";
  const method = id ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData)
    });

    if (res.ok) {
      resetForm();
      loadCustomers();
    } else {
      const errRes = await res.json();
      alert("Error: " + (errRes.error || "Action failed"));
    }
  } catch (err) {
    alert("Request failed. Check console.");
  }
});

deleteBtn.addEventListener("click", async () => {
  const id = document.getElementById("person-id").value;
  if (!id || !confirm("Are you sure you want to delete this customer?")) return;

  try {
    const res = await fetch(`/api/persons/${id}`, { method: "DELETE" });
    if (res.ok) {
      resetForm();
      loadCustomers();
    }
  } catch (err) {
    alert("Delete failed.");
  }
});

function resetForm() {
  customerForm.reset();
  document.getElementById("person-id").value = "";
  submitBtn.textContent = "Add Customer";
  deleteBtn.style.display = "none";
}

clearBtn.addEventListener("click", resetForm);

loadCustomers();