import { useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Update_file from '../components/Update_file';
import Add_file from '../components/Add_file';


const Players = () => {
const [selectedData, setSelectedData] = useState(null);
  const [reloadTable, setReloadTable] = useState(false);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false); // Ajout du state pour afficher le formulaire d'ajout

const handleEdit = (user) => {
    setSelectedData(user);

  };

  const handleUpdateSuccess = (updatedData) => {
    setSelectedData(null); // Cacher le formulaire de mise à jour
    setReloadTable(!reloadTable); // Forcer le rafraîchissement de la table
    setUpdateSuccessMessage('Modification réussie !');
    setTimeout(() => setUpdateSuccessMessage(''), 3000); // Réinitialiser le message après 3 secondes
  };
  {updateSuccessMessage && (
    <div className="bg-green-500 border-l-4 border-green-700 p-4 mb-4" role="alert">
      <p className="font-bold">{updateSuccessMessage}</p>
    </div>
  )}

  const handleDeleteSuccess = () => {
    setSuccessMessage('Suppression réussie !');
    setTimeout(() => setSuccessMessage(''), 3000);
    setReloadTable(prev => !prev);
  };

  return (
    <div className="container mx-auto p-4">
      {successMessage && (
        <div className="bg-green-500 border-l-4 border-green-700 p-4 mb-4" role="alert">
          <p className="font-bold">{successMessage}</p>
        </div>
      )}
 <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddForm(prev => !prev)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showAddForm ? 'Fermer' : 'Ajouter un joueur'}
        </button>
      </div>
      {showAddForm && (
        <Add_file
          url="http://127.0.0.1:8000/api/players"
          entites={['firstName', 'lastName', 'height', 'position', 'club_id', 'photoPlayer']}
          onUpdate={() => setReloadTable(prev => !prev)}
        />
      )}
      <Table
        url="http://127.0.0.1:8000/api/players"
        entites={['id', 'firstName', 'lastName', 'height', 'position', 'created_at', 'updated_at', 'club_id', 'photoPlayer']}
        onEdit={handleEdit}
        onDelete={(id) => {
          axios.delete(`http://127.0.0.1:8000/api/players/${id}`)
            .then(() => {
              handleDeleteSuccess();
            })
            .catch((error) => console.error('Error deleting:', error));
        }}
        key={reloadTable}
      />

      
{selectedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-xl" role="alert">
            <button
              className="absolute top-0 right-0 m-4 p-2 hover:bg-gray-200 rounded-full"
              onClick={() => setSelectedData(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-medium mb-4">Modifier le joueur</h2>

            <Update_file
              url="http://127.0.0.1:8000/api/players"
              entites={['firstName', 'lastName', 'height', 'position', 'club_id', 'photoPlayer']} // Entités modifiables seulement
              data={selectedData}
              onUpdate={handleUpdateSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;
