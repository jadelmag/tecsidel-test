import React, { useCallback } from "react";

export interface CustomImageProps {
  author: string;
}

const CustomImage: React.FC<CustomImageProps> = React.memo(({ author }) => {
  const createImage = useCallback((author: string) => {
    const image = `https://robohash.org/${encodeURIComponent(author)}`;

    return image;
  }, []);

  return (
    <img
      alt={author}
      src={createImage(author)}
      className="w-10 h-10 rounded-full"
    />
  );
});

export default CustomImage;
