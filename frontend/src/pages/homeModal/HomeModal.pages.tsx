import React, { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modal";
import { MyText } from "../../components/myText/MyText.component";
import { LANGUAGE } from "../../constants/language";

const HomeModal = () => {
    let [Modal, open, close, isOpen] = useModal("root", {
        preventScroll: true,
        closeOnOverlayClick: false,
    });

    let [myModal, setMyModal] = useRecoilState(modalState);
    let [openModal, setOpenModal] = useState(open);

    useEffect(() => {
        setOpenModal(() => (open = close));
    });

    return (
        <Modal>
            <div className="h-80 bg-gray-700 w-96 p-5">
                <MyText
                    variant="title"
                    myText={LANGUAGE.alert.info}
                    myTextColor="text-white"
                    myTextAlign="text-center"
                />
                <div className="py-2" />
                <MyText
                    variant="item"
                    myText={LANGUAGE.alert.notification}
                    myTextColor="text-white"
                    myTextAlign="text-center"
                />
                <div className="site__btn-panne flex items-center justify-center bg-ind p-2 mx-auto rounded-3xl mt-6 w-1/2">
                    <p
                        onClick={() => {
                            setMyModal(() => (myModal = "close"));
                            localStorage.setItem("modalValue", myModal);
                            close();
                        }}
                        style={{ fontFamily: " 'Varela Round', sans-serif" }}
                        className="flex cursor-pointer px-4 py-1 text-sm text-center text-gray-200"
                    >
                        {LANGUAGE.homeModal.accept}
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default HomeModal;
