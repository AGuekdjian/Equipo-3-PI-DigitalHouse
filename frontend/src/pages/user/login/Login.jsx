import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { useAuth } from "../../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
  const { form, changed } = useForm({});
  const [logged, setLogged] = useState("not_sended");
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const msgError = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    try {
      const res = await fetch(
        `${Global.endpoints.backend.backendNode}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToLogin),
        }
      );

      const data = await res.json();

      if (data.status == "Success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setLogged("logged");
        setAuth(data.user);
        setTimeout(() => {
          window.location.href = `${Global.endpoints.frontend.url}/admin`;
        }, 400);
      } else {
        setLogged("error");
        msgError(data.message);
      }
    } catch (error) {
      throw new Error("Ha ocurrido un error!");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <h1 className="font-extrabold text-2xl text-sky">CINESEARCHPRO</h1>
      <ToastContainer />
      <form
        onSubmit={loginUser}
        className="mt-4 w-80 bg-slate-600 py-4 px-4 rounded-xl text-center"
      >
        <h1 className="text-dark text-lg">Iniciar Sesion en CineSearchPro</h1>
        <div>
          <div className="mt-3.5">
            <input
              className="py-2 px-4 rounded-xl shadow-sm placeholder-slate-400 text-gray-700 focus:outline-none invalid:text-red-600"
              type="email"
              name="email"
              onChange={changed}
              placeholder="Correo Electronico"
            />
          </div>
          <div className="my-2.5">
            <input
              className="py-2 px-4 rounded-xl shadow-sm placeholder-slate-400 text-gray-700 focus:outline-none"
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
            value="Iniciar Sesion"
            className="w-36 mt-1 py-2 px-4 bg-sky rounded-pill btn text-dark font-extrabold"
          />
          <NavLink
            to="/register"
            className="mt-1 transition ease hover:text-dark duration-300"
          >
            Registrarse
          </NavLink>
        </div>
      </form>
    </section>
  );
}
