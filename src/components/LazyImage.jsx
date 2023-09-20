import { useEffect, useState } from "react";

const LazyImage = ({ url, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [opacity, setOpacity] = useState("opacity-0");

  // 처음 투명도 0으로 시작했다가 이미지를 가져오면 그때 보여주기
  useEffect(() => {
    if (isLoading) setOpacity("opacity-0");
    else setOpacity("opacity-100");
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="absolute h-full z-10 w-full flex items-center justify-center">
          ...loading
        </div>
      )}
      <img
        src={url}
        alt={alt}
        loading="lazy"
        width="100%"
        height="auto"
        onLoad={() => setIsLoading(false)}
        className={`object-contain h-full ${opacity}`}
      />
    </>
  );
};

export default LazyImage;
