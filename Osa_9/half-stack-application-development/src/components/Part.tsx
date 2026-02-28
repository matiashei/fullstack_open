import type { CoursePart } from "../types";

const Part = (props: { part: CoursePart }) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <br />
          <i>{props.part.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <br />
          project exercises {props.part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <br />
          <i>{props.part.description}</i>
          <br />
          submit to {props.part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>{props.part.name} {props.part.exerciseCount}</b>
          <br />
          <i>{props.part.description}</i>
          <br />
          required skils: {props.part.requirements}
        </p>
      )
    default:
      return null;
  }
};

export default Part;