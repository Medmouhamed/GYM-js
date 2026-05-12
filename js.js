let nameInput = document.getElementById('name');
let program = document.getElementById('program');
let height = document.getElementById('height');
let weight = document.getElementById('weight');
let bmi = document.getElementById('bmi');
let subscription = document.getElementById('subscription');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

function calculateBMI() {
  if (height.value != '' && weight.value != '') {
    let h = +height.value / 100;
    let result = (+weight.value / (h * h)).toFixed(2);
    bmi.innerHTML = 'BMI: ' + result;
    bmi.style.background = '#040';
    bmi.style.color = '#fff';
    bmi.style.padding = '5px';
    bmi.style.borderRadius = '5px';
  } else {
    bmi.innerHTML = '';
  }
}

let members;
if (localStorage.members != null) {
  members = JSON.parse(localStorage.members);
} else {
  members = [];
}

submit.onclick = function () {
  let newMember = {
    name: nameInput.value.toLowerCase(),
    program: program.value.toLowerCase(),
    height: height.value,
    weight: weight.value,
    bmi: bmi.innerHTML.replace('BMI: ', ''),
    subscription: subscription.value.toLowerCase(),
  };

  if (nameInput.value != '' && program.value != '') {
    if (mood === 'create') {
      members.push(newMember);
    } else {
      members[tmp] = newMember;
      mood = 'create';
      submit.innerHTML = 'Create';
    }
    clearData();
  }

  localStorage.setItem('members', JSON.stringify(members));
  showData();
};

function clearData() {
  nameInput.value = '';
  program.value = '';
  height.value = '';
  weight.value = '';
  bmi.innerHTML = '';
  subscription.value = '';
}

function showData() {
  let table = '';
  for (let i = 0; i < members.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${members[i].name}</td>
        <td>${members[i].program}</td>
        <td>${members[i].height}</td>
        <td>${members[i].weight}</td>
        <td>${members[i].bmi}</td>
        <td>${members[i].subscription}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
      </tr>
    `;
  }

  document.getElementById('tbody').innerHTML = table;

  let btndelete = document.getElementById('deleteAll');
  if (members.length > 0) {
    btndelete.innerHTML = `<button onclick="deleteAll()">Delete All (${members.length})</button>`;
  } else {
    btndelete.innerHTML = '';
  }

  calculateBMI();
}

showData();

function deleteData(i) {
  members.splice(i, 1);
  localStorage.members = JSON.stringify(members);
  showData();
}

function deleteAll() {
  localStorage.clear();
  members.splice(0);
  showData();
}

function updateData(i) {
  nameInput.value = members[i].name;
  program.value = members[i].program;
  height.value = members[i].height;
  weight.value = members[i].weight;
  subscription.value = members[i].subscription;
  calculateBMI();
  submit.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}

let searchMood = 'name';

function getSearchMood(id) {
  let search = document.getElementById('search');
  if (id == 'searchName') {
    searchMood = 'name';
    search.placeholder = 'Search by name';
  } else {
    searchMood = 'program';
    search.placeholder = 'Search by program';
  }
  search.focus();
  search.value = '';
  showData();
}

function searchData(value) {
  let table = '';
  if (searchMood == 'name') {
    for (let i = 0; i < members.length; i++) {
      if (members[i].name.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${members[i].name}</td>
            <td>${members[i].program}</td>
            <td>${members[i].height}</td>
            <td>${members[i].weight}</td>
            <td>${members[i].bmi}</td>
            <td>${members[i].subscription}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < members.length; i++) {
      if (members[i].program.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${members[i].name}</td>
            <td>${members[i].program}</td>
            <td>${members[i].height}</td>
            <td>${members[i].weight}</td>
            <td>${members[i].bmi}</td>
            <td>${members[i].subscription}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}
