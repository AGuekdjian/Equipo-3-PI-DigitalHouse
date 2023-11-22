import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TermsAndConditions.css";

export const TermsAndConditions = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function obtenerFechaActual() {
    let fechaActual = new Date();
    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1;
    let dia = fechaActual.getDate();
    let fechaFormateada =
      (dia < 10 ? "0" : "") +
      dia +
      "/" +
      (mes < 10 ? "0" : "") +
      mes +
      "/" +
      año;
    return fechaFormateada;
  }
  let fechaActual = obtenerFechaActual();

  return (
    <div>
      <Button onClick={toggle} className="border-none hover:bg-transparent">
        <p className="border-none underline underline-offset-4 text-dark">
          Acepto <span className="font-semibold">Terminos</span> y
          <span className="font-semibold"> Condiciones</span>
        </p>
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="lg"
        centered={true}
        contentClassName="bg-dark"
      >
        <ModalHeader>
          <div className="flex flex-row items-center justify-between w-[47rem]">
            <h3 className="font-extrabold text-xl">
              Términos y Condiciones de Uso de CineSearchPro
            </h3>
            <button onClick={toggle}>
              <i className="fa-solid fa-xmark text-lg mx-1"></i>
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <section className="flex flex-col">
            <div className="w-full terms">
              <span>Última actualización: {fechaActual}</span>
              <br />
              <br />
              Bienvenido a CineSearchPro. Antes de utilizar nuestros servicios,
              le pedimos que lea detenidamente estos Términos y Condiciones, ya
              que establecen los términos legales que rigen el uso de nuestra
              plataforma. Al acceder y utilizar CineSearchPro, acepta estar
              sujeto a estos términos. Si no está de acuerdo con alguna parte de
              estos términos, le recomendamos que no utilice nuestros servicios.
              <br />
              <br />
              <span className="font-bold text-lg">
                1. Uso de la Plataforma:
              </span>
              <br />
              <span className="font-bold"> a.</span> CineSearchPro es una
              plataforma que permite a los usuarios buscar información sobre
              películas, registrarse, y realizar operaciones relacionadas con la
              gestión de listas de películas y reservas de funciones de cine.{" "}
              <br />
              <span className="font-bold"> b.</span> Usted se compromete a
              utilizar CineSearchPro de manera ética y legal, respetando las
              leyes y regulaciones locales, nacionales e internacionales. <br />
              <br />
              <span className="font-bold text-lg">2. Registro de Usuario:</span>
              <br />
              <span className="font-bold text-md"> a.</span> Para acceder a
              ciertas funciones de CineSearchPro, es necesario registrarse como
              usuario. <br />
              <span className="font-bold"> b.</span> Usted es responsable de
              mantener la confidencialidad de su información de inicio de sesión
              y es el único responsable de todas las actividades que ocurran
              bajo su cuenta. <br />
              <br />
              <span className="font-bold text-lg">
                3. Búsqueda y Reserva de Películas:
              </span>
              <br />
              <span className="font-bold text-md"> a.</span> Los usuarios pueden
              buscar información sobre películas y realizar reservas para
              funciones en cines disponibles.
              <br />
              <span className="font-bold"> b.</span> Las reservas están sujetas
              a la disponibilidad de funciones y a las condiciones establecidas
              por los cines asociados. <br />
              <br />
              <span className="font-bold text-lg">
                4. Gestión de Listas de Películas:
              </span>
              <br />
              <span className="font-bold text-md"> a.</span> Los usuarios pueden
              agregar, listar, modificar o eliminar películas en sus perfiles.{" "}
              <br />
              <span className="font-bold"> b.</span> La información
              proporcionada al agregar películas debe ser precisa y cumplir con
              nuestras políticas. <br />
              <br />
              <span className="font-bold text-lg">
                5. Responsabilidades del Usuario:
              </span>
              <br />
              <span className="font-bold text-md"> a.</span> Usted es
              responsable de la información que proporciona en la plataforma.{" "}
              <br />
              <span className="font-bold"> b.</span> CineSearchPro no se hace
              responsable de la precisión de la información proporcionada por
              los usuarios ni de las acciones tomadas en base a dicha
              información. <br />
              <br />
              <span className="font-bold text-lg">6. Privacidad:</span>
              <br />
              <span className="font-bold text-md"> a.</span> La recopilación y
              el uso de información personal están sujetos a nuestra Política de
              Privacidad, disponible en [enlace a la política de privacidad].{" "}
              <br />
              <br />
              <span className="font-bold text-lg">
                7. Modificaciones y Actualizaciones:
              </span>
              <br />
              <span className="font-bold text-md"> a.</span> Nos reservamos el
              derecho de modificar o actualizar estos Términos y Condiciones en
              cualquier momento. <br />
              <span className="font-bold"> b.</span> Se le notificará sobre
              cambios significativos, y el uso continuado de CineSearchPro
              después de dichos cambios constituirá su aceptación de los mismos.
              <br />
              <br />
              <span className="font-bold text-lg">
                8. Terminación del Servicio:
              </span>
              <br />
              <span className="font-bold text-md"> a.</span> Nos reservamos el
              derecho de suspender o cancelar su acceso a CineSearchPro si viola
              estos Términos y Condiciones o participa en actividades que
              consideremos inapropiadas. <br />
              <br />
              <span className="font-bold text-lg">9. Contacto:</span>
              <br />
              <span className="font-bold text-md"> a.</span> Para preguntas o
              comentarios sobre estos Términos y Condiciones, por favor
              contáctenos a [correo electrónico de contacto]. <br />
              <br />
              Gracias por utilizar CineSearchPro. ¡Esperamos que disfrute de su
              experiencia en nuestra plataforma!
            </div>
          </section>
        </ModalBody>
      </Modal>
    </div>
  );
};
