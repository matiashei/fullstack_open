import type { CourseParts } from '../types';

const Total = (props: CourseParts) => {
  const total = props.parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <p>Number of exercises {total}</p>
  );
};

export default Total;