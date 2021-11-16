import React, { useRef, useState } from "react";
import chevron from "../../assets/img/chevron.png";
interface AccordionProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef(null);

  function toggleAccordion() {
    setActive(active === false ? true : false);
    // @ts-ignore
    setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
    setRotate(
      active
        ? "transform duration-700 ease"
        : "transform duration-700 ease rotate-180"
    );
  }

  return (
    <div className="flex flex-col">
      <button
        className="py-6 box-border text-white appearance-none cursor-pointer focus:outline-none flex items-start  justify-between"
        onClick={toggleAccordion}
      >
        <p
          style={{
            fontFamily: " 'Varela Round', sans-serif",
          }}
          className="inline-block text-white text-footnote light text-left"
        >
          {title}
        </p>
        <img
          src={chevron}
          alt="Chevron icon"
          className={`${rotate} inline-block w-5 h-5`}
        />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto transition-max-height duration-700 ease-in-out"
      >
        <div
          style={{
            fontFamily: " 'Varela Round', sans-serif",
          }}
          className="pb-10 md:w-3/5 text-gray-300 text-sm"
        >
          {content}
        </div>
      </div>
    </div>
  );
};
