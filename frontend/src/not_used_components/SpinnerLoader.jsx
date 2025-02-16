import { useEffect, useState } from "react";

export default function SpinnerLoader() {
  const [text, setText] = useState("");
  const [showImg, setShowImg] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setText("I waited for 3 seconds");
      setShowImg(false); // Hide the image after 3 seconds
    }, 3000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once

  return (
    <>
      <div>
        {showImg ? (
          <img src="/sp.svg" alt="Loading spinner" /> // Correct path assuming the file is in the public directory
        ) : (
          <h3>{text}</h3>
        )}
      </div>
    </>
  );
}
