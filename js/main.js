// Incresed when data will select.
var dataCounter = document.getElementById("datacounter");

// Variables
var grid = document.getElementById("grid");
var joining = document.getElementById("joining");
var fullName = document.getElementById("name");
var course = document.getElementById("course");
var duration = document.getElementById("duration");
var contact = document.getElementById("contact");

// Validation
var valid = document.querySelector("valid-feedback");
var invalid = document.querySelector("invalid-feedback");

// To print cards [Offcanvas]
var offCards = document.getElementById("offcards");

// To print cards [Body]
var cards = document.getElementById("cards");

// To visiable UPDATE button.
var btnUpdate = document.getElementById("update");

// #FUNCTIONS
// To Validate Form [ Validation ]
var formValidate = (current) => {
  var returnTrue = true;

  // if (current === "grid_" || grid.value == "") {
  //   if (grid.value == "") {
  //     grid.classList.add("is-invalid");
  //     grid.classList.remove("is-valid");
  //     returnTrue = false;
  //   } else {
  //     grid.classList.add("is-valid");
  //     grid.classList.remove("is-invalid");
  //   }
  // } else if (current === "joining_" || joining.value == "") {
  //   if (joining.value == "") {
  //     joining.classList.add("is-invalid");
  //     joining.classList.remove("is-valid");
  //     returnTrue = false;
  //   } else {
  //     joining.classList.add("is-valid");
  //     joining.classList.remove("is-invalid");
  //   }
  // } else if (current === "name_" || fullName.value == "") {
  //   if (fullName.value == "") {
  //     fullName.classList.add("is-invalid");
  //     fullName.classList.remove("is-valid");
  //     returnTrue = false;
  //   } else {
  //     fullName.classList.add("is-valid");
  //     fullName.classList.remove("is-invalid");
  //   }
  // } else if (current === "course_" || course.value == "") {
  //   if (course.value == "") {
  //     course.classList.add("is-invalid");
  //     course.classList.remove("is-valid");
  //     returnTrue = false;
  //   } else {
  //     course.classList.add("is-valid");
  //     course.classList.remove("is-invalid");
  //   }
  // } else if (current === "duration_" || duration.value == "") {
  //   if (duration.value == "") {
  //     duration.classList.add("is-invalid");
  //     duration.classList.remove("is-valid");
  //     returnTrue = false;
  //   } else {
  //     duration.classList.add("is-valid");
  //     duration.classList.remove("is-invalid");
  //   }
  // } else if (current === "contact_" || contact.value == "") {
  //   if (contact.value == "") {
  //     contact.classList.add("is-invalid");
  //     contact.classList.remove("is-valid");
  //     returnTrue = false;
  //   } else {
  //     contact.classList.add("is-valid");
  //     contact.classList.remove("is-invalid");
  //   }
  // }

  return returnTrue;
};

// To add data into the Local-Storage [ Create ]
const addData = () => {
  event.preventDefault();

  if (formValidate() == true) {
    grid.classList.remove("is-valid");
    joining.classList.remove("is-valid");
    fullName.classList.remove("is-valid");
    course.classList.remove("is-valid");
    duration.classList.remove("is-valid");
    contact.classList.remove("is-valid");

    var dataList;
    if (localStorage.getItem("dataList") == null) {
      dataList = [];
    } else {
      dataList = JSON.parse(localStorage.getItem("dataList"));
    }

    var student = {
      gridO: grid.value,
      joiningO: joining.value,
      fullNameO: fullName.value,
      courseO: course.value,
      durationO: duration.value,
      contactO: contact.value,
    };

    dataList.push(student);

    localStorage.setItem("dataList", JSON.stringify(dataList));

    displayData();

    grid.value = "";
    joining.value = "";
    fullName.value = "";
    course.value = "";
    duration.value = "";
    contact.value = "";
  }
};

// To update data into the Local-Storage [ Update ]
var updateData = (index) => {

  // To display UPDATE button
  btnUpdate.style.display = "inline-block";

  var dataList;
  if (localStorage.getItem("dataList") == null) {
    dataList = [];
  } else {
    dataList = JSON.parse(localStorage.getItem("dataList"));
  }

  grid.value = dataList[index].gridO;
  joining.value = dataList[index].joiningO;
  fullName.value = dataList[index].fullNameO;
  course.value = dataList[index].courseO;
  duration.value = dataList[index].durationO;
  contact.value = dataList[index].contactO;

  document.querySelector("#update").onclick = () => {
    if (formValidate() == true) {
      dataList[index].gridO = grid.value;
      dataList[index].joiningO = joining.value;
      dataList[index].fullNameO = fullName.value;
      dataList[index].courseO = course.value;
      dataList[index].durationO = duration.value;
      dataList[index].contactO = contact.value;

      localStorage.setItem("dataList", JSON.stringify(dataList));

      displayData();

      grid.value = "";
      joining.value = "";
      fullName.value = "";
      course.value = "";
      duration.value = "";
      contact.value = "";

      // To hide UPDATE button
      btnUpdate.style.display = "none";
    }
  };
};

// To delete data into the Local-Storage [ Delete ]
var deleteData = (index) => {
  var dataList;
  if (localStorage.getItem("dataList") == null) {
    dataList = [];
  } else {
    dataList = JSON.parse(localStorage.getItem("dataList"));
  }

  dataList.splice(index, 1);
  localStorage.setItem("dataList", JSON.stringify(dataList));
  displayData();
};

// To select user [ Select ]
const selectListData = () => {
  let selectList;
  if (localStorage.getItem("selectList") == null) {
    selectList = [];
  } else {
    selectList = JSON.parse(localStorage.getItem("selectList"));
  }
  return selectList;
};

var selectStorage = selectListData();

const selectData = (index) => {
  var dataList;
  if (localStorage.getItem("dataList") == null) {
    dataList = [];
  } else {
    dataList = JSON.parse(localStorage.getItem("dataList"));
  }

  selectStorage.push(dataList[index]);

  localStorage.setItem("selectList", JSON.stringify(selectStorage));

  countUpdate();
  selectedDataShow();
};

var countUpdate = () => {
  dataCounter.innerHTML = selectStorage.length;
};

countUpdate();

// Selected Data to be Diplayed
var selected = [];

const selectedDataShow = (data) => {
  let selectList;
  if (localStorage.getItem("selectList") == null) {
    selectList = [];

    // No Selected Data Found
    offCards.innerHTML = "No data Found!";
  } else {
    selectList = JSON.parse(localStorage.getItem("selectList"));

    offCards.innerHTML = "";

    // Card Generated
    selectList.forEach((info, index) => {
      offCards.innerHTML += `<div class="offcards-container col-12">
      <div class="card flex-row flex-wrap align-content-center mt-2 p-3">
          <div class="d-flex justify-content-between flex-row flex-wrap align-content-center w-100">
              <div class="user-info d-flex flex-row flex-wrap align-content-center col-8 w-100 gap-2">
                  <span class="h4-lg fw-bold">${index + 1}</span>
                  <h4 class="h4-lg mb-0 d-flex align-items-center text-capitalize">Name : ${
                    info.fullNameO
                  }</h4>
              </div>
          </div>
      </div>
  </div>`;
    });
  }
};

selectedDataShow();

// To display data from Local-Storage [ Read / Display ]
const displayData = () => {
  var dataList;

  if (localStorage.getItem("dataList") == null) {
    dataList = [];

    // No Data Found
    cards.innerHTML = `<div class="col-4 ms-auto me-auto">
                                <div class="card bg-transparent border-0 flex-row flex-wrap align-content-center">
                                    <div class="no-data d-flex justify-content-center flex-column rounded text-center ms-auto me-auto w-100">
                                        <img class="ms-auto me-auto" src="images/no-data/no-data-found.png" alt="image">
                                        <h3 class="text-white">No Data Found</h3>
                                    </div>
                                </div>
                            </div>`;
  } else {
        dataList = JSON.parse(localStorage.getItem("dataList"));

        cards.innerHTML = "";

        // Card Generated
        dataList.forEach((info, index) => {
            cards.innerHTML += `<div class="col-4">
                            <div class="card flex-row flex-wrap align-content-center p-3 mt-4">
                                <div
                                    class="d-flex justify-content-center flex-wrap align-content-center avatar rounded object-fit-cover text-center col-4 me-3">
                                    <img src="images/avatar/avatar-man.webp" alt="avatar">
                                </div>
                                <div class="user-info d-flex flex-column flex-wrap align-content-center">
                                    <h5>GR ID : ${info.gridO}</h5>
                                    <h5>Name : ${info.fullNameO}</h5>
                                    <h5>Course : ${info.courseO}</h5>
                                    <h5>Joining : ${info.joiningO}</h5>
                                    <h5>Duration : ${info.durationO}</h5>
                                    <h5>Contact : ${info.contactO}</h5>
                                </div>
                                <div class="card-btn d-flex flex-column ms-auto">
                                    <button class="square btn btn-warning m-1 fw-bold" onclick="updateData(${index})">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button class="square btn btn-danger m-1 fw-bold" onclick="deleteData(${index})">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <button class="square btn btn-info m-1 fw-bold" onclick="selectData(${index})">
                                        <i class="fa-solid fa-square-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`;
        });
    }
};

displayData();