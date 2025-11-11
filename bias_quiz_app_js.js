// Questions for the bias quiz
const questions = [
  { id: 1, q: "The government should increase taxes on the wealthy to fund social programs.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 2, q: "Climate change requires major government regulation of industries.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 3, q: "Immigration strengthens our country.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 4, q: "The government should not restrict gun ownership.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 5, q: "The U.S. should invest more in renewable energy even if it costs jobs in traditional industries.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 6, q: "Affirmative action programs are necessary to achieve equality.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 7, q: "Government health care programs should be expanded.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 8, q: "Freedom of speech should be limited if it offends certain groups.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 9, q: "The U.S. should prioritize national security over privacy rights.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] },
  { id: 10, q: "Corporations should be allowed to operate with minimal government oversight.", options: ["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"] }
];

const reflectionQuestions = [
  "What differences did you notice between your perspective and the article’s perspective?",
  "Did the opposing article change or challenge any of your assumptions?",
  "How can you use this experience to think more critically about media bias in the future?"
];

let currentStep = 0;
let answers = {};

const container = document.getElementById('quiz-container');

function renderQuestion() {
  const q = questions[currentStep];
  container.innerHTML = `<div class='card'>
    <h2>Question ${currentStep+1} of ${questions.length}</h2>
    <p>${q.q}</p>
    <div id='options'></div>
    <button class='primary' id='next-btn'>${currentStep === questions.length-1 ? 'See Results' : 'Next'}</button>
  </div>`;
  const optionsDiv = document.getElementById('options');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => answers[q.id] = i+1;
    optionsDiv.appendChild(btn);
  });
  document.getElementById('next-btn').onclick = () => {
    if(answers[q.id]){
      if(currentStep < questions.length-1){ currentStep++; renderQuestion(); }
      else renderResults();
    } else {
      alert('Please select an answer before continuing.');
    }
  }
}

function calculateResult(){
  const score = Object.values(answers).reduce((acc,val) => acc + (val-3),0);
  if(score > 5) return 'progressive';
  if(score < -5) return 'conservative';
  return 'centrist';
}

function getOpposingArticle(result){
  if(result==='progressive') return 'https://www.allsides.com/news-source/national-review';
  if(result==='conservative') return 'https://www.allsides.com/news-source/huffpost';
  return 'https://www.allsides.com/news';
}

function renderResults(){
  const result = calculateResult();
  container.innerHTML = `<div class='card'>
    <h2>Your Result: ${result.charAt(0).toUpperCase() + result.slice(1)}</h2>
    <p>Here’s an article from an <b>opposing perspective</b> for you to explore:</p>
    <a href='${getOpposingArticle(result)}' target='_blank'>Read Article on AllSides</a>
    <div id='reflections'></div>
    <button class='primary' id='submit-btn'>Submit Reflections</button>
  </div>`;

  const reflectionsDiv = document.getElementById('reflections');
  reflectionQuestions.forEach((rq,i)=>{
    const div = document.createElement('div');
    div.innerHTML = `<p>${rq}</p><textarea id='ref${i}' rows='2'></textarea>`;
    reflectionsDiv.appendChild(div);
  });

  document.getElementById('submit-btn').onclick = () => {
    let reflectionAnswers = {};
    reflectionQuestions.forEach((_,i)=>{
      reflectionAnswers[i] = document.getElementById(`ref${i}`).value;
    });
    console.log('Reflections Submitted:', reflectionAnswers);
    alert('Thank you! Your reflections have been submitted.');
  }
}

renderQuestion();
