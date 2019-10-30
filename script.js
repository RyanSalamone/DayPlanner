$("#currentDay").text(moment().format('dddd, MMMM Do'));

var timeSheet = [
  {hour: "9 a.m."}, {hour: "10 a.m."}, {hour: "11 a.m."}, {hour: "Noon"}, {hour: "1 p.m."}, {hour: "2 p.m."}, {hour: "3 p.m."}, {hour: "4 p.m."},{hour: "Happy Hour!"},
];
var timeSpot = [
    {spotNum: 9}, {spotNum: 10}, {spotNum: 11},{spotNum: 12}, {spotNum: 13}, {spotNum: 14},{spotNum: 15}, {spotNum: 16},{spotNum: 17},
]

var tasks = ["", "", "", "", "", "", "", "", ""];

function renderEvents() {

  $(".container").empty();

  for (let i = 0; i < timeSheet.length; i++) {
    var taskInput = tasks[i];
    var hourName = timeSheet[i].hour;
    var present = parseInt(moment().format("HH"));
    var current = timeSpot[i].spotNum;
    var timeStyle = "";

    if (current < present) {
      timeStyle = "past";
    } else {
      timeStyle = "future";
    }
    if (current === present) {
      timeStyle = "present";
    }

    var timeBlockEl = $("<form>").attr("class", "input-group row");
    var hourContainer = $("<div>").attr("class", "col-2");
    var hourEl = $("<div>").attr("class", "hour").text(hourName)
    var inputEl = $("<textarea>").attr("class", `form-control textarea ${timeStyle}`).attr("type", "text").attr("id", "input" + i).val(taskInput);
    var buttonEl = $("<div>").attr("class", "input-group-append");
    var button = $("<button>").attr("class", "saveBtn").attr("data-index", i);
    var saveBtn = $("<i>").attr("class", "fas fa-save");

    // creating a time.block for the container 
    $(".container").append(timeBlockEl);

    button.append(saveBtn);
    
    buttonEl.append(button);

    hourContainer.append(hourEl);

    // add all new created data into each time block
    timeBlockEl.append(hourContainer).append(inputEl).append(buttonEl);
  }
  console.log(localStorage)
}

function init() {
  var storedData = JSON.parse(localStorage.getItem("tasks"));

  if (storedData !== null) {
    tasks = storedData;
  }
  renderEvents();
}

function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(tasks)
}


$(document).ready(function() {

  init();
  
  $("#currentDay").append(currentDay);

  $(".saveBtn").on("click", function(event) {
    event.preventDefault();
    //Get the data index number from the button.
    var dataIndex = $(this).attr("data-index");
    var textInput = $(`#input${dataIndex}`).val();

    // store a task into local storage to append 
    tasks.splice(dataIndex, 1, textInput);
    storeTasks();
  });

})