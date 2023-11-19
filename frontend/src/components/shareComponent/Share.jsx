import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer } from "react-toastify";
import { MsgSuccess } from "../../helpers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Share.css";

function Share() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <ToastContainer />
      <Button onClick={toggle} className="border-none hover:bg-transparent">
        <i className="fa-solid fa-share-nodes text-lg mx-1"></i>
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered={true}
        contentClassName="bg-dark"
      >
        <ModalHeader>
          <div className="flex flex-row items-center justify-between w-[29rem]">
            <h3 className="font-extrabold text-xl">Compartir</h3>
            <button onClick={toggle}>
              <i className="fa-solid fa-xmark text-lg mx-1"></i>
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <section className="flex flex-col">
            <div className="w-full">
              <ul className="flex mx-auto justify-center">
                <li className="mx-3 rounded-pill w-[3.6rem] h-[3.6rem] bg-whatsapp flex justify-center items-center">
                  <a
                    className="link-social"
                    target="_blank"
                    href="https://wa.me"
                  >
                    <i class="fa-brands fa-whatsapp text-4xl mx-1 text-white font-extrabold"></i>
                  </a>
                </li>
                <li className="mx-3 rounded-pill w-[3.6rem] h-[3.6rem] bg-twitter flex justify-center items-center">
                  <a
                    className="link-social"
                    target="_blank"
                    href="https://twitter.com"
                  >
                    <i class="fa-brands fa-twitter text-3xl mx-1 text-white font-extrabold"></i>
                  </a>
                </li>
                <li className="mx-3 rounded-pill w-[3.6rem] h-[3.6rem] bg-facebook flex justify-center items-center">
                  <a
                    className="link-social"
                    target="_blank"
                    href="https://www.facebook.com"
                  >
                    <i class="fa-brands fa-facebook-f text-3xl mx-1 text-white font-extrabold"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex bg-[#0a0e12] mt-3 mb-1 px-3 py-2 rounded-2xl justify-between items-center">
              <CopyToClipboard
                text={window.location.href}
                onCopy={() => MsgSuccess("Copiado!")}
              >
                <p className="font-semibold text-lg">
                  {"http://1023c12-grupo2-pi.s3-website-us-east-1.amazonaws.com" +
                    window.location.pathname}
                </p>
              </CopyToClipboard>
              <CopyToClipboard
                text={window.location.href}
                onCopy={() => MsgSuccess("Copiado!")}
              >
                <Button
                  className="btn py-1 px-[10px] bg-sky text-dark rounded-pill font-extrabold text-[16px] border-none"
                  onClick={toggle}
                >
                  Copiar
                </Button>
              </CopyToClipboard>
            </div>
          </section>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Share;
