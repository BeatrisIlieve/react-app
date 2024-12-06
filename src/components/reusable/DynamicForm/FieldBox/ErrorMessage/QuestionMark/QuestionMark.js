import { useState, memo } from "react";

import { Text } from "./Text/Text";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import styles from "./QuestionMark.module.css";

export const QuestionMark = memo(({ text }) => {
  const [displayInfo, setDisplayInfo] = useState(false);

  const toggleDisplayInfo = () => {
    setDisplayInfo((displayInfo) => !displayInfo);
  };

  return (
    <>
      {displayInfo && <Text text={text} />}
      <FontAwesomeIcon
        icon={faQuestion}
        className={styles["icon"]}
        onMouseEnter={() => toggleDisplayInfo()}
        onMouseLeave={() => toggleDisplayInfo()}
        onTouchStart={() => toggleDisplayInfo()}
        onTouchEnd={() => toggleDisplayInfo()}
      />
    </>
  );
});
