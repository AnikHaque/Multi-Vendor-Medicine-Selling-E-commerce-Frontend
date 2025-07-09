import React from "react";

const featuresLeft = [
  {
    icon: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/Why_Choose_Us_icon6.png",
    title: "Lowest Price Guarantee",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
 {
    icon: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/Why_Choose_Us_icon6.png",
    title: "Lowest Price Guarantee",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/Why_Choose_Us_icon6.png",
    title: "Lowest Price Guarantee",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  }
];

const featuresRight = [
   {
    icon: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/Why_Choose_Us_icon6.png",
    title: "Lowest Price Guarantee",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
 {
    icon: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/Why_Choose_Us_icon6.png",
    title: "Lowest Price Guarantee",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    icon: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/Why_Choose_Us_icon6.png",
    title: "Lowest Price Guarantee",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  }
];

export default function WhyChooseUs() {
  return (
    <div className="bg-white  py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800 ">
        WHY CHOOSE US
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Features */}
        <div className="flex flex-col gap-8">
          {featuresLeft.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
               <div className=" text-black  w-28 h-28  rounded-full text-xl">
                <img src={feature.icon}></img>
              </div>
              <div>
                <h4 className="text-md font-semibold text-black">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Doctor Image */}
        <div className="flex justify-center">
          <img
            src="https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/why-choose-us.png"
            alt="doctor"
            className="w-full max-w-xs md:max-w-sm object-contain"
          />
        </div>

        {/* Right Features */}
        <div className="flex flex-col gap-8">
          {featuresRight.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className=" text-black  w-28 h-28  rounded-full text-xl">
                <img src={feature.icon}></img>
              </div>
              <div>
                <h4 className="text-md font-semibold ">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
