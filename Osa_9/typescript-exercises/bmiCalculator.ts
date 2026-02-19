const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters ** 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi > 25) {
    return 'Overweight';
  } else {
    return 'Normal range';
  }
}

console.log(calculateBmi(180, 74))