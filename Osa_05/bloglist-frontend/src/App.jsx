import cors from "cors";

app.use(cors());

import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState < any > (null);

  useEffect(() => {
    fetch("http://localhost:3000/api/data")
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;