import React from "react";
import { useForm, useAuth } from "../../../hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MsgError, MsgSuccess, Global } from "../../../helpers";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
  const { form, changed } = useForm({});
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    try {
      const res = await fetch(`${Global.endpoints.backend.Prod}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToLogin),
      });

      const data = await res.json();

      if (res.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setAuth(data.user);
        MsgSuccess(`Usuario logueado correctamente!!`);
        setTimeout(() => {
          user.role == "ROLE_ROOT" || user.role == "ROLE_ADMIN"
            ? navigate("/admin")
            : navigate("/user");
        }, 6000);
      } else {
        MsgError(data.message);
      }
    } catch (error) {
      throw new Error(error);
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