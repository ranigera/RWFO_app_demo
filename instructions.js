// ****************************************************************
//                           FUNCTIONS:
// ----------------------------------------------------------------

async function exitAppDemo(appDemoID) {
	console.log('Exit THE APP')
	dom_helper.remove_css_class(appDemoID, 'appOpen');
	dom_helper.add_css_class(appDemoID, 'appClose');
	wait(1000).then(() => dom_helper.hide(appDemoID));

	if (firstPressOnExitButton) {
		demoTrialNum += 1;
		firstPressOnExitButton = false;
	}

	// check if demo cycle is finished:
	if (demoTrialNum === Object.keys(settings.demoCycle).length) { // checking that this is the last trial in the demo cycle;
		dom_helper.removeElement(mainDemoTextDuplicateID) // remove demo text
		mainDemoTextDuplicateID = "mainDemoTextBox" // initialize in case user choose another round
		wait(500).then(() => removeSmartphoneApperance());
		await delay(750)
		data_helper.on_broadcast = undefined;
		jsPsych.resumeExperiment();
	} else {
		// construct here the demo instructions:
		var oldMainDemoTextDuplicateID = mainDemoTextDuplicateID
		mainDemoTextDuplicateID = dom_helper.duplicate(oldMainDemoTextDuplicateID);
		dom_helper.removeElement(oldMainDemoTextDuplicateID)
		dom_helper.set_text('mainDemoText', settings.demoCycleSupportingText[demoTrialNum])
		dom_helper.show(mainDemoTextDuplicateID)
		// alow to load the app again:
		document.getElementById('demoLoadButton').onclick = function () {
			loadAppDemo(demoTrialNum);
		};
	}
}

async function loadAppDemo(demoTrialNum) {
	document.getElementById('demoLoadButton').onclick = '';
	// check when to present again the button that closes the demo app:

	var demoUrl = "index.html?demoTrialNum=" + demoTrialNum;

	if (!document.getElementById("embedded_app")) { //i.e. it's the first time
		// embed the app for demo purposes:
		appDemoID = "embedded_app";
		embeddedElement = document.createElement('iframe');
		embeddedElement.setAttribute("id", appDemoID)
		embeddedElement.setAttribute("src", demoUrl)
		embeddedElement.className = "appInBigRectangle"
		document.body.appendChild(embeddedElement)
	} else {
		appDemoID = dom_helper.duplicate('embedded_app');
		document.getElementById(appDemoID).setAttribute("src", demoUrl)
	}

	dom_helper.remove_css_class(appDemoID, 'appClose');
	dom_helper.add_css_class(appDemoID, 'appOpen');
	dom_helper.show(appDemoID);
	//dom_helper.hide('demoExitButton')
	dom_helper.add_css_class('demoExitButton', 'disabled');
	document.getElementById('demoExitButton').style.borderColor = 'rgba(85,85,85,0.2)'

	runMonitorChangesInIntervals = setInterval(() => {
		console.log('INTERVALSCUSH.......')
		monitorChangesInDemoAndReact({ broadcast: 'running_checks_on_intervals' })
	}, 1000);

	firstAppOpennedDetection = true; // this is to indicate when the button to open the was first pressed (for some relevant checks to rely on)
}

function createSmartphoneApperance() {
	// create text above the "smartphone sketch":
	demoText = document.createElement('h1');
	demoText.setAttribute("id", "mainDemoText");
	demoText.setAttribute("class", "demoText");
	demoText.innerHTML = app_settings.demoCycleSupportingText[0]['a'];
	demoText.appendChild(document.createTextNode(''));
	is_firstDemoScreen_SuportingInstructions_changed_1 = false;
	is_firstDemoScreen_SuportingInstructions_changed_2 = false;
	demoTrialNum = 0;
	firstPressOnExitButton = true;
	// making the text box
	demoTextBox = document.createElement('div');
	demoTextBox.setAttribute("id", "mainDemoTextBox");
	demoTextBox.setAttribute("class", "demoTextBox");

	demoTextBox.appendChild(demoText);
	document.body.appendChild(demoTextBox);

	// outer rectangle:
	outerRectangle = document.createElement('div');
	outerRectangle.setAttribute("id", "outerRectangle");
	outerRectangle.setAttribute("class", "bigRectangle");
	document.body.appendChild(outerRectangle);

	// inner rectangles:
	appsLineContainerElement = document.createElement('div');
	appsLineContainerElement.setAttribute("id", "appsLineContainerElement");
	appsLineContainerElement.setAttribute("class", "appLine");
	innerRectangle = document.createElement('div');
	innerRectangle.setAttribute("id", "innerRectangle");
	innerRectangle.setAttribute("class", "smallRectangle");
	// put the inner rectangle in the outer rectangle
	appsLineContainerElement.appendChild(innerRectangle);
	outerRectangle.appendChild(appsLineContainerElement);
	// duplicate the small rectangles
	for (i = 0; i < 3; i++) { // make 4 icons in a line (add 3)
		dom_helper.duplicate('innerRectangle');
	}
	for (i = 0; i < 2; i++) { // create 3 lines (add 2)
		dom_helper.duplicate('appsLineContainerElement');
	}
	// create the line with the app
	lineWithRealAppContainerElement = document.createElement('div');
	lineWithRealAppContainerElement.setAttribute("id", "lineWithRealAppContainerElement");
	lineWithRealAppContainerElement.setAttribute("class", "appLine");
	innerRectangle = document.createElement('div');
	innerRectangle.setAttribute("id", "innerRectangle2");
	innerRectangle.setAttribute("class", "smallRectangle");
	lineWithRealAppContainerElement.appendChild(innerRectangle);
	outerRectangle.appendChild(lineWithRealAppContainerElement);
	dom_helper.duplicate('innerRectangle2');
	// add the icon of the REAL APP element:
	appIconElement = document.createElement('img');
	appIconElement.setAttribute("id", "appIcon");
	appIconElement.setAttribute("class", "appIconSpecifics");
	appIconElement.setAttribute("src", "icons/android-icon-72x72.png");
	lineWithRealAppContainerElement.appendChild(appIconElement);
	// another app:
	dom_helper.duplicate('innerRectangle2');
	// draw dots:
	dotContainerElement = document.createElement('div');
	dotContainerElement.setAttribute("id", "dotContainerElement");
	dotElement = document.createElement('span');
	dotElement.setAttribute("id", "homeScreenDots");
	dotElement.setAttribute("class", "dot");
	dotContainerElement.appendChild(dotElement);
	outerRectangle.appendChild(dotContainerElement);
	for (i = 0; i < 4; i++) {
		dom_helper.duplicate('homeScreenDots');
	}
	// another line of apps
	dom_helper.duplicate('appsLineContainerElement');

	// button of exit the app:
	exitAppElement = document.createElement('button');
	exitAppElement.setAttribute("id", 'demoExitButton');
	exitAppElement.setAttribute("onclick", "exitAppDemo(appDemoID)");
	document.body.appendChild(exitAppElement);
	dom_helper.add_css_class('demoExitButton', 'demoButton');
	dom_helper.add_css_class('demoExitButton', 'disabled');
	//document.getElementById('demoExitButton').style.borderColor='rgba(85,85,85,0.2)'

	// create smartphone button area:
	buttonAreaElement = document.createElement('div');
	buttonAreaElement.setAttribute("id", 'simulatedSmartphoneButtonArea');
	document.body.appendChild(buttonAreaElement);
}

function createLoadAppButton(elementIdName) {
	// button of openning the app:
	loadTheAppElement = document.createElement('button');
	loadTheAppElement.setAttribute("id", elementIdName);
	loadTheAppElement.setAttribute("onclick", "loadAppDemo(" + demoTrialNum + ")");
	loadTheAppElement.setAttribute("class", "loadButton");
	//loadTheAppElement.appendChild(document.createTextNode("Enter the app"));
	document.body.appendChild(loadTheAppElement);

	var appIconPosition = document.getElementById('appIcon').getBoundingClientRect()
	document.getElementById(elementIdName).style.top = String(appIconPosition.top) + "px"
	document.getElementById(elementIdName).style.left = String(appIconPosition.left) + "px"
	document.getElementById(elementIdName).style.height = String(appIconPosition.height) + "px"
	document.getElementById(elementIdName).style.width = String(appIconPosition.width) + "px"
}

function removeSmartphoneApperance(appDemoID) {
	//document.getElementById(appDemoID).remove();
	document.getElementById("outerRectangle").remove();
	document.getElementById("demoExitButton").remove();
	document.getElementById("demoLoadButton").remove();
	document.getElementById("simulatedSmartphoneButtonArea").remove();
}

async function monitorChangesInDemoAndReact(broadcastMessage) {
	console.log('> monitorChangesInDemoAndReact activated by: ' + broadcastMessage.broadcast)
	console.log('> check...')

	// present again the button that closes the demo app:
	if (document.getElementById(appDemoID).contentWindow.document.getElementById("welcome_msg") &&
		!document.getElementById(appDemoID).contentWindow.document.getElementById("welcome_msg").classList.contains('hidden')) {
		clearInterval(runMonitorChangesInIntervals) // stop monitoring in intervals
		wait(1000).then(() => {
			dom_helper.show('demoExitButton')
			dom_helper.remove_css_class('demoExitButton', 'disabled');
			document.getElementById('demoExitButton').style.borderColor = ''
			firstPressOnExitButton = true;
		});
	}

	// construct the SPECIAL CASE suporting instructions of the FIRST DEMO INTERACTION WITH THE APP which are long and are changed while the embedded app is running:
	if (!is_firstDemoScreen_SuportingInstructions_changed_1 &&
		document.getElementById(appDemoID).contentWindow.document.getElementById("lower_half") && //sometimes it does not exist yet and than an error is occuring on the next line (so this will prevent it)
		!document.getElementById(appDemoID).contentWindow.document.getElementById("lower_half").classList.contains('hidden') // check that the sequecne pressing (i.e., the line showing were to press) is presented				
	) {  // first detection when getting to the sequence pressing screen for the first time
		var oldMainDemoTextDuplicateID = mainDemoTextDuplicateID
		mainDemoTextDuplicateID = dom_helper.duplicate(oldMainDemoTextDuplicateID);
		dom_helper.removeElement(oldMainDemoTextDuplicateID)
		dom_helper.set_text('mainDemoText', app_settings.demoCycleSupportingText[0]['b'])
		dom_helper.show(mainDemoTextDuplicateID)
		is_firstDemoScreen_SuportingInstructions_changed_1 = true;
	}
	if (!is_firstDemoScreen_SuportingInstructions_changed_2 &&
		document.getElementById(appDemoID).contentWindow.document.getElementById("welcome_msg") &&
		!document.getElementById(appDemoID).contentWindow.document.getElementById("welcome_msg").classList.contains('hidden') // check that the trial was completed			
	) {  // first detection after app was closed
		var oldMainDemoTextDuplicateID = mainDemoTextDuplicateID
		mainDemoTextDuplicateID = dom_helper.duplicate(oldMainDemoTextDuplicateID);
		dom_helper.removeElement(oldMainDemoTextDuplicateID)
		dom_helper.set_text('mainDemoText', app_settings.demoCycleSupportingText[0]['c'])
		dom_helper.show(mainDemoTextDuplicateID)
		is_firstDemoScreen_SuportingInstructions_changed_2 = true;
	}
}

function cancelRedundantInvisibleButtonPress(event) {
	if (event.target.id !== "instructionsButtons") {
		event.preventDefault()
	}
}
// ****************************************************************
//                     INITIALIZE VARIABLES:
// ---------------------------------------------------------------
var appDemoID = null;

var firstAppOpennedDetection = null;
var current_n_data_points = null; // used to navigate between embedded demo up states
var target_n_data_points = null; // used to navigate between embedded demo up states
var instructions_page = 1;
var demoTrialNum;
var firstPressOnExitButton;
var mainDemoTextDuplicateID = "mainDemoTextBox";
var is_firstDemoScreen_SuportingInstructions_changed_1;
var is_firstDemoScreen_SuportingInstructions_changed_2;
var testPassed;
var timeline = [];
var durationToDisableInstructionsButtons = 1500
var showAppDemo = true
var askIfRepeatDemo = true
// a global var to comunicate with the handle_events.js:
tutorialCompleted = false;

var settings = Object.assign({}, app_settings);

// ****************************************************************
//                           PIPELINE:
// ---------------------------------------------------------------
(async () => {

	// SET DEMO STUFF:
	//------------------------------------------------------
	var welcome_page = {
		data: {
			trialType: 'welcome_page',
		},
		type: 'html-button-response',
		trial_duration: undefined, // no time limit
		choices: ['Start'],
		button_html: '<button id="repeatOrContinueButtons">%choice%</button>',
		timeline: [
			{
				stimulus: '<p id="repeatOrContinueText_welcome_msg">This is a demo of the real-world free-operant paradigm.<br><br>This paradigm was implemented as a smartphone app and was presented <a href="https://psyarxiv.com/kgqun/" target="_blank">here</a>.<br><br>The demo briefly shows how the smartphone app works (the main task components).<br><br><img id="title_img" src="images/game_title_image.jpg" alt="Image"></p>',
			}
		]
	};

	var demo = {
		type: 'call-function',
		func: function () {
			if (showAppDemo) {
				// Operate the embedded demo:
				data_helper.on_broadcast = monitorChangesInDemoAndReact;
				createSmartphoneApperance()
				createLoadAppButton(elementIdName = 'demoLoadButton')
				jsPsych.pauseExperiment()
			}
		},
	};
	var continue_or_repeat_demo_cycle = {
		data: {
			trialType: 'continue_or_repeat_demo_cycle',
		},
		type: 'html-button-response',
		trial_duration: undefined, // no time limit
		choices: ['Repeat demo'],
		button_html: '<button id="repeatOrContinueButtons">%choice%</button>',
		timeline: [
			{
				stimulus: '<p id="repeatOrContinueText">Thanks for trying out our app.<br><br>If you have any questions, interested in other functionalities or wish to collaborate, please contact us.<br><br></p>',
			}
		]
	};
	//
	var big_demo_loop = {
		timeline: [demo, continue_or_repeat_demo_cycle],
		loop_function: function (data) {
			return true;
		}
	}

	// SET THE MAIN LOOP OF THE TUTORIAL:
	//------------------------------------------------------
	var completeTutorialLoop = {
		timeline: [welcome_page, big_demo_loop],
	};

	timeline.push(completeTutorialLoop);

	jsPsych.init({
		timeline: timeline,
		//display_element: 'jspsych-display-element',
		on_finish: function () {
			console.log('Tutrial Completed')
		},
		on_close: function () { // in case the user gets out before it finishes.
			console.log('Tutrial Closed')
		}
	});
})();