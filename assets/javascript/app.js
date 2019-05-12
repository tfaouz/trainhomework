$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyACDiNmhAZA6aCe0aNeMQXh-SkyauYDtho",
    authDomain: "homeworktrain-ada48.firebaseapp.com",
    databaseURL: "https://homeworktrain-ada48.firebaseio.com",
    projectId: "homeworktrain-ada48",
    storageBucket: "",
    messagingSenderId: "546270154002"
  };
  firebase.initializeApp(config);

  var database = firebase.database()


  $("#submit").click(function () {

    var destination = $("#destination-input").val().trim()
    var frequency = $("#frequency-input").val().trim()
    var train = $("#train-input").val().trim()
    var firstTime = $("#train-time-input").val().trim()

    database.ref().push({
      destination: destination,
      frequency: frequency,
      train: train,
      firstTime: firstTime
    })
  })

  database.ref().on("child_added", function (childSnapshot) {

    var newDestination = childSnapshot.val().destination
    var newFrequency = childSnapshot.val().frequency
    var newName = childSnapshot.val().train
    var newTime = childSnapshot.val().firstTime


    var currentTime = moment()

    var difTime = moment().diff(moment(startTimeConv), "minutes")
    var timeRemainder = difTime % newFrequency

    var minTillArival = newFrequency - timeRemainder

    var nextTrain = moment().add(minTillArival, "minutes")
    var nextTrainConv = moment(nextTrain).format("hh:mm")

    var startTimeConv = moment(newTime, "hh:mm").subtract(1, "years")

    $("#display").append(
      "<tr><td>" + newName +
      "</td><td>" + newDestination +
      "</td><td>" + newFrequency +
      "</td><td>" + nextTrainConv +
      "</td><td>" + minTillArival + "</td></tr>")

  })
})




