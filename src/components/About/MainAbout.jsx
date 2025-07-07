import AboutBanner from "./AboutBanner";
import { AboutContent } from "./AboutContent";
import FeaturedAbout from "./FeaturedAbout";
import Pricing from "./Pricing";

const MainAbout = () => {
  return (
    <>
      <AboutBanner></AboutBanner>
      <AboutContent></AboutContent>
      <FeaturedAbout></FeaturedAbout>
      <Pricing></Pricing>
    </>
  );
};

export default MainAbout;
