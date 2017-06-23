console.log("test");
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDavb0o90_FTcKiWWxU1FylbP3Djp6cnlg",
    authDomain: "train-79ff4.firebaseapp.com",
    databaseURL: "https://train-79ff4.firebaseio.com",
    projectId: "train-79ff4",
    storageBucket: "train-79ff4.appspot.com",
    messagingSenderId: "552934165870"
  };
    firebase.initializeApp(config);
    // Create a variable to reference the database.
    var database = firebase.database();

    var trainData = {};
    // Initial Values
   
   $(document).on("click", "button", function(event) {
   	console.log("test");

   			event.preventDefault();

   	      	trainData.name = $("#train-name").val().trim();
   	      	trainData.destination = $("#destination").val().trim();
   	      	trainData.firstTrain = $("#first-train").val().trim();
   	      	trainData.frequency = $("#frequency").val().trim();
        	
        	database.ref().push(trainData);
      });

database.ref().on("child_added", function(childSnapshot) {
      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().frequency);

    var tFrequency = trainData.frequency;
    // Time is entered by user
    var firstTime = trainData.firstTrain;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // full list of items to the well
      $(".name").append("<p>" + childSnapshot.val().name + "</p>");
      $(".destination").append("<p>" + childSnapshot.val().destination + "</p>");
      $(".minutes-away").append("<p>" + tMinutesTillTrain + "</p>");
      $(".next-arrival").append("<p>" + moment(nextTrain).format("hh:mm") + "</p>");
      $(".frequency").append("<p>" + childSnapshot.val().frequency + "</p>");
      
      // empty form after submit
      $("#train-name").val("");
      $("#destination").val("");
      $("#first-train").val("");
      $("#frequency").val("");
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });