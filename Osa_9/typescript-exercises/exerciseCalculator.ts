interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.reduce((x, n) => {
    if (n > 0) {
      x++;
    }
    return x;
  }, 0);

  const average = dailyHours.reduce((x, n) => {
    x += n;
    return x;
  }, 0) / periodLength;

  const success = average >= target;

  let rating = 1;
  let ratingDescription = "";

  if (average >= target) {
    rating = 3;
    ratingDescription = "good";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))