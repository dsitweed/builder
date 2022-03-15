import React, { memo } from "react";

const Photo1 = ({ src, alt, ...props }) => {
  return (
    src !== "" && (
      <img
        src={src}
        alt={alt}
        style={{ maxHeight: "120px", maxWidth: "120px" }}
        {...props}
      />
    )
  );
};

export default memo(Photo1);
