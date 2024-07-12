// src/components/Table.jsx
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Table = ({ url, entites, onEdit, onDelete }) => {
  const [base, setBase] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setBase(response.data))
      .catch((error) => console.log(error));
  }, [url]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return formattedDate;
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Players Club</h1>
      
      <table className="table-auto w-full">
        <thead>
          <tr>
            {entites.map((entite) => (
              <th key={entite} className="px-4 py-2">{entite}</th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {base.map((user) => (
            <tr key={user.id}>
              {entites.map((entite) => (
                <td key={entite} className="border px-4 py-2">
                  {(entite === 'created_at' || entite === 'updated_at') ? formatDate(user[entite]) : user[entite]}
                </td>
              ))}
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 mb-3"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  url: PropTypes.string.isRequired,
  entites: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Table;
