// ****************************************************************
//                           FUNCTIONS:
// ---------------------------------------------------------------


function assignReward(rewardsData) {
  if (!rewardsData.isVariableReward) {
    return rewardsData.rewardConstantSum
  }
  else {
    let non_rounded_reward = Math.random() * (rewardsData.maxWinningSum - rewardsData.minWinningSum) + rewardsData.minWinningSum;
    return Math.round(non_rounded_reward * 100) / 100 // just making it rounded to two decimal points.
  }
}

function assignLoss(lossData) {
  if (!lossData.isVariableLoss) {
    return -1 * lossData.lossConstantSum
  }
  else {
    let non_rounded_loss = Math.random() * (lossData.maxLosingSum - lossData.minLosingSum) + lossData.minLosingSum;
    return -1 * (Math.round(non_rounded_loss * 100) / 100) // just making it rounded to two decimal points.
  }
}

function InitializeCost(cost_settings) {
  if (cost_settings.isCost) { // the syntax is based on the assignReward function defined above.
    if (!cost_settings.isVariableCost) {
      return cost_settings.isCostPerPress ? new Array(app_settings.pressesRequired + 1).fill(cost_settings.costConstantSum) : [cost_settings.costConstantSum];
    } else {
      let cost = [];
      const n_costs = cost_settings.isCostPerPress ? app_settings.pressesRequired + 1 : 1;
      for (i = 0; i < n_costs; i++) {
        let non_rounded_cost = Math.random() * (cost_settings.maxCostSum - cost_settings.minCostSum) + cost_settings.minCostSum;
        cost.push(Math.round(non_rounded_cost * 100) / 100); // just making it rounded to two decimal points.
      }
      return cost
    }
  } else {
    return [0]
  }
}

// ****************************************************************
//           LOGIC / Run Data (calculate run parameters):
// ----------------------------------------------------------------
var logic = {
  isCalledFromInstructions: function () {
    //return document.referrer.includes(settings.instructionsFileName); // was relevant when in iframe from the install.js
    //return window.parent.location.href.includes(settings.instructionsFileName) // this was relevant when it instructions were not redirected to
    return !!document.getElementById('instructions_iframe') || document.referrer.includes(settings.instructionsFileName)
  },
  initialize: function (demoTrialNum, settings) {

    // SET DEMO
    // -------------------------------------------------------
    let demoVars = settings.demoCycle[demoTrialNum % Object.keys(settings.demoCycle).length];
    // assign the variables for the demo:
    isWin = demoVars.isWin;
    isLoss = demoVars.isLoss;
    whichManipulation = demoVars.whichManipulation;
    activateManipulation = demoVars.activateManipulation;
    isUnderManipulation = demoVars.isUnderManipulation;
    consumptionTest = demoVars.consumptionTest;
    var toHideOutcome = demoVars.toHideOutcome;
    var resetContainer = demoVars.resetContainer;
    var giveFeedbackOnDevaluedOutcome = false;

    let cost = InitializeCost(settings.cost)
    let reward = isWin ? assignReward(settings.rewards) : 0; // set reward value if winning, or set to 0 if not
    reward = isLoss ? assignLoss(settings.rewards) : reward; // set reward value if winning, or set to 0 if not

    var dataToSave = {
      isWin: isWin,
      isLoss: isLoss,
      reward: reward,
      cost: cost,
      resetContainer: resetContainer,
      manipulationToday: whichManipulation,
      activateManipulation: activateManipulation,
      isUnderManipulation: isUnderManipulation,
      giveFeedbackOnDevaluedOutcome: giveFeedbackOnDevaluedOutcome,
      consumptionTest: consumptionTest,
      hideOutcome: toHideOutcome,
      demoTrialNum: demoTrialNum,
    };
    return dataToSave;
  },
  isManipulation: function (runData, settings) {
    if (!!settings.forceDeval)
      return settings.forceDeval;

    if (runData.activateManipulation)
      return runData.manipulationToday;

    return null;
  },
  getCost: function (runData, settings, cost_on) {
    return settings.cost.isCost
      && settings.cost.presentCost
      && (runData.cost.length > cost_on)
      && runData.cost[cost_on];
  },
  cost_on: {
    entrance: 0,
    click1: 1,
    click2: 2
  }
};
