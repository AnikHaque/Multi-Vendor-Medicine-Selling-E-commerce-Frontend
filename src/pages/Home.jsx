import Hero from "../components/Hero/Hero";
import PopularCategories from "../components/Categories/PopularCategories";
import ServiceCards from "../components/Tasks/FeaturedTasks";
import PopularSellers from "../components/Seller/PopularSeller";
import AppPromo from "../components/AppPromo/AppPromo";
import PopularTasks from "../components/Tasks/PopularTasks";
import Stat from "../components/Stat/Stat";
import HomeBlog from "../components/Blogs/HomeBlogs";
import WhyChooseUs from "../components/Choose/Choose";
import MedicineCategorySection from "../components/Categories/Categories";
import Medicine from "../components/Medicines/Medicine";
import Shop from "../components/Shop/Shop";

import DiscountProductsSlider from "../components/Medicines/DiscountMedicine";
import DiscountSlider from "../components/Medicines/DiscountMedicine";
import TopMonthlyMedicines from "../components/Medicines/TopMonthMedicine";
import CategoryCardSection from "../components/Categories/Categories";
import HealthcareProducts from "../components/Products/Products";
import TodayHotDeals from "../components/HotDeal/HotDeal";


const Home = () => {
  return (
    <div
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <Hero></Hero>
<CategoryCardSection></CategoryCardSection>
<Shop></Shop>
      <ServiceCards />
      <HealthcareProducts></HealthcareProducts>
      <TodayHotDeals></TodayHotDeals>
      <WhyChooseUs></WhyChooseUs>
      <AppPromo />
      <HomeBlog></HomeBlog>
    </div>
  );
};

export default Home;
