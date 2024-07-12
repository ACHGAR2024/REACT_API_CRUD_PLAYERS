// src/components/Update.jsx
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Update_file = ({ url, entites, data, onUpdate }) => {
  const [formData, setFormData] = useState(data);
  const [clubs, setClubs] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'file' ? files[0] : value 
    });
  };
  

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


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    updatedData.updated_at = new Date().toISOString(); // Mettre à jour la date de modification
    axios.put(`${url}/${data.id}`, updatedData)
      .then((response) => {
        onUpdate(response.data); // Appeler la fonction onUpdate avec les données mises à jour
      })
      .catch((error) => console.error('Error updating:', error));
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-4" >
      {entites.map((entite, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={entite}>
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Mettre à jour
      </button>
    </form>
    </>
  );
};

Update_file.propTypes = {
  url: PropTypes.string.isRequired,
  entites: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Update_file;
