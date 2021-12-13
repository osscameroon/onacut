import React, { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import { MyText } from "../../components/myText/MyText.component";

export const HomeModal = () => {
    let [Modal, open, close, isOpen] = useModal("root", {
        preventScroll: true,
        closeOnOverlayClick: true,
    });

    let [openModal, setOpenModal] = useState(open);

    useEffect(() => {
        setOpenModal(() => (open = close));
    });

    return (
        <Modal>
            <div className="h-80 bg-gray-700 w-96 p-5">
                <MyText
                    variant="title"
                    myText="Informations officielles sur Interférences des opérateurs de réseau "
                    myTextColor="text-white"
                    myTextAlign="text-center"
                />
                <div className="py-2" />
                <MyText
                    variant="item"
                    myText="Ce site utilise des cookies pour rendre votre visite sur notre site aussi agréable que possible. Nous utilisons votre emplacement pour vous montrer les rapports de votre région. "
                    myTextColor="text-white"
                    myTextAlign="text-center"
                />
                <div className="site__btn-panne flex items-center justify-center bg-ind p-2 mx-auto rounded-3xl mt-6 w-1/2">
                    <p
                        onClick={() => close()}
                        style={{ fontFamily: " 'Varela Round', sans-serif" }}
                        className="flex cursor-pointer px-4 py-1 text-sm text-center text-gray-200"
                    >
                        J'accepte
                    </p>
                </div>
            </div>
        </Modal>
    );
};
