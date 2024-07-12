// src/components/Update.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const Update = ({ url, entites, data, onUpdate }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-4">
      {entites.map((entite, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={entite}>
            {entite}
          </label>
          <input
            type="text"
            id={entite}
            name={entite}
            value={formData[entite]}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Mettre à jour
      </button>
    </form>
  );
};

Update.propTypes = {
  url: PropTypes.string.isRequired,
  entites: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Update;
