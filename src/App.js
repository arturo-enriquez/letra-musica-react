import React, {useState, useEffect, Fragment} from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';

import axios from 'axios';

function App() {

  // Utilizar useState con 3 states diferentes
  const [artista,agregarArtista] = useState('');
  const [letra, agregarLetra] = useState([]);
  const [info, agregarInfo] = useState({});

  // Metodo para consultar la API de letras de canciones
  const consultarAPILetra = async busqueda => {
    const {artista, cancion} = busqueda;
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    // consultar la API
    const res = await axios(url);

    // almacenar el artista que se busco
    agregarArtista(artista);

    // almacenar la letra en el state
    agregarLetra(res.data.lyrics);
  }

  // Metodo para consultar la API de informacion
  const consultarAPIInfo = async () => {
    if (artista) {
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const res = await axios(url);
      agregarInfo( (res.data !== '') ? res.data.artists[0] : null);
    }
  }

  useEffect(
    () => {
      consultarAPIInfo();
    }, [artista]
  )

  return (
    <Fragment>
      <Formulario
        consultarAPILetra={consultarAPILetra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;