import { useState } from "react";
import { MagicMotion } from "react-magic-motion";
import {ListaPeliculas} from "./movies/ListaPeliculas";
import ListUsers from "./users/ListUsers";

export function AdminDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isActive, setIsActive] = useState("Peliculas");

  const handleActive = (txt) => {
    setIsActive(txt);
  };

  return (
    <div className="flex">
      <section className="h-screen">
        <MagicMotion>
          <aside
            style={{ borderRadius: "0.85rem" }}
            className={`overflow-hidden font-bold gap-4 text-dark flex flex-col bg-sky-light justify-between py-[3rem] pl-[1rem] pr-[2.3rem] my-[1rem] mx-[2rem] ${
              isCollapsed ? "w-[1.3rem]" : "w-[20rem]"
            }`}
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {!isCollapsed && (
                <h4 style={{ margin: 0 }}>Panel de Administración</h4>
              )}

              <button
                style={{ cursor: "pointer", padding: 0, border: 0 }}
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isCollapsed ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12.9999V10.9999H15.4853L12.2427 7.75724L13.6569 6.34303L19.3137 11.9999L13.6569 17.6567L12.2427 16.2425L15.4853 12.9999H1Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.2877 6V18H22.2877V6H20.2877Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg
                    style={{ minWidth: "24px", minHeight: "24px" }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.2877 11.0001V13.0001H7.80237L11.045 16.2428L9.63079 17.657L3.97394 12.0001L9.63079 6.34326L11.045 7.75748L7.80236 11.0001H22.2877Z"
                      fill="currentColor"
                    />
                    <path d="M3 18V6H1V18H3Z" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>

            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                margin: 0,
                padding: 0,
              }}
            >
              <li
                style={{
                  display: "flex",
                  gap: "0.8rem",
                  alignItems: "center",
                  width: "fit-content",
                }}
                onClick={() => handleActive("Peliculas")}
              >
                <i
                  className={`fa-solid fa-film text-2xl ${
                    isActive == "Peliculas" ? "" : "text-sky-hover"
                  }`}
                ></i>
                Peliculas
              </li>

              <li
                style={{
                  display: "flex",
                  gap: "0.8rem",
                  alignItems: "center",
                  width: "fit-content",
                }}
                className={`cursor-pointer ${
                  isActive == "Usuarios" ? "" : "text-sky-hover"
                }`}
                onClick={() => handleActive("Usuarios")}
              >
                <i className={`fa-solid fa-user text-[27px]`}></i>
                Usuarios
              </li>
            </ul>
          </aside>
        </MagicMotion>
      </section>
      <section className=" my-[1.5rem] ml-[12rem]">
        {isActive === "Peliculas" && <ListaPeliculas />}
        {isActive === "Usuarios" && <ListUsers />}
      </section>
    </div>
  );
}
