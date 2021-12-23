import React from "react";

export const ModalItems = (props: any) => {
    return (
        <div className="modal__items flex items-center pb-4">
            <div className="modal__item-icon">
                <img className="w-6 h-6 mr-10" src={props.image} alt="" />
            </div>
            <div className="modal__item-text pl-4">
                <p
                    style={{ fontFamily: " 'Varela Round', sans-serif" }}
                    className={`text-sm  text-gray-200 overflow-auto flex h-${props.h}`}
                >
                    {props.text}
                </p>
            </div>
        </div>
    );

};
