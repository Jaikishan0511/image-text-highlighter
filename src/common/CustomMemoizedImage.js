import React from "react";
import doc from "../assets/doc.jpg";

const CustomMemoizedImage = React.memo(({ imageRef }) => {

return(
      <img
        ref={imageRef}
        src={doc}
        alt="Document"
        style={{ height: "auto", width: "100%" }}
      />
  )});
  
  export default CustomMemoizedImage;