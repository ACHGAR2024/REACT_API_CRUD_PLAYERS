// src/components/HomeContent.jsx

import { useState } from 'react';
import Table from '../components/Table';
import Update from '../components/Update';
import Add from '../components/Add';
import axios from 'axios';

const Clubs = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');
  const [addSuccessMessage, setAddSuccessMessage] = useState('');
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  

  const handleEdit = (user) => {
    setSelectedData(user);
  };

  const handleUpdateSuccess = (updatedData) => {
    setSelectedData(null); // Cacher le formulaire de mise à jour
    setReloadTable(!reloadTable); // Forcer le rafraîchissement de la table
    setUpdateSuccessMessage('Modification réussie !');
    setTimeout(() => setUpdateSuccessMessage(''), 3000); // Réinitialiser le message après 3 secondes
  };

  const handleAddSuccess = (addedData) => {
    setReloadTable(!reloadTable); // Forcer le rafraîchissement de la table
    setAddSuccessMessage('Club ajouté avec succès !');
    setTimeout(() => setAddSuccessMessage(''), 3000); // Réinitialiser le message après 3 secondes
  };

  const handleDeleteSuccess = () => {
    setDeleteSuccessMessage('Suppression réussie !');
    setTimeout(() => setDeleteSuccessMessage(''), 3000); // Réinitialiser le message après 3 secondes
    setReloadTable(!reloadTable); // Forcer le rafraîchissement de la table après suppression
  };

  return (
    <div className="container mx-auto p-4">
      {updateSuccessMessage && (
        <div className="bg-green-500 border-l-4 border-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">{updateSuccessMessage}</p>
        </div>
      )}
      {addSuccessMessage && (
        <div className="bg-green-500 border-l-4 border-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">{addSuccessMessage}</p>
        </div>
      )}
      {deleteSuccessMessage && (
        <div className="bg-green-500 border-l-4 border-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">{deleteSuccessMessage}</p>
        </div>
      )}
      <Table
        url="http://127.0.0.1:8000/api/clubs"
        entites={['id', 'nameClub', 'created_at', 'updated_at']}
        onEdit={handleEdit}
        onDelete={(id) => {
          axios.delete(`http://127.0.0.1:8000/api/clubs/${id}`)
            .then(() => {
              handleDeleteSuccess(); // Gérer le succès de la suppression
            })
            .catch((error) => console.error('Error deleting:', error));
        }}
        key={reloadTable} // Utilisé pour forcer le rafraîchissement de la table
      />
      {selectedData && (
        <div className="mt-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between">
              <h2 className="font-bold">Modifier le club</h2>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setSelectedData(null)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Update
              url="http://127.0.0.1:8000/api/clubs"
              entites={['nameClub']} // Entités modifiables seulement
              data={selectedData}
              onUpdate={handleUpdateSuccess}
            />
          </div>
        </div>
      )}
      <div className="mt-4 flex container mx-auto shadow-lg bg-gray-300 rounded-lg p-5 w-1/2">
      <h2 className="font-bold">Ajouter un club</h2>
      <Add
        name_base={"players"}
        url="http://127.0.0.1:8000/api/clubs"
        entites={['nameClub']}
        onUpdate={handleAddSuccess}
      />
      </div>
    </div>
  );
};

export default Clubs;

