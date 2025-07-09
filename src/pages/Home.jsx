import Hero from "../components/Hero/Hero";
import PopularCategories from "../components/Categories/PopularCategories";
import ServiceCards from "../components/Tasks/FeaturedTasks";
import PopularSellers from "../components/Seller/PopularSeller";
import AppPromo from "../components/AppPromo/AppPromo";
import PopularTasks from "../components/Tasks/PopularTasks";
import Stat from "../components/Stat/Stat";
import HomeBlog from "../components/Blogs/HomeBlogs";
import WhyChooseUs from "../components/Choose/Choose";

const Home = () => {
  return (
    <div
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <Hero></Hero>
      <PopularCategories />

      <ServiceCards />
      <Stat></Stat>
      <PopularSellers />
    
      <PopularTasks></PopularTasks>
      <WhyChooseUs></WhyChooseUs>
      <AppPromo />
      <HomeBlog></HomeBlog>
    </div>
  );
};

export default Home;
