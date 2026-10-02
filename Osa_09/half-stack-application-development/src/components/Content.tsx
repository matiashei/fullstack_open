import Part from './Part';
import type { CoursePart } from '../types';

const Content = (props: { parts: CoursePart[] }) => {
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