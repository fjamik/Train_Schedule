

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDLZfQgwnxEPD0PKKq61iWjBd2ok8_rNnI",
  authDomain: "class-project-9b92f.firebaseapp.com",
  databaseURL: "https://class-project-9b92f.firebaseio.com",
  projectId: "class-project-9b92f",
  storageBucket: "class-project-9b92f.appspot.com",
  messagingSenderId: "139036993388"
};
firebase.initializeApp(config);
// a var to represent the database
var database = firebase.database();

function curentTime() {
  
  var rightNow = moment().format("HH:mm");
  $("#clock").html(rightNow);
  setTimeout(rightNow, 1000);

};
  curentTime();

$("#trains-form").on("submit", function(event) {
  event.preventDefault()


  var trainsDataInput = {

    name: $("#trainName-input").val().trim(),
    destination: $("#distance-input").val().trim(),
    fisrtTrainstart: $("#fisrtTrain-input").val().trim(),
    frequency: $("#frequency-input").val().trim(),
    
  };
// uploads train data to the database
  database.ref().push(trainsDataInput);



});



//  Created a firebase event listner for adding trains to database and a row in the html when the user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  // var frequency = 3;
 

  // var fisrtTrain = curTime

  var trainsData = childSnapshot.val();

  

  //makes first train time neater
  var firstTimeConverted = moment(trainsData.fisrtTrain, "HH:mm")
  console.log(firstTimeConverted);
  //calculate difference between times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  var timeRemain = diffTime % trainsData.frequency;
  var minToTrain = trainsData.frequency - timeRemain;

  //next train arrival time
  var nxTrain = moment().add(minToTrain, "minutes").format("LT");

  var key = childSnapshot.key;


  // create a table row
  var newTab = $('<tr>');
  // create <td> tags for each column 
  var tdName = $('<td>').text(trainsData.name);
  var tdDist = $('<td>').text(trainsData.destination);
  var tdFreq = $('<td>').text(trainsData.frequency);
  var tdTime = $('<td>').text(minToTrain);
  var tdNext = $('<td>').text(nxTrain);
  
  // append remove btn
  newTab.append($("<td id='remove'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));

  // append td tags to table row you created above
  newTab.append(tdName, tdDist, tdFreq, tdTime, tdNext);

  // append entire table row you created to $("tbody")
  $("tbody").append(newTab);

});

$(document).on("click", ".arrival", function() {
  keys = $(this).attr("data-key");
  database.ref().child(keys).remove();
  window.location.reload();
});






// var trainsName = "";
// var dist = "";
// var startTime = ""; 
// var freq = 0;

// // // display and update current time
// function curentTime() {

//   var rightNow = moment().format("LT");
//   $("#clock").html(rightNow);
//   setTimeout(rightNow, 1000);
// };
// // curentTime();


// $(".form-control").on("keyup", function(){

//   var tTrain = $("#trainName-input").val().trim();
//   var tCity = $("#distance-input").val().trim();
//   var tTime = $("#fisrtTrain-input").val().trim();
//   var tFreq = $("#frequency-input").val().trim();

//   sessionStorage.setItem("train", tTrain);
//   sessionStorage.setItem("distance", tCity);
//   sessionStorage.setItem("fisrtTrain", tTime);
//   sessionStorage.setItem("frequency", tFreq);
  

// });

// $("#trainName-input").val(sessionStorage.getItem("train"));
// $("#distance-input").val(sessionStorage.getItem("distance"));
// $("#fisrtTrain-input").val(sessionStorage.getItem("fisrtTrain"));
// $("#frequency-input").val(sessionStorage.getItem("frequency"));

// $("#addbutton").on("click", function(event) {
//   event.preventDefault();

//   if ($("#trainName-input").val().trim() === "" ||
//     $("#distance-input").val().trim() === "" ||
//     $("#fisrtTrain-input").val().trim() === "" ||
//     $("#frequency-input").val().trim() === "") {

//     // alert("Please fill in all details to add new train");

//   } else {

//     trainsName = $("#trainName-input").val().trim();
//     dist = $("#distance-input").val().trim();
//     startTime = $("#fisrtTrain-input").val().trim();
//     freq = $("#frequency-input").val().trim();

//     $(".form-control").val("");

//     database.ref().push({
//       trainsName: trainsName,
//       dist: dist,
//       freq: freq,
//       startTime: startTime,
//       dateAdded: firebase.database.ServerValue.TIMESTAMP
//     });

//     sessionStorage.clear();
//   }

// });

// database.ref().on("child_added", function(childSnapshot) {
  
//   var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
//   var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
//   var timeRemain = timeDiff % childSnapshot.val().freq;
//   var minTillArrival = childSnapshot.val().freq - timeRemain;
//   var nxTrain = moment().add(minTillArrival, "minutes");
//   var key = childSnapshot.key;

//   var tr = $("<tr>");
//   tr.append($("<td>" + childSnapshot.val().trainsName + "</td>"));
//   tr.append($("<td>" + childSnapshot.val().dist + "</td>"));
//   tr.append($("<td class='text-center'>" + childSnapshot.val().freq + "</td>"));
//   tr.append($("<td class='text-center'>" + moment(nxTrain).format("LT") + "</td>"));
//   tr.append($("<td class='text-center'>" + minTillArrival + "</td>"));
//   tr.append($("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));

//   if (minTillArrival < 6) {
//     tr.addClass("info");
//   }

//   $("#train-table-rows").append(tr);

// });

// $(document).on("click", ".arrival", function() {
//   keyref = $(this).attr("data-key");
//   database.ref().child(keyref).remove();
//   window.location.reload();
// });

// curentTime();

// setInterval(function() {
//   window.location.reload();
// }, 60000);



// $("#trains-form").on("submit", function(event) {
//   event.preventDefault();

//   // gather our form data
//   var trainsDataInput = {
//     name: $("#trainName-input").val().trim(),
//     destination: $("#distance-input").val().trim(),
//     startTime: $("#fisrtTrain-input").val().trim(),
//     frequency: $("#frequency-input").val().trim()
//   }

//   console.log(trainsDataInput);
//   
// });