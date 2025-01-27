const activityLevels = ["Low", "Less than Moderate", "Moderate", "High"];
const genderOptions = ["Female", "Male", "Other"];

function getHeightInMeters() {
  const height = parseFloat(document.getElementById('height').value);
  return height * 0.3048; // Convert from feet to meters
}

function getNameInput() {
  return document.getElementById('name').value || "Maya";
}

function getActivityMultiplier() {
  const activityLevel = parseInt(document.getElementById('activity').value);
  return [1.2, 1.375, 1.55, 1.725][activityLevel];
}

function updateNameAndTargetWeight() {
  const nameInput = getNameInput();
  const heightMeters = getHeightInMeters();

  // Calculate Super Fit weight
  const superFitWeight = (22 * (heightMeters ** 2)).toFixed(1);

  // Update target weight and name
  const targetWeightContainer = document.querySelector('.target-weight');
  targetWeightContainer.querySelector('p').textContent = `${nameInput}, what's your target weight?`;
  targetWeightContainer.querySelector('h3').textContent = `${superFitWeight}kg - Super Fit`;

  const displayName = document.getElementById('display-name');
  const displayNameInline = document.getElementById('display-name-inline');
  displayName.textContent = nameInput;
  displayNameInline.textContent = nameInput;
}

function calculateVitals() {
  const heightMeters = getHeightInMeters();
  const weight = parseFloat(document.getElementById('weight').value);
  const year = parseInt(document.getElementById('dob-year').value);
  const age = new Date().getFullYear() - year;
  const activityMultiplier = getActivityMultiplier();

  // Calculate BMI
  const bmi = (weight / (heightMeters ** 2)).toFixed(1);

  // Calculate BMR
  const gender = genderOptions[parseInt(document.getElementById('gender').value)];
  const bmr = gender === "Male"
    ? (10 * weight + 6.25 * heightMeters * 100 - 5 * age + 5).toFixed(0)
    : (10 * weight + 6.25 * heightMeters * 100 - 5 * age - 161).toFixed(0);

  // Calculate TDEE
  const tdee = (bmr * activityMultiplier).toFixed(0);

  // Update the display
  document.querySelector('.metrics p:nth-child(1) span').textContent = bmi;
  document.querySelector('.metrics p:nth-child(3) span').textContent = bmr;
  document.querySelector('.metrics p:nth-child(5) span').textContent = tdee;

  document.getElementById('display-age').textContent = age;

  // Update health status
  const healthStatus = document.getElementById('health-status');
  healthStatus.textContent = bmi < 18.5 ? "Underweight" :
    bmi < 25 ? "Healthy" :
    bmi < 30 ? "Overweight" : "Not Healthy";
}

function calculateDaysToFit() {
  const heightMeters = getHeightInMeters();
  const weight = parseFloat(document.getElementById('weight').value);
  const superFitWeight = 22 * (heightMeters ** 2); // Super Fit weight in kg
  const dailyDeficit = [300, 400, 500, 600][parseInt(document.getElementById('activity').value)];
  const weightToLose = weight - superFitWeight;

  // Calculate days to reach the target weight
  const daysToFit = weightToLose > 0 ? Math.ceil((weightToLose * 7700) / dailyDeficit) : 0;

  // Update display
  const daysDisplay = document.getElementById('days-to-fit');
  daysDisplay.textContent = daysToFit > 0 ? daysToFit : "You're already Super Fit!";
}

// Attach Event Listeners
document.querySelectorAll('input[type="range"]').forEach(slider => {
  slider.addEventListener('input', calculateVitals);
});
document.getElementById('name').addEventListener('input', updateNameAndTargetWeight);
document.getElementById('height').addEventListener('input', () => {
  updateNameAndTargetWeight();
  calculateDaysToFit();
});
document.getElementById('weight').addEventListener('input', calculateDaysToFit);

// Initial Calculations
calculateVitals();
calculateDaysToFit();
updateNameAndTargetWeight();
