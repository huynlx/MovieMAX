import { FC, HTMLProps, useEffect, useRef, useState } from "react";
import InView from "./InView";

interface ImageProps {
  opacity?: number;
  src: string;
}

const Image: FC<HTMLProps<HTMLImageElement> & ImageProps> = ({
  crossOrigin: _,
  opacity = 1,
  src,
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);
  const [realSrc, setRealSrc] = useState("");

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handler = () => {
      setLoaded(true);
    };

    const current = imageRef.current;

    current?.addEventListener("load", handler);

    // setRealSrc(src);

    return () => current?.removeEventListener("load", handler);
  }, [src]);

  return (
    <InView onInView={() => setRealSrc(src)}>
      <img
        ref={imageRef}
        style={{
          opacity: loaded ? null : 0,
        }}
        src={realSrc}
        {...others}
      />
    </InView>
  );
};

export default Image;