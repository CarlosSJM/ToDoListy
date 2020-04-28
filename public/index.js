/** author : Carlos San Juan Martin */
var template = document.querySelector("#item");

console.log(c);
var c = 0;
function updateId () {
  if (c == 0) {
    c = document.getElementById("elements").childElementCount;
  }
  c++;
  document.getElementById("id").value = c;
}

function codeAddress() {
  alert('ok');
}

const LIST = "list";
const EDIT = "edit";

var estado = {
    "action" : EDIT,
    "elem" : null
};


function loadInfo() {
  var elements = document.getElementById("elements");
  while (elements.firstChild) {
  elements.removeChild(elements.firstChild);
  }
  //console.log(elements);
  fetch("http://localhost:3000/toDoElement")
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    data.forEach(function(element) {
      if (element != null) {

        var todoSectionContainer = document.createElement('div');
        todoSectionContainer.classList.add('todoSectionContainer'); 
        todoSectionContainer.id=`${element.id}`; 
        
        var todoSection = document.createElement('div');
        todoSection.classList.add('todoSection'); 
        if (element !== null) {
          //console.log(element);
          var y = document.createElement('p');
          y.classList.add('title'); 
          y.innerHTML = element.title;
          todoSection.appendChild(y);
          
          var z = document.createElement('p'); 
          z.classList.add('description');
          z.innerHTML = element.description;
          todoSection.appendChild(z);

          var buttonContainer = document.createElement('div'); 
          buttonContainer.classList.add('buttonContainer');

          var x = document.createElement('button'); 
          x.classList.add('button');
          x.innerHTML = "DELETE";
          buttonContainer.appendChild(x);
          x.addEventListener('click',() => {    
            deleteInfo(element);
          });
          
          var x2 = document.createElement('button'); 
          x2.classList.add('updateButton');
          x2.innerHTML = "EDIT";
          buttonContainer.appendChild(x2);
          x2.addEventListener("click", function(){
            switch (estado.action) {
              case EDIT:
              infoToForm(element, data);
              break;
              default:
              updateInfo(element);
            }
          }, false);
          todoSection.appendChild(buttonContainer);
        }
        todoSectionContainer.appendChild(todoSection);
        elements.appendChild(todoSectionContainer);
      }

    });
  })
};
loadInfo();



function sendInfo() {
  updateId ();
  var title=document.getElementById("tituloToDoList").value;
  var description=document.getElementById("descripcionToDoList").value;
  var id=document.getElementById("id").value;
  //console.log(id);
  var toDoElement = {
    id,
    title,
    description,
  };
  //console.log(toDoElement);
  fetch("http://localhost:3000/toDoElement",
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toDoElement)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      loadInfo();
    });
};



function deleteInfo(element) {
  
  fetch("http://localhost:3000/toDoElement" + '/' + element.id, {
    method: 'delete'
  })
  .then(function(myJson) {
    loadInfo();
  });
};







function updateInfo(element) {
  estado.action = EDIT;


  var buttonForm = document.querySelector("#buttonForm");
  buttonForm.classList.remove('pointersEventsNone'); 
  buttonForm.classList.remove('disabled'); 



  var title=document.getElementById("tituloToDoList").value;
  var description=document.getElementById("descripcionToDoList").value;
  var id=document.getElementById("id").value;
  document.getElementById("tituloToDoList").value = ""
  document.getElementById("descripcionToDoList").value = ""
  document.getElementById("id").value = ""
  //console.log(id);

  var toDoElement = {
    id,
    title,
    description,
  };
  return fetch("http://localhost:3000/toDoElement" + '/' + element.id, {
    method: 'put',
    body: JSON.stringify(toDoElement),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(function(myJson) {
    loadInfo();
  })


};




function infoToForm(element, data) {
  estado.action = LIST;
  if (element !== null) {
    //console.log(element);

    var titleForm = document.querySelector('#tituloToDoList');
    titleForm.value = element.title;
    
    var descriptionForm = document.querySelector('#descripcionToDoList');
    descriptionForm.value = element.description;
    
    
    var idForm = document.querySelector('#id');
    idForm.value = element.id;

    var filteredData = data.filter(function (el) {
      return el != null;
    });

    console.log(filteredData);
    var elIndex = filteredData.indexOf(element);
    console.log(elIndex);

    var i = 0;
    var x = document.getElementsByClassName("updateButton");
    var y = document.getElementsByClassName("button");
    i=0;

    var buttonForm = document.querySelector("#buttonForm");
    console.log(buttonForm);
    buttonForm.classList.add('pointersEventsNone'); 
    buttonForm.classList.add('disabled'); 
    x[elIndex].classList.add('active'); 

    while (i < x.length) {
      
      //console.log(x[i]);
      if (i != elIndex) {
        x[i].classList.add('pointersEventsNone'); 
        x[i].classList.add('disabled'); 
        console.log("añade disabled en pos:"+i)
      }
      y[i].classList.add('pointersEventsNone'); 
      y[i].classList.add('disabledDelete'); 
    i++;
    }

    
  }
}