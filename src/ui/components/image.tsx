import React from "react";

export interface CustomImageProps {
  author: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ author }) => {
  return (
    <img
      alt={author}
      src={`https://robohash.org/${encodeURIComponent(author)}`}
      className="w-10 h-10 rounded-full"
    />
  );
};

export default CustomImage;
