import { Main } from "./components/layout/Main/Main";

import "normalize.css";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles["app"]}>
      <Main />
    </div>
  );
}

export default App;
