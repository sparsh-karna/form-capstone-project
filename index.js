document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const table = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];

    loadTableData();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        const birthDate = new Date(dob);
        const age = calculateAge(birthDate);
        if (age < 18 || age > 55) {
            alert('You must be between 18 and 55 years old to register.');
            return;
        }

        const row = table.insertRow();
        row.innerHTML = `<td>${name}</td><td>${email}</td><td>${password}</td><td>${dob}</td><td>${terms}</td>`;

        saveToLocalStorage({name, email, password, dob, terms});

        form.reset();
    });
});

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function saveToLocalStorage(data) {
    let entries = JSON.parse(localStorage.getItem('formEntries')) || [];
    entries.push(data);
    localStorage.setItem('formEntries', JSON.stringify(entries));
}

function loadTableData() {
    const table = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    const entries = JSON.parse(localStorage.getItem('formEntries')) || [];
    entries.forEach(entry => {
        const row = table.insertRow();
        row.innerHTML = `<td>${entry.name}</td><td>${entry.email}</td><td>${entry.password}</td><td>${entry.dob}</td><td>${entry.terms}</td>`;
    });
}