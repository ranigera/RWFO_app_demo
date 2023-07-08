// ****************************************************************
//                           PARAMETERS:
// ---------------------------------------------------------------

window.app_settings = {
	server: {
		base_address: 'https://experiments.schonberglab.org',
		ws_base_address: 'wss://experiments.schonberglab.org',
	},
	app_base_adress: 'https://experiments.schonberglab.org/static/rani',  // <HTML ADJUSTABLE>
	context: 'Space_Gold',  // <HTML ADJUSTABLE>
	one_time_link: true, // <HTML ADJUSTABLE>
	downloadAllToLocalStorage: false, // this refers to the case where the data need to be downloaded again to the local storage (e.g., after reinstalling the app because of a problem)
	minDailyDataPointsToStoreLocally: 20,
	experimentalDayStartingHour: 5, // Possiblie assignments are 0-23. Assign 0 to simply seperate between days.  Relevant for example to determine the time at day to empty container according to a 24h watch. 
	pressesRequired: 2,
	forceDeval: null, // for debugging purposes
	group_vars: { // <HTML ADJUSTABLE>
		group_A: {
			dayToFinishExperiment: 5, // short training
			daysWithControlManipulations: [2, 4],
			daysWithDevaluationManipulations: [3],
		},
		group_B: {
			dayToFinishExperiment: 12, // long training
			daysWithControlManipulations: [9, 11],
			daysWithDevaluationManipulations: [10],
		},
		group_C: {
			dayToFinishExperiment: 12, // long training parallel manipulations
			daysWithControlManipulations: [2, 3, 4, 9, 11],
			daysWithDevaluationManipulations: [10],
		},
	},
	// for non-personalized time of manipulation:
	entry_to_manipulate_in: 5, // manipulation will occur on the entry_to_manipulate_in, namely entry_to_manipulate_in - 1 will have to be completed // <HTML ADJUSTABLE>
	hour_at_day_to_manipulate_anyway: 14,
	referenceDayPrecentileForManipulation: 0.5, // if referenceDayPrecentile=0.5 it will take the median, 0.25 quarter of the presses in a day etc.
	nTimesToShowCaveIfNotEntering: 2,
	maxSecsToShowCaveAgainIfNotEntering: 30,
	nTrialsBeforeNotifyGameOver: 3,
	nDailyEntriesRequired: function () { return this.entry_to_manipulate_in; },
	manipulationImageID: function (manipulationType) {
		if (manipulationType == 'devaluation') {
			return 'warehouse_full';
		} else if (manipulationType == 'still_valued' || manipulationType == 'still_valued_post_deval' || manipulationType == 'still_valued_replacing_devaluation') { // i.e., 'still_valued'
			return 'warehouse_half';
		}
	},
	msToRecordTimeSinceManipulationActivation: 500, // in ms
	hideOutcome: {
		hide: true,
		hideOnlyUnderManipulationPeriods: false, // if false will hide every day from what we set in daysToHideAt_UntilTomorrow

		daysToHideAt_UntilTomorrow: { // detemine according to group name <HTML ADJUSTABLE>
			group_A: [2, 3, 4], // short training
			group_B: [9, 10, 11], // long training
			group_C: [2, 3, 4, 9, 10, 11], // long training parallel manipulations
		}, // [2, 3, 4, 5, 8, 10, 12],
		entry_to_hideOutcome_in: 3, // relevant if hideOnlyUnderManipulationPeriods is false.  <HTML ADJUSTABLE>

		daysToHideAt_Randomly: { // detemine according to group name <HTML ADJUSTABLE> >> leave empty if not relevant
			group_A: [], // short training
			group_B: [], // long training 
			group_C: [], // long training parallel manipulations
		}, // [2, 3, 4, 5, 8, 10, 12],
		chance_to_begin_hiding_batch_when_Random: 0.33, // <HTML ADJUSTABLE>
		n_entriesToHide_when_Random: 2, // <HTML ADJUSTABLE></HTML>
	},
	feedback_in_devalued_actions: false, // <HTML ADJUSTABLE>
	rewards: {
		isRatioSchedule: true, // <HTML ADJUSTABLE>
		winningRate: 3, // <HTML ADJUSTABLE> per entries if isRatioSchedule is true; per seconds if isRatioSchedule is false.  <HTML ADJUSTABLE>
		winningChancePerUnit: function () {
			return 1 / this.winningRate;
		},

		isVariableReward: false, // <MAYBE MAKE IT HTML ADJUSTABLE>
		// for VariableReward (will be computed unifomly in the given range):
		minWinningSum: 20,
		maxWinningSum: 30,
		// for constant reward:
		rewardConstantSum: 15,

		// Sure win stuff:
		winAnywayIfMultipleNonWins: false, // this is to make sure that in case a participant did not win many times they will. <HTML ADJUSTABLE>
		RelativeNonWinUnitsBeforeSureWinning: function () {
			return this.winningRate * 2; // this means that if for example this is a variable ratio of 10, after 20 no wins the 21 attempt will be a sure win. |<MAYBE MAKE THE FACTOR HTML ADJUSTABLE>
		},

		// First daily entries stuff:
		enforce_n_random_winnings_during_minimum_entries: false, // <HTML ADJUSTABLE>
		n_random_winnings_during_minimum_entries: 2, // <HTML ADJUSTABLE>
		enforceFirstEntryWinSecondEntryNoWin: false, // <HTML ADJUSTABLE> <<< if this and enforceFirstEntryWinSecondEntryNoWin are true, the latter takes precedence

		notifyRewardContainerReset: true,

		// Aversive outcome stuff: <<<< If included: enforceFirstEntryWinSecondEntryNoWin and winAnywayIfMultipleNonWins, enforce_n_random_winnings_during_minimum_entries ......, detail !!!!
		// --------------------------------
		includeAversiveOutcome: false, // <HTML ADJUSTABLE>
		losingRate: 3, // <HTML ADJUSTABLE> per entries if isRatioSchedule is true; per seconds if isRatioSchedule is false.  <HTML ADJUSTABLE>
		losingChancePerUnit: function () {
			return 1 / this.losingRate;
		},

		isVariableLoss: false, // <MAYBE MAKE IT HTML ADJUSTABLE>
		// for VariableLoss (will be computed unifomly in the given range):
		minLosingSum: 20,
		maxLosingSum: 30,
		// for constant loss:
		lossConstantSum: 15,

	},
	cost: {
		isCost: true,
		isCostPerPress: false,
		isVariableCost: false,
		minCostSum: 1,
		maxCostSum: 5,
		// for constant cost:
		costConstantSum: 1,
		presentCost: true, // O'Doherty did not use visual feedback for the cost, Gillan did (in their MB-MF with devaluation study)
	},
	lottery_N_frames: 35,
	durations: { //in ms
		// every trial:
		entranceMessage: 800,
		lotteryAnim: 3500,
		intervalBetweenLotteryAndOutcomeAnim: 2800,
		// manipulation:
		outcomeAnim: 2000,
		intervalBetweenOutcomeAndNextThing: 1000,
		// animations:
		costAnim: 1500,
		surface_disappearance: 700,
	},
	text: {
		welcomeText: 'שלום',
		winningText: 'זכית ב- ',
		noWinningText: '...לא זכית הפעם',
		goodbyeText: 'נתראה בפעם הבאה',
		devaluationNotificationText: 'הקופה מלאה, לא ניתן לצבור בה עוד כסף עד מחר.\nלחצ/י על ok כדי לאשר.',
		verifyBeginningText: 'לחצ/י אשר כדי להתחיל.',
		// alerts, prompts etc:
		rewardContainerClearingMessage: 'חללית המטען רוקנה את המחסן וכעת הוא פנוי לצבירת זהב.',
		manipulationMessage: function (manipulationType) {
			if (manipulationType == 'devaluation') {
				return 'המחסן מלא!<br>לא ניתן לצבור בו עוד זהב עד שחללית המטען תרוקן אותו.';
			} else if (manipulationType == 'still_valued' || manipulationType == 'still_valued_post_deval' || manipulationType == 'still_valued_replacing_devaluation') { // i.e., 'still_valued'
				return 'המחסן מלא למחצה...';
			}
		},
		confirmationCodeTextMessage: '\nכדי לאשר שקראת יש לכתוב את האותיות: ',
		completeDemo: 'ההדגמה הסתיימה. אם ברצונך לסיים חלק זה ולהתחיל במשחק האמיתי יש לכתוב yes.\n כל דבר אחר. כדי לבצע סיבוב הדגמה נוסף יש ללחוץ על',
		realGameBegins: 'המשחק האמיתי מתחיל עכשיו.<br>הזהב שתצבור/תצברי מעכשיו שווה כסף אמיתי.<br><br>בהצלחה!',
		endExperiment: function (baselineAccumulatedReward) {
			return 'המשחק נגמר. תודה רבה שהשתתפת!' + '<br><br>' +
				'הצלחת להביא לכדור הארץ כ-'
				+ baselineAccumulatedReward // This was designed to replace the line below.
				// + logic.calculateReward(subData, app_settings.coinCollectionTask, dayToFinishExperiment)
				+ ' יחידות זהב!'
		},
		noConnectionToEndExperiment: 'לא מצליח להתחבר לשרת.' + '<br><br>' +
			'נא לוודא חיבור לרשת ולנסות שוב.',
		dialog_coinCollection: 'מצאת מערת זהב. במערה אבנים וזהב. כל נסיון לאסוף משהו (כלומר לחיצה) עולה 10 יחידות זהב. הזהב שייאסף יישמר במחסן במידה ויש בו מקום. מרגע שתיכנס/י אליה יש לך 5 שניות לשהות בה.',
		dialog_warehouseStateQuery: 'What is the current state of the warehouse?',
		dialog_warehouseStateQuery_allowed_answers: ['partially full', 'completely full'],
		loadingDataError: 'יש בעיה!' +
			'<br><br>' +
			'א. וודא/י שאת/ה מחובר לאינטרנט.' +
			'<br>' +
			'ב. נסה/י לסגור את האפליקציה לגמרי ולהכנס מחדש.' +
			'<br><br>' +
			'אם זה לא עוזר נא ליצור קשר עם רני: 050-5556733.',
	},
	// Manipulation checks:
	use_warehouse_state_query: false, // <HTML ADJUSTABLE>
	coinCollectionTask: {
		includeRocks: true,
		includeBombs: false, // <HTML ADJUSTABLE>
		duration: 5, // in seconds
		openningAnimTime: 1500, // in ms
		element_disappearing_time: 150, // in ms
		nStim: 30, // needs to fir the number of stimuli wanted
		bg_img_path: 'images/cave.jpg',
		outcome_win_image_path: 'images/outcome_win.png',
		outcome_loss_image_path: 'images/outcome_loss.png',
		outcome_no_win_image_path: 'images/outcome_no_win.png',
		outcomeImageHeightWidthRatio: 325 / 349, // namely the height = 325 and width = 349	
		stimSizeProportionOfScreen: 0.15, // will determine the size (width and height of the stimuli)
		textSizeProportionOfScreenWidth: 0.15,
		ProportionOfScreenWidthToPlaceCounter: 0.9,
		ProportionOfScreenHeightToPlaceCounter: 0.05,
		counterTextColor: [0, 0, 255], // can be one value for gray, 3 for RGB, 4 to include alpha
		finishMessageTextColor: [0, 0, 255], // can be one value for gray, 3 for RGB, 4 to include alpha
		finishMessage: "להתראות",
		costPerPress: 10, // for the winnings calculation at the end
		rewardPerCoinStash: () => app_settings.rewards.rewardConstantSum, // for the winnings calculation at the end
	},
	// Instructions and demo:
	allowInstructions: true, // for debugging purpose.
	allowDemo: true,
	demoCycle: {
		0: { isWin: true, isLoss: false, whichManipulation: null, activateManipulation: false, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: false },
		1: { isWin: false, isLoss: false, whichManipulation: null, activateManipulation: false, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: false },
		// 2: { isWin: false, isLoss: false, whichManipulation: null, activateManipulation: false, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: true },
		// 3: { isWin: true, isLoss: false, whichManipulation: 'still_valued', activateManipulation: true, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: false },
		// 4: { isWin: true, isLoss: false, whichManipulation: 'devaluation', activateManipulation: true, isUnderManipulation: false, toHideOutcome: false, resetContainer: false, consumptionTest: false },
		// 5: { isWin: false, isLoss: false, whichManipulation: null, activateManipulation: false, isUnderManipulation: false, toHideOutcome: true, resetContainer: true, consumptionTest: false },
	},
	demoCycleSupportingText: {
		0: {
			a: 'הכנו לך הדגמה עם מסך וירטואלי שמדמה סמארטפון.<br>לחצ/י על האפליקציה כדי לשגר את החללית שלך למשימת חיפוש זהב. תחילה תראה/י את החללית נוחתת ומימין למעלה תופיע עלות שליחת החללית למשימה (1-).',
			b: 'כעת לחצ/י על חציו התחתון של המסך ואז על חלקו העליון כדי להסיר את הקרח ולאפשר את חיפוש הזהב. לאחר מספר שניות של חיפוש תופיע התוצאה.',
			c: 'בסיבוב הזה מצאת זהב!<br>מיד לאחר מכן הופיעה הודעת הסיום ("נתראה בפעם הבאה"). כשההודעה מופיעה זה אומר שתוצאת החיפוש נשמרה ואפשר לצאת מהאפליקציה. כדי לצאת מהאפליקציה בהדגמה לחצ/י על כפתור הבית הוירטואלי שמופיע על ציור הסמארטפון.',
		},
		1: 'עכשיו תבצע/י מספר כניסות ויציאות מהאפליקציה ונדגים אפשרויות שונות.<br>כעת ניתן להיכנס ולהסיר את הקרח.<br>הפעם לא תמצא/י זהב (רק אבנים חסרות ערך).',
		2: 'בסיבוב הבא תיתקל/י במערה עתירת זהב.<br>תקבל/י על כך הודעה ולאחריה יהיו לך 5 שניות בתוכה, בהן תוכל/י לאסוף ממה שבמערה.',
		3: 'בכניסה הבאה נדגים קבלת דיווח שהמחסן מלא למחצה.',
		4: 'הפעם נדגים קבלת דיווח שהמחסן מלא.',
		5: 'בתחילת הסיבוב הבא תקבל/י דיווח שחללית המטען (זו שמרוקנת את המחסן על כוכב הזהב כל 24 שעות) רוקנה את המחסן.<br>בנוסף, יהיה מעונן ולא תוכל/י לראות את התוצאה של חיפוש הזהב.<br>*גם כאן יש לחכות להודעת הסיום כדי שתוצאת החיפוש תישמר.',
	},
	instructionsFileName: 'instructions.html',
	n_instruction_pages: 1,//24,
	lastInstructionsPageExplainsDemo: true,
	instructions_test_questions: {
		toRandomizeQuestions: false,
		dont_know_answer: 'לא יודע/ת.',
		1: {
			question: 'האם יש עלות כלשהי לכניסה לאפליקציה (כלומר לנסיון מציאת זהב)?',
			correct_answer: 'כן, זה עולה 1 יחידות זהב.',
			distractor_1: 'אין עלות לכניסה, יש עלות רק לנסיון להוציא דברים ממערה.',
			distractor_2: 'כן, זה עולה 15 יחידות זהב.',
			distractor_3: 'כן, העלות משתנה בכל פעם.',
		},
		// 2: {
		// 	question: 'האם הסיכוי למצוא זהב משתנה בזמנים מסויימים?',
		// 	correct_answer: 'לא, הסיכוי למצוא זהב זהה תמיד.',
		// 	distractor_1: 'הסיכוי למצוא זהב משתנה כל הזמן.',
		// 	distractor_2: 'הסיכוי למצוא זהב משתנה כשמעונן ואין אפשרות לראות אם מצאנו זהב.',
		// 	distractor_3: 'אם לאחרונה מצאנו הרבה זהב הסיכוי למצוא עוד זהב קטן יותר ולהפך.',
		// },
		// 3: {
		// 	question: 'מה קורה אם המחסן מלא?',
		// 	correct_answer: 'אין אפשרות לצבור עוד זהב שיילקח לכדור הארץ ויהפוך לכסף ממשי עבורי עד שירוקנו את המחסן עבורי בתום היממה (ב-5:00 לפנות בוקר).',
		// 	distractor_1: 'אצטרך לשלוח באופן ישיר ומיידי את הזהב לכדור הארץ.',
		// 	distractor_2: 'זה אומר שהמשחק נגמר.',
		// 	distractor_3: 'המחסן לא יכול להתמלא אלא רק להתמלא באופן חלקי.',
		// },
		// 4: {
		// 	question: 'מה קורה אם המחסן מלא באופן חלקי?',
		// 	correct_answer: 'שום דבר, זה רק עדכון. כל עוד המחסן אינו מלא לגמרי ניתן להמשיך לצבור בו זהב.',
		// 	distractor_1: 'זה לא משהו שאדע עליו מפני שאין דיווחים על כך שהמחסן מלא רק באופן חלקי.',
		// 	distractor_2: 'אין אפשרות לצבור עוד זהב שיילקח לכדור הארץ ויהפוך לכסף ממשי עבורי עד שירוקנו את המחסן עבורי בתום היממה (ב-5:00 לפנות בוקר).',
		// 	distractor_3: 'אצטרך לשלוח באופן ישיר ומיידי את הזהב לכדור הארץ.',
		// },
		// 5: {
		// 	question: 'מה השווי של גושי הזהב שאני יכול/ה למצוא?',
		// 	correct_answer: '15 יחידות זהב.',
		// 	distractor_1: 'הסכום משתנה והוא יוצג בכל פעם בהתאם.',
		// 	distractor_2: '1 יחידות זהב.',
		// 	distractor_3: 'הסכום משתנה ואין לי אפשרות לדעת אותו.',
		// },
		// 6: {
		// 	question: 'לאחר שנכנסתי לאפליקציה, מתי אוכל לצאת ממנה כך שתוצאת החיפוש תיחשב לי?',
		// 	correct_answer: 'כאשר תופיע הודעת הסיום (בה כתוב "נתראה בפעם הבאה").',
		// 	distractor_1: 'מיד לאחר הכניסה.',
		// 	distractor_2: 'מיד עם הופעתה של תוצאת החיפוש.',
		// 	distractor_3: 'כשמופיעים עננים.',
		// },
		// 7: {
		// 	question: 'מה קורה כשמעונן על כוכב הלכת ואין לי אפשרות לראות את תוצאות החיפוש?',
		// 	correct_answer: 'הכל ממשיך בדיוק אותו דבר. אין שינוי מלבד זה שאיני יכול/ה לראות את תוצאת החיפוש.',
		// 	distractor_1: 'המשחק לא זמין בזמנים אלו ולכן עדיף לנסות מאוחר יותר.',
		// 	distractor_2: 'אין עלות לכניסה.',
		// 	distractor_3: 'אין לי אפשרות לצבור את הזהב במחסן.',
		// },
		// 8: {
		// 	question: 'כיצד אוכל להרוויח כסף אמיתי?',
		// 	correct_answer: 'פשוט להיכנס לאפליקציה כדי לחפש זהב. במידה ומצאתי זהב ויש מקום במחסן, הזהב יילקח לכדור הארץ ויומר לכסף אמיתי. ככל שאצבור יותר זהב ארוויח יותר כסף.',
		// 	distractor_1: 'אין אפשרות להרוויח כסף אמיתי במשחק.',
		// 	distractor_2: 'פשוט להיכנס לאפליקציה כדי לחפש אבנים. במידה ומצאתי אבנים ויש מקום במחסן, האבנים יילקחו לכדור הארץ ויומרו לכסף אמיתי.',
		// 	distractor_3: 'להיכנס לאפליקציה ולהמתין בה זמן רב ככל שניתן לפני שאסגור אותה. ככל שהיא פתוחה יותר זמן ברצף, ארוויח יותר.',
		// },
		// 9: {
		// 	question: 'כמה כניסות ניתן לבצע בכל יום?',
		// 	correct_answer: 'כמה שרוצים, אך לפחות 5 כניסות בכל יום על מנת שכוכב הזהב יישאר זמין (ואיתו היכולת להמשיך לצבור זהב).',
		// 	distractor_1: 'כמה שרוצים, אך לפחות 2 כניסות בכל יום על מנת שכוכב הזהב יישאר זמין (ואיתו היכולת להמשיך לצבור זהב).',
		// 	distractor_2: 'כמה שרוצים, אך לכל היותר 100 כניסות בכל יום על מנת שכוכב הזהב יישאר זמין (ואיתו היכולת להמשיך לצבור זהב).',
		// 	distractor_3: 'כמה שרוצים, אך לכל היותר 300 כניסות בכל יום על מנת שכוכב הזהב יישאר זמין (ואיתו היכולת להמשיך לצבור זהב).',
		// },
		// 10: {
		// 	question: 'מה מהבאים לא נכון לגבי מערות עתירות זהב שאני עשוי/ה להיתקל בהן לפעמים?',
		// 	correct_answer: 'כל התשובות נכונות (למעט לא יודע/ת).',
		// 	distractor_1: 'יש לי 5 שניות בלבד לשהות במערה, בהן אוכל לאסוף מהדברים שבה.',
		// 	distractor_2: 'כל נסיון איסוף (לחיצה) בתוך המערה עולה 10 יחידות זהב.',
		// 	distractor_3: 'שווי גושי הזהב והאבנים זהה לשווי גושי הזהב והאבנים בחיפושי הזהב הרגילים.',
		// },
		// 11: {
		// 	question: 'מהו משך המשחק?',
		// 	correct_answer: 'משך המשחק אינו קבוע מראש. הוא אורך בין ימים אחדים לחודש.',
		// 	distractor_1: 'יום אחד.',
		// 	distractor_2: 'שבוע.',
		// 	distractor_3: 'חודש.',
		// },
		// // [replace_here_ with_a_number]: {
		// // 	question: '',
		// // 	correct_answer: '',
		// // 	distractor_1: '',
		// // 	distractor_2: '',
		// // 	distractor_3: '',
		// // },
	},
	// Meta stuff:
	instructions_HTML_title: 'Instructions',
	instructions_main_HTML_element: "instructions_iframe",
	App_HTML_title: function () { return this.context.replace(/_/g, ' ') },
	App_main_HTML_element: "main_container",
	dataVarList: ["serial", "uniqueEntryID", "subId", "group", "context", "day", "isWin", "isLoss", "reward", "cost", "baselineAccumulatedReward", "resetContainer", "resetContainerConfirmationTime", "manipulationToday", "activateManipulation", "isUnderManipulation", "hideOutcome", "isFirstTime", "todayInitialOutcomes", "startTime", "press1Time", "press2Time", "outcomeTime", "endTime", "manipulationAlertTime", "showInstructions", "instructionsStartedFlag", "completedInstructions", "isDemo", "demoTrialNum", "isDialogOn", "coin_task_finish_status", "endExperiment", "manipulationConfirmationTime", "manipCheckAlertTime", "manipChecConfirmationTime", "localSessionId"],
	// maybe remove unecessary ones (affects the list that is formed to work with in logic, not what is saved).
	// NOTE: the completedInstructions is assigned during the instructions upon success.
}

// contingency:
/////////////// !!!!!!!!!!  chancePerSec: 1 / winningRate,
// winningSum: (will be computed unifomly in the given range)
// Notes
// ------------
// The short-circuit (&&) and spread operater assinmgnet (...) used for the assinments here were based on the technique described here: https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object/40560953#40560953
// * enetually I did not use it but it looks like this.
//		...(!this.isVariableReward && {
//			// winningSum: (will be computed unifomly in the given range)
//			minWinningSum: 20,
//			maxWinningSum: 30
//		})
