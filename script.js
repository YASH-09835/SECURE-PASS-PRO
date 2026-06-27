let securityScore = 0;

function toggleTheme(){

document.body.classList.toggle("light-mode");

let btn =
document.getElementById("themeBtn");

if(document.body.classList.contains("light-mode")){
btn.innerHTML = "☀️ Light Mode";
}
else{
btn.innerHTML = "🌙 Dark Mode";
}

}

function updateDashboard(){

document.getElementById(
"dashboardScore"
).innerHTML =
"Overall Security Score: " +
securityScore;

}

function checkPassword(){

let password =
document.getElementById(
"password"
).value;

let score = 0;

if(password.length>=8) score++;
if(/[A-Z]/.test(password)) score++;
if(/[a-z]/.test(password)) score++;
if(/[0-9]/.test(password)) score++;
if(/[!@#$%^&*]/.test(password)) score++;

let result =
document.getElementById(
"passwordResult"
);

let bar =
document.getElementById(
"strengthBar"
);

if(score<=2){

result.innerHTML =
"Weak Password";

bar.style.width="30%";
bar.style.background="red";

}
else if(score<=4){

result.innerHTML =
"Medium Password";

bar.style.width="70%";
bar.style.background="orange";

}
else{

result.innerHTML =
"Strong Password";

bar.style.width="100%";
bar.style.background="green";

}

securityScore += score*4;

updateDashboard();

}

function generatePassword(){

let chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

let password = "";

for(let i=0;i<12;i++){

password += chars.charAt(
Math.floor(
Math.random()*chars.length
)
);

}

document.getElementById(
"generatedPassword"
).innerHTML =
password;

securityScore += 10;

updateDashboard();

}

function checkURL(){

let url =
document.getElementById(
"urlInput"
).value;

let result =
document.getElementById(
"urlResult"
);

if(url.startsWith("https://")){

result.innerHTML =
"Low Risk URL";

securityScore += 20;

}
else{

result.innerHTML =
"Potential Phishing URL";

}

updateDashboard();

}

function checkEmail(){

let email =
document.getElementById(
"emailInput"
).value;

let result =
document.getElementById(
"emailResult"
);

if(email.includes("@")){

result.innerHTML =
"Valid Email Format";

securityScore += 20;

}
else{

result.innerHTML =
"Invalid Email";

}

updateDashboard();

}

/* QUIZ */

const quizQuestions = [

{
question:"What is phishing?",
options:["Cyber attack using fake messages","Firewall","Hardware","OS"],
answer:0
},

{
question:"What is malware?",
options:["Malicious software","Browser","Firewall","Network"],
answer:0
},

{
question:"What does HTTPS mean?",
options:["Secure connection","Fast internet","VPN","Firewall"],
answer:0
},

{
question:"What is MFA?",
options:["Authentication","File Access","Firewall","Browser"],
answer:0
},

{
question:"What is ransomware?",
options:["Malware demanding payment","Browser","OS","VPN"],
answer:0
},

{
question:"Strongest password?",
options:["123456","password","Hello123","Xy@9Lp#7Qm!"],
answer:3
}

];

quizQuestions.sort(
()=>Math.random()-0.5
);

let currentQuestion = 0;
let quizScore = 0;

function loadQuestion(){

let q =
quizQuestions[currentQuestion];

document.getElementById(
"question"
).innerHTML =
`Question ${currentQuestion+1}: ${q.question}`;

let optionsDiv =
document.getElementById(
"options"
);

optionsDiv.innerHTML="";

q.options.forEach(
(option,index)=>{

optionsDiv.innerHTML +=
`
<label>
<input
type="radio"
name="quizOption"
value="${index}">
${option}
</label><br><br>
`;

});

}

function nextQuestion(){

let selected =
document.querySelector(
'input[name="quizOption"]:checked'
);

if(selected){

if(
parseInt(selected.value)
===
quizQuestions[currentQuestion].answer
){

quizScore++;
securityScore += 5;

updateDashboard();

}

}

currentQuestion++;

if(
currentQuestion <
quizQuestions.length
){

loadQuestion();

}
else{

document.getElementById(
"question"
).innerHTML =
"🎉 Quiz Completed";

document.getElementById(
"options"
).innerHTML = "";

document.getElementById(
"quizResult"
).innerHTML =
`Score: ${quizScore}/${quizQuestions.length}`;

}

}

loadQuestion();