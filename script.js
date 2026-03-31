// ===== HEADER =====
let header = document.createElement("div");
header.className = "header";
header.innerText = "Weekly Report Management System";
document.body.appendChild(header);

// ===== LOGIN =====
let loginCard = document.createElement("div");
loginCard.className = "card";

let input = document.createElement("input");
input.placeholder = "Enter your name";

let loginBtn = document.createElement("button");
loginBtn.innerText = "Login";

loginCard.appendChild(input);
loginCard.appendChild(loginBtn);

document.body.appendChild(loginCard);

// ===== DASHBOARD =====
let dashboard = document.createElement("div");
dashboard.style.display = "none";
document.body.appendChild(dashboard);

// Welcome
let welcome = document.createElement("h2");
dashboard.appendChild(welcome);

// ===== DATA =====
let general = JSON.parse(localStorage.getItem("general")) || [];
let faculty = JSON.parse(localStorage.getItem("faculty")) || [];
let students = JSON.parse(localStorage.getItem("students")) || [];

// ===== GENERAL POINTS =====
let generalCard = document.createElement("div");
generalCard.className = "card";

let gTitle = document.createElement("h3");
gTitle.innerText = "General Points";

let gInput = document.createElement("input");

let gBtn = document.createElement("button");
gBtn.innerText = "Add";

let gList = document.createElement("ul");

generalCard.appendChild(gTitle);
generalCard.appendChild(gInput);
generalCard.appendChild(gBtn);
generalCard.appendChild(gList);

dashboard.appendChild(generalCard);

// ===== FACULTY =====
let facCard = document.createElement("div");
facCard.className = "card";

let fTitle = document.createElement("h3");
fTitle.innerText = "Faculty Achievements";

let fName = document.createElement("input");
fName.placeholder = "Name";

let fAch = document.createElement("input");
fAch.placeholder = "Achievement";

let fBtn = document.createElement("button");
fBtn.innerText = "Add";

let fTable = document.createElement("table");

facCard.appendChild(fTitle);
facCard.appendChild(fName);
facCard.appendChild(fAch);
facCard.appendChild(fBtn);
facCard.appendChild(fTable);

dashboard.appendChild(facCard);

// ===== STUDENTS =====
let stuCard = document.createElement("div");
stuCard.className = "card";

let sTitle = document.createElement("h3");
sTitle.innerText = "Student Achievements";

let sName = document.createElement("input");
sName.placeholder = "Name";

let sRoll = document.createElement("input");
sRoll.placeholder = "Roll No";

let sAch = document.createElement("input");
sAch.placeholder = "Achievement";

let sBtn = document.createElement("button");
sBtn.innerText = "Add";

let sTable = document.createElement("table");

stuCard.appendChild(sTitle);
stuCard.appendChild(sName);
stuCard.appendChild(sRoll);
stuCard.appendChild(sAch);
stuCard.appendChild(sBtn);
stuCard.appendChild(sTable);

dashboard.appendChild(stuCard);

// ===== PREVIEW =====
let previewCard = document.createElement("div");
previewCard.className = "card";

let pTitle = document.createElement("h3");
pTitle.innerText = "Report Preview";

let preview = document.createElement("pre");

previewCard.appendChild(pTitle);
previewCard.appendChild(preview);

dashboard.appendChild(previewCard);

// ===== LOGIN FUNCTION =====
loginBtn.onclick = () => {
    if(input.value === "") return alert("Enter name");

    loginCard.style.display = "none";
    dashboard.style.display = "block";
    welcome.innerText = "Welcome " + input.value;

    loadData();
};

// ===== ADD FUNCTIONS =====
gBtn.onclick = () => {
    if(!gInput.value) return;
    general.push(gInput.value);
    localStorage.setItem("general", JSON.stringify(general));
    loadData();
};

fBtn.onclick = () => {
    if(!fName.value || !fAch.value) return;
    faculty.push({name: fName.value, ach: fAch.value});
    localStorage.setItem("faculty", JSON.stringify(faculty));
    loadData();
};

sBtn.onclick = () => {
    if(!sName.value || !sRoll.value || !sAch.value) return;
    students.push({name: sName.value, roll: sRoll.value, ach: sAch.value});
    localStorage.setItem("students", JSON.stringify(students));
    loadData();
};

// ===== LOAD DATA =====
function loadData() {

    // GENERAL
    gList.innerHTML = "";
    general.forEach(g => {
        let li = document.createElement("li");
        li.innerText = g;
        gList.appendChild(li);
    });

    // FACULTY
    fTable.innerHTML = `
        <tr><th>Name</th><th>Achievement</th></tr>
    `;
    faculty.forEach(f => {
        let row = fTable.insertRow();
        row.insertCell(0).innerText = f.name;
        row.insertCell(1).innerText = f.ach;
    });

    // STUDENTS
    sTable.innerHTML = `
        <tr><th>Name</th><th>Roll</th><th>Achievement</th></tr>
    `;
    students.forEach(s => {
        let row = sTable.insertRow();
        row.insertCell(0).innerText = s.name;
        row.insertCell(1).innerText = s.roll;
        row.insertCell(2).innerText = s.ach;
    });

    updatePreview();
}

// ===== PREVIEW =====
function updatePreview() {
    let text = "WEEKLY REPORT\n\n";

    text += "GENERAL POINTS:\n";
    general.forEach(g => text += "- " + g + "\n");

    text += "\nFACULTY ACHIEVEMENTS:\n";
    faculty.forEach(f => text += `- ${f.name}: ${f.ach}\n`);

    text += "\nSTUDENT ACHIEVEMENTS:\n";
    students.forEach(s => text += `- ${s.name} (${s.roll}): ${s.ach}\n`);

    preview.innerText = text;
}