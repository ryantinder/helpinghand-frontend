import { useState } from 'react';

function DonateButton() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  };

  const handleConfirm = () => {
      console.log("hello")
    setShowPopup(false);
    document.body.style.backgroundColor = "white";
  };

  return (
    <div className="">
        
    </div>
  );
}

export default DonateButton;