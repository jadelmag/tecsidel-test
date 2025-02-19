import React, { useMemo } from "react";

export interface CustomImageProps {
  author: string;
}

const CustomImage: React.FC<CustomImageProps> = React.memo(({ author }) => {
  const image = useMemo(() => {
    return `https://robohash.org/${encodeURIComponent(author)}`;
  }, [author]);

  return <img alt={author} src={image} className="w-10 h-10 rounded-full" />;
});

export default CustomImage;
