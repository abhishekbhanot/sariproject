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
    bmi < 30 ? "Overweight" : "Not Healthy";
 
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

calculateVitals();
function updateTargetWeight() {
    const nameInput = document.getElementById('name').value || "Maya";
    const height = parseFloat(document.getElementById('height').value);
    
    // Calculate "Super Fit" weight using BMI = 22
    const heightMeters = height * 0.3048; // Convert height from feet to meters
    const superFitWeight = (22 * (heightMeters ** 2)).toFixed(1); // Super Fit weight in kg
    
    // Update name and target weight in the target-weight container
    const targetWeightContainer = document.querySelector('.target-weight');
    targetWeightContainer.querySelector('p').textContent = `${nameInput}, what's your target weight?`;
    targetWeightContainer.querySelector('h3').textContent = `${superFitWeight}kg - Super Fit`;
  }
  
  // Attach event listeners for name and height changes
  document.getElementById('name').addEventListener('input', updateTargetWeight);
  document.getElementById('height').addEventListener('input', updateTargetWeight);
  
  // Initial call to update the content on page load
  updateTargetWeight();
  




  function calculateDaysToFit() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = parseInt(document.getElementById('activity').value);
  
    // Calculate Super Fit weight
    const heightMeters = height * 0.3048; // Convert height from feet to meters
    const superFitWeight = 22 * (heightMeters ** 2); // Super Fit weight in kg
  
    // Current weight and daily caloric deficit based on activity
    const dailyDeficit = [300, 400, 500, 600][activityLevel]; // Approximate values
    const weightToLose = weight - superFitWeight; // Weight to lose in kg
  
    // Approximate days to lose weight (1 kg ~ 7700 kcal deficit)
    const daysToFit = weightToLose > 0 ? Math.ceil((weightToLose * 7700) / dailyDeficit) : 0;
  
    // Update the display
    const daysDisplay = document.getElementById('days-to-fit');
    daysDisplay.textContent = daysToFit > 0 ? daysToFit : "You're already Super Fit!";
  }
  
  // Attach event listeners to update days-to-fit dynamically
  document.getElementById('weight').addEventListener('input', calculateDaysToFit);
  document.getElementById('height').addEventListener('input', calculateDaysToFit);
  document.getElementById('activity').addEventListener('input', calculateDaysToFit);
  
  // Initial calculation
  calculateDaysToFit();
  