// This script is aimed to record and handle touch and change in device orientation events and to listen and operate app refreshing
var container = document.getElementById("main_container");

if (!!container) {
    var content = container.innerHTML;
}

// Define variables used to prevent two instances of the app running in simultaniously when reloading (communicates with app.js)
identifiersToClean = [];
if (typeof recordIdentifier === 'undefined') {
    recordIdentifier = '';
};

// initiate a variable that tracks if an app is running:
appRunning = false; // used to determine whther a new session can start
// initiate variables for the mechanism that handle running a new app instance:
var firstAttemptToRunNewAppInstance = true;
var funcCallTimer = 0;

