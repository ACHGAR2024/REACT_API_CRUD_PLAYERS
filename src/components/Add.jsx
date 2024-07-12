// src/components/Add.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const Add = ({ url, entites, onUpdate }) => {
  const initialFormData = {};
  entites.forEach(entite => {
    initialFormData[entite] = ''; // Initialiser les champs avec des chaînes vides
  });

  const [formData, setFormData] = useState(initialFormData);
  const [addSuccess, setAddSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url, formData)
      .then((response) => {
        onUpdate(response.data); // Appeler la fonction onUpdate avec les données ajoutées
        setAddSuccess(true); // Définir le succès de l'ajout à true
        setFormData(initialFormData); // Réinitialiser le formulaire après l'ajout
        setTimeout(() => setAddSuccess(false), 3000); // Réinitialiser le message après 3 secondes
      })
      .catch((error) => console.error('Error adding:', error));
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
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Ajouter
      </button>
      {addSuccess && (
        <p className="text-green-500 mt-2">Ajout réussi !</p>
      )}
    </form>
  );
};

Add.propTypes = {
  url: PropTypes.string.isRequired,
  entites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Add;
