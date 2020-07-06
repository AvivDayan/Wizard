//Members
let wizardCurrentStep
let wizardStepsCount
let wizardPrevBtn
let wizardNextBtn
let wizardAnchors = []
let wizardSteps = []

//Wizard intialization
$(document).ready(() => {
  wizardPopulateMembers()
  wizardCreateAnchors()
  wizardCreateSteps()
  wizardCreateButtons()
})

//The following methods are for wizard intiailization and should not be used in js files other then this one.

const wizardPopulateMembers = () => {
  //This method populate our members and sets their intial values
  //The main reason for the method is just to store the UI elments in members so we wont have to call
  //jquery every time we want to access a UI element
  wizardCurrentStep = 1
  wizardStepsCount = $(".wizard-top")[0].childElementCount
  wizardPrevBtn = $("#wizard-button-previous")[0]
  wizardNextBtn = $("#wizard-button-next")[0]
  for (let i = 1; i <= wizardStepsCount; i++) {
    const anchor = $(`#wizard-anchor-${i}`)[0]
    const step = $(`#wizard-step-${i}`)[0]
    wizardAnchors.push(anchor)
    wizardSteps.push(step)
  }
}

const wizardCreateAnchors = () => {
  //This method adds the wizard-anchor class to each anchor div + creates its children and insert them into the anchor div
  wizardAnchors.forEach((anchor, index) => {
    anchor.classList.add("wizard-anchor")
    anchor.classList.add(index == 0 ? "wizard-anchor-selected" : "wizard-anchor-unvisited")

    //Create top part of anchor
    const anchorTop = document.createElement('div')
    anchorTop.classList.add("wizard-anchor-top")
    anchorTop.innerText = anchor.innerText
    anchor.innerText = ""

    //Create bottom part of anchor
    const anchorBottom = document.createElement('div')
    const line = document.createElement('div')
    const circle = document.createElement('div')
    const circleInner = document.createElement('div')
    anchorBottom.classList.add("wizard-anchor-bottom")
    line.classList.add("wizard-anchor-bottom-line")
    circle.classList.add("wizard-anchor-bottom-circle")
    circleInner.classList.add("wizard-anchor-bottom-circle-inner")
    anchorBottom.appendChild(line)
    anchorBottom.appendChild(circle)
    anchorBottom.appendChild(circleInner)

    //Insert top and bottom parts to the anchor element
    anchor.appendChild(anchorTop)
    anchor.appendChild(anchorBottom)
  })
}

const wizardCreateSteps = () => {
  //This method adds the classes to the wizard steps divs 
  wizardSteps.forEach((step, index) => {
    step.classList.add("wizard-step")
    if (index > 0)
      step.classList.add("wizard-step-hidden")
  })

  //Unfortuntly, i need to add the transition attrribute in a delay and not straight to the wizard-step class in the css.
  //the reason for that is becuase its created a bug that showed the opacity animation on page load.
  //This it the best solution i found.
  setTimeout(() => {
    wizardSteps.forEach((step) => {
      step.classList.add("wizard-step-transition")
    })
  }, 1000)
}

const wizardCreateButtons = () => {
  //This method adds the classes to the wizard buttons
  wizardPrevBtn.classList.add("wizard-button")
  wizardPrevBtn.classList.add("wizard-button-disabled")
  wizardNextBtn.classList.add("wizard-button")
  wizardNextBtn.classList.add("wizard-button-disabled")
}

//Navigation functions - The following Methods are for the developer use
//and should be used in other js files

const wizardGoNextPage = () => {
  //This method advances one step in the wizard
  wizardChangeStep(wizardCurrentStep + 1)
}

const wizardGoPreviousPage = () => {
  //This method goes back one step in the wizard
  wizardChangeStep(wizardCurrentStep - 1)
}

const wizardChangeStep = (nextStep) => {
  if (nextStep < 1 || nextStep > wizardStepsCount)
    return console.log("Invalid wizard step change!!! please remain in the boundries of the wizard u shity developer")

  //Change anchors classes according to nextStep
  wizardAnchors.forEach((anchor, index) => {
    index++;
    anchor.classList.remove("wizard-anchor-visited")
    anchor.classList.remove("wizard-anchor-selected")
    anchor.classList.remove("wizard-anchor-unvisited")

    if (index < nextStep) {
      anchor.classList.add("wizard-anchor-visited")
    }
    else if (index == nextStep) {
      anchor.classList.add("wizard-anchor-selected")
    }
    else { //index > nextStep
      anchor.classList.add("wizard-anchor-unvisited")
    }
  })

  //Im subtracting one from the current steps because wizardCurrentStep starts from 1 and not 0
  //Change step according to nextStep
  wizardSteps[wizardCurrentStep - 1].classList.add("wizard-step-hidden")
  wizardSteps[nextStep - 1].classList.remove("wizard-step-hidden")

  //Change current step
  wizardCurrentStep = nextStep
}

const wizardValidateNextButton = (nextStep) => {
  return nextStep < wizardStepsCount

}

const wizardGetPrevBtnEnable = () => {
  return wizardGetBtnEnable(wizardPrevBtn)
}

const wizardGetNextBtnEnable = () => {
  return wizardGetBtnEnable(wizardNextBtn)
}

const wizardEnableNextBtn = (isEnable) => {
  wizardEnableButton(wizardNextBtn, isEnable)
}

const wizardEnablePrevBtn = (isEnable) => {
  wizardEnableButton(wizardPrevBtn, isEnable)
}

const wizardEnableButton = (btn, isEnable) => {
  if (isEnable)
    btn.classList.remove("wizard-button-disabled")
  else
    btn.classList.add("wizard-button-disabled")
}

const wizardGetBtnEnable = (btn) => {
  return !btn.classList.contains("wizard-button-disabled")
}

const wizardGetCurrentIndex = () => {
  return wizardCurrentStep
}

const wizardGetStepsCount = () => {
  return wizardStepsCount
}