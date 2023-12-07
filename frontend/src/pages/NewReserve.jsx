import { React, useState, useEffect, useContext } from 'react'
import { useParams, Link } from "react-router-dom";
import { Global, GetMovieById, BackTo } from "../helpers";
import { useAuth } from "../hooks/useAuth";
import DateContext from '../context/DatePickerContext';
import { AvailableDates } from '../components/availableDates/AvailableDates';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const NewReserve = () => {

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const { auth } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateId, setSelectedDateId] = useState(null);
  const token = localStorage.getItem("token");
  const [seatsNumber, setSeatsNumber] = useState(1);
  const [route, setRoute] = useState("")
  const { email, role } = auth;
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);





  useEffect(() => {
    if (role === "ROLE_ROOT" || role === "ROLE_ADMIN") {
      setRoute("/admin");
    } else if (role === "ROLE_USER") {
      setRoute("/user");
    } else {
      null;
    }

  },[])

  useEffect(() => {
    getDataUser(auth);
  }, []);

  const handleSeatsChange = (e) => {
    setSeatsNumber(e.target.value);
  }

  const realizarReserva = async () => {
    const url = `${Global.endpoints.backend.Prod}/api/reserve`;
    const data = {
      movieCalendarId: selectedDateId,
      seats: seatsNumber,
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      
      
        
      });

      if (response.status == 201) {
        setError(false);
        setSuccess(true);
        setTimeout(() => {
          navigate(`${route}/reservaConfirmada`)
        }, 4000);

      } else {
        setSuccess(false);
        setError(true);
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      
  
      const reservationData = await response.json();
      console.log(reservationData);


      

    } catch (error) {
      console.error('There was a problem with the fetch operation: ' + error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    realizarReserva();
  };

  const handleDateIdChange = (id) => {
    setSelectedDateId(id);

  }

  const handleCinemaChange = (cinema) => { 
    setSelectedCinema(cinema);
    console.log(cinema);
  }

  const getDataUser = async (user) => {
    if (!user) {
      throw new Error("Ha ocurrido un error al obtener los datos del usuario.");
    }
    setUserProfile(user);
  };



  useEffect(() => {
    GetMovieById(
      `${Global.endpoints.backend.Prod}/api/movies/${id}`,
      setLoading,
      setItem
    );
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  return (


    <div className="mb-5 mt-5 min-h-screen w-1/3 bg-gray-900 flex flex-col items-center justify-center mx-auto rounded-xl">
      <h1 className="text-2xl font-bold mb-4 mt-5">Detalles de la reserva</h1>
      {item ? (
        <>
          <div>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <div className="flex flex-col items-center justify-center mb-4 px-20">
                <div>
                  <h1 className="text-2xl font-bold">{item.title}</h1>
                  <hr />
                  <h2>{item.overview}</h2>
                </div>
                <img className="object-contain" src={item.image_urls[0]} />
              </div>)}

          </div>
          <hr />
          <div className="text-left w-100 px-20">
            <h1 className="text-2xl font-bold mb-1">Datos del usuario:</h1>
            <h3>Nombre: {userProfile.name}</h3>
            <h3>Apellido: {userProfile.last_name}</h3>
            <h3>Email: {userProfile.email}</h3>
          </div>
          <hr />
        </>
      ) : (null)}


      <form onSubmit={handleSubmit} className="text-left w-full px-20" action="">

        <div className='inputLabel'>
          <label className="block mb-2 text-2xl font-bold mb-1 mt-3" htmlFor="comentarios">Comentarios extra</label>
          <textarea name="comentarios" id="comentarios" cols="20" rows="5"></textarea>
        </div>

        <label htmlFor="number-input" className="block text-2xl font-bold mb-1 mb-2 mt-3 text-sm text-2xl font-bold mb-1">Seleccione número de entradas</label>
        <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3" required value={seatsNumber} onChange={handleSeatsChange} ></input>
        <AvailableDates className="text-2xl font-bold mt-3" onCinemaChange={handleCinemaChange} onDateIdChange={handleDateIdChange} onDateChange={handleDateChange} movieId={id} />
        <h3 className='mt-3'>Cine: {selectedCinema} Cine Search pro</h3>
        <div className='w-100 flex justify-center mt-10 mb-10'>
          <button className='btn py-3 px-5 bg-sky text-dark rounded-pill font-extrabold text-sm' type='submit' >Confirmar reserva</button>
        </div>
        {error ? ( <p className="text-red-500 text-xs italic">Ha ocurrido un error al realizar la reserva</p>) : (null) }
        {success ? ( <p className="text-green-500 text-xs italic">Reserva realizada con éxito</p>) : (null)}
      </form>

    </div>
  )
}

export default NewReserve