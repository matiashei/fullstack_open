import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const daily_exercises = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target: number = Number(req.body.target);
  if (!daily_exercises || target === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }
  if (
    !Array.isArray(daily_exercises) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises.some((n: any) => isNaN(Number(n))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
  const result = calculateExercises(
    daily_exercises.map((n: unknown) => Number(n)),
    target
  );
  return res.status(200).json(result);
});


app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (height === undefined || weight === undefined) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }
  const result = calculateBmi(height, weight);
  res.status(200).json({ height, weight, result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});