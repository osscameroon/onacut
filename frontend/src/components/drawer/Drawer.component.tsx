import React, { useState } from "react";
import { ITEMS } from "../../assets/data/Items.data";
import Drawer from "react-modern-drawer";
import menu from "../../assets/img/menu.png";

export const MyDrawer = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div
      className={`site__drawer p-2 flex items-center justify-${props.justify}`}
    >
      <button className="flex items-center" onClick={toggleDrawer}>
        <img
          alt="menu"
          className={`w-8 h-auto mt-2 md:mt-4 md:ml-40`}
          src={menu}
        />
      </button>
      <Drawer
        size={350}
        style={{ backgroundColor: "#FF4F00" }}
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
      >
        <div className="p-4 md:p-10">
          {ITEMS.map((i: any) => (
            <div
              key={i?.name}
              style={{ borderColor: "#cecece" }}
              className="drawer__item border-b items-center flex pt-6 md:pt-10 pb-4"
            >
              <img alt="icon" src={i.icon} className="w-7 h-auto" />
              <a
                className="pl-4"
                style={{
                  color: "#fefefe",
                  fontFamily: " 'Varela Round', sans-serif",
                }}
                href={i.link}
              >
                {i.name}
              </a>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
