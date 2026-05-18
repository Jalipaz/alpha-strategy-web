import "./index.css";
import { Composition } from "remotion";
import { BrandLoop } from "./BrandLoop";
import { WebShowcase } from "./WebShowcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BrandLoop"
        component={BrandLoop}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="WebShowcase"
        component={WebShowcase}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
