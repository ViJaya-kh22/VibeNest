import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselSection = ({ title, items, renderCard }) => {
  
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="flex flex-col gap-3 px-5 py-3 bg-zinc-900 rounded-md w-full">
      
      {/* Header */}
      <h2 className="text-lg font-bold">{title}</h2>

      {/* Carousel */}
      <div className="relative group/carousel overflow-hidden">
        
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-0
                     bg-zinc-800/90 hover:bg-zinc-600 rounded-full p-1.5
                     opacity-0 group-hover/carousel:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-8 pb-2"
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[180px]">
              {renderCard(item)}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-0
                     bg-zinc-800/90 hover:bg-zinc-600 rounded-full p-1.5
                     opacity-0 group-hover/carousel:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default CarouselSection;