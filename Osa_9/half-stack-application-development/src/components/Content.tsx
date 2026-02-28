import Part from './Part';
import type { CoursePart } from '../types';

interface CourseParts {
  parts: CoursePart[];
}

const Content = (props: CourseParts) => {
  return (
    <div>
      {props.parts.map(part => (
        <div key={part.name}>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;