import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Add_file = ({ url, entites, onUpdate }) => {
  const [clubs, setClubs] = useState([]);
  const initialFormData = {};
  entites.forEach(entite => {
    initialFormData[entite] = ''; 
  });
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/clubs');
        const clubsById = response.data.reduce((acc, club) => {
          acc[club.id] = club.nameClub;
          return acc;
        }, {});
        setClubs(clubsById);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
    fetchClubs();
  }, []);
  const [formData, setFormData] = useState(initialFormData);
  const [addSuccess, setAddSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'file' ? files[0] : value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    axios.post(url, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        onUpdate(response.data);
        setAddSuccess(true);
        setFormData(initialFormData);
        setTimeout(() => setAddSuccess(false), 3000);
      })
      .catch((error) => console.error('Error adding:', error));
  };

  return (
    <div className="max-w-2xl mx-auto sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto -mt-20 p-5 bg-gray-300 shadow-xl rounded-lg text-gray-900">
    <h1 className="text-2xl font-bold mb-4">Ajouter un nouveau joueur</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      {entites.map((entite, index) => (
        <div key={index} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700" htmlFor={entite}>
            {entite}
          </label>
          {entite === 'club_id' ? (
            <select
              name={entite}
              id={entite}
              value={formData[entite] || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Choisir un club</option>
              {Object.entries(clubs).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          ) : (
          <input
            type={entite === 'photoPlayer' ? 'file' : 'text'}
            id={entite}
            name={entite}
            value={entite !== 'photoPlayer' ? formData[entite] : undefined}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Ajouter
      </button>
      {addSuccess && (
        <p className="text-green-600 mt-2">Ajout réussi !</p>
      )}
    </form>
    </div>
  );
};

Add_file.propTypes = {
  url: PropTypes.string.isRequired,
  entites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Add_file;
