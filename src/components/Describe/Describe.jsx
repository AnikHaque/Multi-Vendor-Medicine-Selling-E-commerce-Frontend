
const Describe = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[60vh] flex items-center"
      style={{ backgroundImage: "url('https://demos.codezeel.com/prestashop/PRS22/PRS220545/default/modules/cz_themeimages/views/img/parallax_img.jpg')" }} // Replace with your image path
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content container */}
      <div className="relative md:px-80   text-white">
        <p className="uppercase text-sm tracking-wider mb-2">Higher Level of Care</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Genuine Commitment <br /> To Your Health
        </h1>
        <p className="mb-6 max-w-md">
          Lorem Ipsum is simply the printing and typesetting industry
        </p>
        <button className="bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded font-bold">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Describe;
