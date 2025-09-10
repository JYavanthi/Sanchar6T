const Promotion = () => {
  return (
    <section className="relative bg-[#226cb2] w-full max-w-[1976px] h-[256px] mx-auto overflow-visible">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center px-12 gap-x-8">
        
        {/* Left Text */}
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-[30px] font-bold text-white mb-4 leading-snug">
            25,000+ people booked from Bengaluru
          </h1>
          <h1 className="text-[35px] font-light text-white leading-snug">
            on <span className="font-semibold">Sanchar</span>
            <span className="font-semibold">6</span>
            <span className="font-semibold">T</span> last month
          </h1>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-end h-full pr-8">
          <img
            src="https://productcatalo.my.canva.site/buses/_assets/media/1840674597058f9cf85ebbf4ce59e301.png"
            alt="Promotion Banner"
            className="absolute bottom-[10px] right-0 h-[330px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Promotion;
