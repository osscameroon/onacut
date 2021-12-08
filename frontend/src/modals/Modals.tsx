import React from "react";
import "./Modal.css";
import close from "../../src/assets/img/close.png";
import { ModalItems } from "./ModalItems";
import location from "../assets/img/location.png";
import elec from "../assets/img/elec.png";
import clock from "../assets/img/clock.png";

export const Modal = (props: any) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal ml-0 md:ml-24 bg-blueDark rounded-l-xl w-full md:w-1/3 rounded-r-xl">
      <div className="modal__title flex justify-between items-center">
        <div className="modal__title-description">
          <p
            style={{ fontFamily: " 'Varela Round', sans-serif" }}
            className="flex text-blueDark-500  px-4 text-2xl py-1"
          >
            {props.ville}
          </p>
          <p
            style={{ fontFamily: " 'Varela Round', sans-serif" }}
            className="flex px-4 text-sm py-1 text-gray-200"
          >
            {props.numberOfAlerts} Rapports d'utilisateur
          </p>
        </div>
        <div className="modal__title-close">
          <button onClick={props.onClose}>
            <img className="w-6 h-6" src={close} alt="" />
          </button>
        </div>
      </div>
      <div style={{ height: "1px" }} className="bg-gray-400 w-full my-4" />
      <div className="modal__items">
        <ModalItems
          image={elec}
          text={`${props.numberOfAlerts} alertes signalé une panne de courant`}
        />
        <ModalItems image={clock} text="07.12.2021 21:50, 21:50, 21:58 " />
        <ModalItems image={location} text="Am Dobben 133, 28203 Brême" />
      </div>
    </div>
  );
};
