interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

export const parseArguments = (args: string[]): { dailyHours: number[], target: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(n => Number(n));

  if (isNaN(target) || dailyHours.some(n => isNaN(n))) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    dailyHours,
    target
  }
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

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateExercises };