import React from "react";
import { useForm } from "../../../hooks/useForm";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MsgError, MsgSuccess, Global } from "../../../helpers";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

export function Register() {
  const { form, changed } = useForm({});
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

    let newUser = form;

    try {
      const res = await fetch(
        `${Global.endpoints.backend.Prod}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const data = await res.json();

      if (data.error_code == "REGISTER_ERROR") {
        MsgError(data.error_message);
        return;
      } else {
        MsgSuccess("Registrado correctamente");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full">
        <h1 className="font-extrabold text-2xl text-sky">CINESEARCHPRO</h1>
        <ToastContainer />
        <form
          onSubmit={saveUser}
          className="form mt-4 w-[28rem] bg-slate-600 py-4 px-4 rounded-xl text-center"
        >
          <h1 className="text-dark text-lg">Registrarse</h1>
          <div className="flex flex-col items-start inputs-container">
            <div>
              <div className="flex group-by-name-surname">
                <div className="mt-3.5 w-48">
                  <input
                    className="py-2 px-4 w-full rounded-xl shadow-sm placeholder-slate-400 text-gray-700 focus:outline-none"
                    type="text"
                    name="name"
                    onChange={changed}
                    placeholder="Nombre"
                  />
                </div>
                <div className="mt-3.5 w-48 ml-4">
                  <input
                    className="py-2 px-4 w-full rounded-xl shadow-sm placeholder-slate-400 text-gray-700 focus:outline-none"
                    type="text"
                    name="last_name"
                    onChange={changed}
                    placeholder="Apellido"
                  />
                </div>
              </div>
            </div>
            <div className="w-full mt-2.5">
              <input
                className="input-email py-2 px-4 w-full rounded-xl shadow-sm placeholder-slate-400 text-gray-700 focus:outline-none invalid:text-red-600"
                type="email"
                name="email"
                onChange={changed}
                placeholder="Correo electronico"
              />
            </div>
            <div className="my-2.5">
              <input
                className="input-pwd py-2 px-4 rounded-xl shadow-sm placeholder-slate-400 text-gray-700 focus:outline-none"
                type="password"
                name="password"
                onChange={changed}
                placeholder="Contrasenia"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <input
              type="submit"
              value="Registrarse"
              className="w-36 mt-1 py-2 px-4 bg-sky rounded-pill btn text-dark font-extrabold"
            />
            <NavLink
              to="/login"
              className="mt-1 transition ease hover:text-dark duration-300"
            >
              Iniciar Sesion
            </NavLink>
          </div>
        </form>
      </section>
    </>
  );
}
