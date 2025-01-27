const activityLevels = ["Low", "Less than Moderate", "Moderate", "High"];
const genderOptions = ["Female", "Male", "Other"];

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

function updateDOB() {
  const day = document.getElementById('dob-day');
  const month = document.getElementById('dob-month');
  const year = document.getElementById('dob-year');
  const display = document.getElementById('dob-display');
  display.textContent = `${String(day.value).padStart(2, '0')} / ${String(month.value).padStart(2, '0')} / ${year.value}`;
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
  const year = parseInt(document.getElementById('dob-year').value);
  const age = new Date().getFullYear() - year;

  const heightMeters = height * 0.3048;
  const bmi = (weight / (heightMeters ** 2)).toFixed(1);
  const gender = genderOptions[parseInt(document.getElementById('gender').value)];

  let bmr;
  if (gender === "Male") {
    bmr = (10 * weight + 6.25 * heightMeters * 100 - 5 * age + 5).toFixed(0);
  } else {
    bmr = (10 * weight + 6.25 * heightMeters * 100 - 5 * age - 161).toFixed(0);
  }

  const activityMultiplier = [1.2, 1.375, 1.55, 1.725];
  const tdee = (bmr * activityMultiplier[activityLevel]).toFixed(0);

  document.querySelector('.metrics p:nth-child(1) span').textContent = bmi;
  document.querySelector('.metrics p:nth-child(3) span').textContent = bmr;
  document.querySelector('.metrics p:nth-child(5) span').textContent = tdee;

  document.getElementById('display-age').textContent = age;

  const healthStatus = document.getElementById('health-status');
  healthStatus.textContent = bmi < 18.5 ? "Underweight" :
    bmi < 25 ? "Healthy" :
    bmi < 30 ? "Overweight" : "Not Healthy";
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
  