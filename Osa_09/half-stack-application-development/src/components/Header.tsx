import type { CourseName } from '../types';

const Header = (props: CourseName) => {
  return (
    <h1>{props.name}</h1>
  );
};

export default Header;