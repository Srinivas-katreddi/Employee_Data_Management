const apiUrl = "https://h3rvcc4sib.execute-api.ap-northeast-3.amazonaws.com/api/Employee";

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.emp-table')) {
    loadEmployees();
    setupSearch();
    setupButtons();
  }
  if (document.querySelector('.new form')) {
    setupAddOrUpdateForm();
  }
});

async function loadEmployees() {
  try {
    const res = await fetch(apiUrl);
    const employees = await res.json();
    populateTable(employees);
  } catch (err) {
    console.error('Failed to load employees:', err);
  }
}

function populateTable(employees) {
  const tbody = document.querySelector('.emp-table tbody');
  tbody.innerHTML = ''; 
  employees.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.Emp_Id}</td>
      <td>${emp.Emp_name}</td>
      <td>${emp.Emp_email}</td>
      <td>${emp.Emp_dept}</td>
      <td>${emp.Emp_position}</td>
      <td>${emp.Emp_salary}</td>
    `;
    tbody.appendChild(tr);
  });
}

function setupSearch() {
  const searchInput = document.querySelector('input[type="search"]');
  searchInput.addEventListener('input', async e => {
    const filteredName = e.target.value.trim();
    if (filteredName === '') {
      loadEmployees();
    } else {
      try {
        const res = await fetch(apiUrl);
        const employees = await res.json();
        const filtered = employees.filter(emp =>
          emp.Emp_name.toString().includes(filteredName)
        );
        populateTable(filtered);
      } catch {
        console.error('Search failed');
      }
    }
  });
}

function setupButtons() {
  const addBtn = document.querySelector('.btns button:nth-child(1)');
  const deleteBtn = document.querySelector('.btns button:nth-child(2)');
  const updateBtn = document.querySelector('.btns button:nth-child(3)');

  addBtn.onclick = () => {
    window.location.href = './AddEmp.html';
  };

  deleteBtn.onclick = async () => {
  const empId = prompt('Enter Employee ID to delete:');
  if (!empId) return alert('Employee ID is required!');

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Failed to fetch employees');
    const employees = await res.json();
    const employeeExists = employees.some(emp => emp.Emp_Id === empId);

    if (!employeeExists) {
      alert(`Employee with ID ${empId} does not exist.`);
      return;
    }
    const deleteRes = await fetch(apiUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Emp_Id: empId })
    });

    if (deleteRes.ok) {
      alert(`Employee ${empId} deleted.`);
      loadEmployees();
    } else {
      alert('Delete failed.');
    }
  } catch (err) {
    alert('Delete request failed: ' + err.message);
  }
};

  updateBtn.onclick = () => {
    const empId = prompt('Enter Employee ID to update:');
    if (!empId) return alert('Employee ID is required!');
    sessionStorage.setItem('updateEmpId', empId);
    window.location.href = './UpdateEmp.html';
  };
}

function setupAddOrUpdateForm() {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input');
  const isUpdatePage = window.location.pathname.includes('UpdateEmp.html');

  if (isUpdatePage) {
    let empId = sessionStorage.getItem('updateEmpId') || prompt("Enter Employee ID to update:");

    if (!empId) {
      alert('Employee ID is required to update an employee.');
      window.location.href = './index.html';
      return;
    }

    sessionStorage.setItem('updateEmpId', empId);

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return res.json();
      })
      .then(data => {
        const employee = data.find(emp => emp.Emp_Id === empId);
        if (!employee) {
          throw new Error('Employee not found');
        }
        inputs[0].value = employee.Emp_name || '';
        inputs[1].value = employee.Emp_email || '';
        inputs[2].value = employee.Emp_dept || '';
        inputs[3].value = employee.Emp_position || '';
        inputs[4].value = employee.Emp_salary || '';
      })
      .catch(() => {
        alert(`Employee with ID ${empId} not found. Redirecting to dashboard.`);
        sessionStorage.removeItem('updateEmpId');
        window.location.href = './index.html';
      });

    form.addEventListener('submit', e => {
      e.preventDefault();
      updateEmployee(empId);
    });

  } else {
    form.addEventListener('submit', e => {
      e.preventDefault();
      addNewEmployee();
    });
  }
}

function validateInputs(inputs) {
  for (const input of inputs) {
    if (input.value.trim() === '') {
      alert(`Please fill the field: ${input.placeholder}`);
      return false;
    }
    if (input.type === 'number' && isNaN(input.value)) {
      alert(`Invalid number in field: ${input.placeholder}`);
      return false;
    }
  }
  return true;
}

async function addNewEmployee() {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input');
  if (!validateInputs(inputs)) return;

  const newEmpId = inputs[0].value.trim();

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Failed to fetch employees');
    const employees = await res.json();
    const exists = employees.some(emp => emp.Emp_Id === newEmpId);
    if (exists) {
      alert(`Employee with ID ${newEmpId} already exists.`);
      return;
    }
    const empData = {
      Emp_Id: newEmpId,
      Emp_name: inputs[1].value.trim(),
      Emp_email: inputs[2].value.trim(),
      Emp_dept: inputs[3].value.trim(),
      Emp_position: inputs[4].value.trim(),
      Emp_salary: Number(inputs[5].value.trim())
    };

    const postRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empData)
    });

    if (postRes.ok) {
      alert('Employee added successfully');
      window.location.href = './index.html';
    } else {
      alert('Failed to add employee');
    }
  } catch (error) {
    alert('Add request failed: ' + error.message);
  }
}

function updateEmployee(empId) {
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input');
  if (!validateInputs(inputs)) return;

  const empData = {
    Emp_Id: empId,
    Emp_name: inputs[0].value.trim(),
    Emp_email: inputs[1].value.trim(),
    Emp_dept: inputs[2].value.trim(),
    Emp_position: inputs[3].value.trim(),
    Emp_salary: Number(inputs[4].value.trim()),
    action: "update"
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(empData)
  })
    .then(res => {
      if (res.ok) {
        alert('Employee updated successfully');
        sessionStorage.removeItem('updateEmpId');
        window.location.href = './index.html';
      } else {
        alert('Failed to update employee');
      }
    })
    .catch(() => alert('Update request failed.'));
}

function home(){
  window.location.href='./index.html'
}