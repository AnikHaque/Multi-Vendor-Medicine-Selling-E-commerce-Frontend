import Hero from "../components/Hero/Hero";
import ServiceCards from "../components/Tasks/FeaturedTasks";
import AppPromo from "../components/AppPromo/AppPromo";
import HomeBlog from "../components/Blogs/HomeBlogs";
import WhyChooseUs from "../components/Choose/Choose";
import Shop from "../components/Shop/Shop";
import CategoryCardSection from "../components/Categories/Categories";
import HealthcareProducts from "../components/Products/Products";
import TodayHotDeals from "../components/HotDeal/HotDeal";
import PromoSection from "../components/PromoSection/PromoSection";


const Home = () => {
  return (
    <div
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <Hero></Hero>
<CategoryCardSection></CategoryCardSection>
<Shop></Shop>
      <ServiceCards />
            <PromoSection></PromoSection>
      <HealthcareProducts></HealthcareProducts>
      <TodayHotDeals></TodayHotDeals>
      <WhyChooseUs></WhyChooseUs>
      <AppPromo />
      <HomeBlog></HomeBlog>
    </div>
  );
};

export default Home;
