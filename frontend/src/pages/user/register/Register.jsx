import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MsgError, MsgSuccess, Global } from "../../../helpers";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import { TermsAndConditions } from "../../../components/termsAndConditions/TermsAndConditions";

export function Register() {
  const { form, changed } = useForm({});
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const { endpoints, emailJS } = Global;
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    const passwordRegex = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!passwordRegex.test(event.target.value)) {
      setPasswordError("La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número");
      setPasswordConfirm(false);
    } else {
      setPasswordError("");
      setPasswordConfirm(true);
    }
  };

  const handleInputPasswordChange = (event) => {
    changed(event);
    handlePasswordChange(event);
  };

  const sendEmail = async (mailUrlApi, mailBody) => {
    await fetch(mailUrlApi, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(mailBody),
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    let newUser = form;

    try {
      if (isChecked && passwordConfirm) {
        const res = await fetch(`${endpoints.backend.Prod}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (res.status === 200) {
          MsgSuccess("Registrado correctamente");
          let mailBody = {
            service_id: emailJS.service_id,
            template_id: emailJS.template_id,
            user_id: emailJS.user_id,
            template_params: {
              user_name: newUser.name,
              user_email: newUser.email,
            },
          };
          sendEmail(emailJS.mailUrlApi, mailBody);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          const data = await res.json();
          MsgError(data.error_message);
          return;
        }
      } else {
        MsgError(
          "Faltan datos."
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full">
        <h1 className="font-extrabold text-4xl text-sky">CINESEARCHPRO</h1>
        <ToastContainer />
        <form
          onSubmit={saveUser}
          className="form mt-4 w-[28rem] bg-slate-600 py-4 px-4 rounded-xl text-center"
        >
          <h1 className="text-dark text-xl font-bold">Registrarse</h1>
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
                onChange={handleInputPasswordChange}
                value={password}
                placeholder="Contraseña"
              />
            </div>
            <div className="ml-6">
              <label className="flex">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <TermsAndConditions />
              </label>
            </div>
          </div>
          <div className="flex flex-col items-center mt-2">
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
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
        </form>
      </section>
    </>
  );
}
