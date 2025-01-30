const activityLevels = ["Low", "Less than Moderate", "Moderate", "High"];
const genderOptions = ["Female", "Male", "Other"];
let age;

function updateName() {
  const nameInput = document.getElementById('name').value;
  const displayName = document.getElementById('display-name');
  const displayNameInline = document.getElementById('display-name-inline');
  displayName.textContent = nameInput || "Maya";
  displayNameInline.textContent = nameInput || "Maya";
}

function updateValue(id) {
  const slider = document.getElementById(id);
  const valueDisplay = document.getElementById(`${id}-value`);
  valueDisplay.textContent = slider.value;
}

function updateActivity() {
  const slider = document.getElementById('activity');
  const valueDisplay = document.getElementById('activity-value');
  valueDisplay.textContent = activityLevels[slider.value];
}


function updateGender() {
  const slider = document.getElementById('gender');
  const valueDisplay = document.getElementById('gender-value');
  valueDisplay.textContent = genderOptions[slider.value];
}

function calculateVitals() {
 


  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const activityLevel = parseInt(document.getElementById('activity').value);
//  let agee=document.getElementById('display-age').value;
const gender = genderOptions[parseInt(document.getElementById('gender').value)];


  const heightMeters = height * 0.3048;
  const heightCm=height*30.48;
  const dobInput = document.getElementById('dob').value; // Get the DOB input value
  let dob = new Date(dobInput); // Convert input to Date object
  let today = new Date(); // Get current date

   age = today.getFullYear() - dob.getFullYear(); // Calculate initial age difference
  document.getElementById('display-age').innerText =  age ;
    let bmi=(weight / (heightMeters ** 2)).toFixed(1);
    const healthStatus = document.getElementById('health-status');
  healthStatus.textContent = bmi < 18.5 ? "Underweight" :
    bmi < 25 ? "Healthy" :
    bmi < 30 ? "Overweight" : "Obese";
 
  let bmr;
  if (gender === "Male") {
    bmr = (10 * weight + 6.25 * heightCm  - 5 * age + 5).toFixed(0);
  }
  else {
    bmr = (10 * weight + 6.25 * heightCm  - 5 * age - 161).toFixed(0);
  }
// tdee
  const activityMultiplier = [1.2, 1.375, 1.55, 1.725];
  const tdee = (bmr * activityMultiplier[activityLevel]).toFixed(0);
  document.querySelector('.metrics p:nth-child(1) span').textContent = bmi;
  document.querySelector('.metrics p:nth-child(2) span').textContent = parseInt(bmr);
  document.querySelector('.metrics p:nth-child(3) span').textContent = tdee;
}
  document.querySelectorAll('input[type="range"]').forEach(slider => {
  slider.addEventListener('input', calculateVitals);
});

  