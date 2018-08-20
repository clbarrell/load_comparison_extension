// APP VARIABLES
let activeQuestionIndex = -1;
let unmatchedQuestions = document.getElementsByClassName('form__field--invalid');
let acceptsHotkeys = false;

function scrollIntoView() {
  window.scroll({
    top: unmatchedQuestions[activeQuestionIndex].getBoundingClientRect().top + window.scrollY - 80,
    behavior: 'smooth'
  });
}

function makeActive() {
  if (unmatchedQuestions.length > 0) {
    unmatchedQuestions[activeQuestionIndex].classList.add("is-active");
    scrollIntoView();
  }
}

function makeInactive() {
  if (unmatchedQuestions.length > 0) {
    unmatchedQuestions[activeQuestionIndex].classList.remove("is-active");
    unmatchedQuestions[activeQuestionIndex].classList.remove("highlight");
  }
}

function setInitialUnansweredQuestion() {
  if (unmatchedQuestions.length > 0) {
    activeQuestionIndex = 0;
    makeActive();
    updateQuestionsRemaining();
  } else {
    document.getElementById('matcherControls').classList.remove('is-visible');
    window.alert("Yay for you! No unmatched quesitons.");
  }
}

function finished() {
  document.getElementById('matcherControls').classList.remove('is-visible');
  acceptsHotkeys = false;
  window.alert("Yay for you! No unmatched quesitons.");
}

// make the next question active
function nextQuestion() {
  if (acceptsHotkeys == false) { return; };
  if (activeQuestionIndex >= unmatchedQuestions.length-1) {
    // at the end
    // refresh list
    isThisAnUnansweredQuestion();
    if (unmatchedQuestions.length > 0) {
      activeQuestionIndex = 0;
      makeActive();
    } else {
      activeQuestionIndex = -1;
      finished();
    }
  } else {
    // next question in list!
    makeInactive();
    activeQuestionIndex += 1;
    if (unmatchedQuestions[activeQuestionIndex].classList.contains("form__field--invalid") == false) {
      nextQuestion();
    } else {
      makeActive();
    }
  }
}

// answerQuestion()
function answerQuestion(matchNumber) {
  if (acceptsHotkeys == false) { return; };
  if (activeQuestionIndex == -1) { 
    window.alert("Please select next unmatched question first.");
    return;
  };
  if (unmatchedQuestions.length == 0) { finished(); }
  unmatchedQuestions[activeQuestionIndex].children[matchNumber].children[0].checked = true
  setTimeout(function(){
    makeInactive();
    unhighlightQuestion(matchNumber);
    // removing this class will automatically change unmatchedQuestions
    unmatchedQuestions[activeQuestionIndex].classList.remove("form__field--invalid");
    makeActive();
  },100);
  updateQuestionsRemaining();
}

function highlightQuestion(num) {
  if (unmatchedQuestions.length > 0) {
    unmatchedQuestions[activeQuestionIndex].children[num].classList.add("highlight");
  }
}

function unhighlightQuestion(num) {
  if (unmatchedQuestions.length > 0) {
    unmatchedQuestions[activeQuestionIndex].children[num].classList.remove("highlight");
  }
}

function updateQuestionsRemaining() {
  document.getElementById("questionsRemaining").innerText = `${unmatchedQuestions.length - 1} unmatched questions`;
}

function isThisAnUnansweredQuestion() {
  setTimeout(function() {
    const currentlyActiveQuestions = document.getElementsByClassName('is-active');
    for (let x = 0; x < currentlyActiveQuestions.length; x++) {
      if (currentlyActiveQuestions[x].classList.contains('form__field--invalid') == false) {
        currentlyActiveQuestions[x].classList.remove('is-active');
        unmatchedQuestions[activeQuestionIndex].classList.add("is-active");
        scrollIntoView();
      }
    }
  }, 100);
}

/** FIND AND INSERT HTML  **/

buttonText = { 
  false: "Show question matcher 🎉",
  true: "Hide 👉"
};

fetch(chrome.extension.getURL('/app.html'))
  .then(response => response.text())
  .then(data => {
    // document.body.appendChild(data);
    document.getElementsByClassName("footer noprint")[0].innerHTML += data;
    console.log("Success! HTML IS LOADED");
    // toggleControls()
    // show & hide the button control box
    document.getElementById('toggleControls').addEventListener('click', () => {
      updateQuestionsRemaining();
        if (unmatchedQuestions.length == 0) {
        finished();
        return;
      }
      document.getElementById('matcherControls').classList.toggle('is-visible');
      if (activeQuestionIndex == -1) { setInitialUnansweredQuestion() };
      acceptsHotkeys = !acceptsHotkeys;
      document.getElementById('toggleControls').innerText = buttonText[acceptsHotkeys];
      if (acceptsHotkeys) {
        makeActive();
        scrollIntoView();
      } else {
        makeInactive();
      };
    });

    const ans1 = document.getElementById('ans1');
    ans1.onclick = () =>      { answerQuestion(1) };
    ans1.onmouseover = () =>  { highlightQuestion(1) };
    ans1.onmouseout = () =>   { unhighlightQuestion(1) };

    const ans2 = document.getElementById('ans2');
    ans2.onclick = () =>      { answerQuestion(2) };
    ans2.onmouseover = () =>  { highlightQuestion(2) };
    ans2.onmouseout = () =>   { unhighlightQuestion(2) };

    const ans3 = document.getElementById('ans3');
    ans3.onclick = () =>      { answerQuestion(3) };
    ans3.onmouseover = () =>  { highlightQuestion(3) };
    ans3.onmouseout = () =>   { unhighlightQuestion(3) };

    const ans4 = document.getElementById('ans4');
    ans4.onclick = () =>      { answerQuestion(4) };
    ans4.onmouseover = () =>  { highlightQuestion(4) };
    ans4.onmouseout = () =>   { unhighlightQuestion(4) };

    const ans5 = document.getElementById('ans5');
    ans5.onclick = () =>      { answerQuestion(5) };
    ans5.onmouseover = () =>  { highlightQuestion(5) };
    ans5.onmouseout = () =>   { unhighlightQuestion(5) };

    const ans6 = document.getElementById('ans6');
    ans6.onclick = () =>      { answerQuestion(6) };
    ans6.onmouseover = () =>  { highlightQuestion(6) };
    ans6.onmouseout = () =>   { unhighlightQuestion(6) };

    document.getElementById('nxtQnBtn').addEventListener('click', () => {
      if (unmatchedQuestions.length == 0) {
        finished();
        return;
      }
      if (activeQuestionIndex == -1) { 
        setInitialUnansweredQuestion() 
      } else {
        nextQuestion();
      };
    });

    document.getElementById('currentQnBtn').addEventListener('click', () => {
      if (unmatchedQuestions.length == 0) {
        finished();
        return;
      }
      if (activeQuestionIndex == -1) { 
        setInitialUnansweredQuestion() 
      } else {
        scrollIntoView();
      };
    });
    document.getElementById('currentQnBtn').onmouseover = () => {
      if (unmatchedQuestions.length == 0) {
        finished();
        return;
      }
      unmatchedQuestions[activeQuestionIndex].classList.add("highlight");
    };
    document.getElementById('currentQnBtn').onmouseout = () => {
      if (unmatchedQuestions.length == 0) {
        finished();
        return;
      }
      unmatchedQuestions[activeQuestionIndex].classList.remove("highlight");
    };
    // short cuts!
    document.addEventListener('keydown', (event) => {
      if (unmatchedQuestions.length == 0) {
        return;
      }
      const keyName = event.key;
      if (acceptsHotkeys == false) {return;};
      if (keyName == 'n') {
        if (activeQuestionIndex == -1) { 
          setInitialUnansweredQuestion() 
        } else {
          nextQuestion();
        };
      } else if (keyName == 'c') {
        if (activeQuestionIndex == -1) { 
          setInitialUnansweredQuestion() 
        } else {
          scrollIntoView();
        };
      } else if (keyName == '1') {
        answerQuestion(1);
      } else if (keyName == '2') {
        answerQuestion(2);
      } else if (keyName == '3') {
        answerQuestion(3);
      } else if (keyName == '4') {
        answerQuestion(4);
      } else if (keyName == '5') {
        answerQuestion(5);
      } else if (keyName == '6') {
        answerQuestion(6);
      }
    }, false);
    // to get clicks on any of the answered questions
    document.getElementsByClassName('main-content nav-layout__content')[0].addEventListener('click', function(e){
      // e.target.name = question_match[5b7a36e91124a2786954152a]
      if (e.target.type != 'radio') { return; }
      isThisAnUnansweredQuestion();
    });
    console.log("Successfully added event listeners");
  }).catch(err => {
    // handle error
    console.log("Error! Something went wrong", err);
  });