import { useEffect, useState } from "react";

export default function SpinnerLoader() {
  const [text, setText] = useState("");
  const [showImg, setShowImg] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setText("I waited for 3 seconds");
      setShowImg(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <>
      <div>
        {showImg ? (
          <img src="/loadingAnimation.svg" alt="Loading..." />
        ) : (
          <h3>{text}</h3>
        )}
      </div>
    </>
  );
}
