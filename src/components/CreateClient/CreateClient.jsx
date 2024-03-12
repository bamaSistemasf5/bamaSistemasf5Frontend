// import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
import "./CreateClient.css";

const CreateClient = ({ onSave, onCancel }) => {
//   const location = useLocation();

// Manejar el caso en que userData es null

//   const userData = location.state?.userData || {};
//   console.log("userData en EDITPROFILE es:", userData);

  // Establecer valores iniciales basados en userData
  
//   const [editedUserData, setEditedUserData] = useState({
//     name: userData.name || "",
//     lastname: userData.lastname || "",
//     tel: userData.tel || "",
//     email: userData.email || "",
//     password: userData.password || "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUserData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSaveClick = () => {
//     // Validar los datos si es necesario
//     // Llamar a la función onSave con los datos editados
//     onSave && onSave(editedUserData);
//   };


  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-heading">Crear nuevo cliente</h2>
      <div className="form-group">
        <label className="form-label">Nombre cliente</label>
        <input
          type="text"
          name="name"
        //   placeholder={`Nombre original: ${userData.name || ""}`}
        //   value={editedUserData.name}
        //   onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Dirección social</label>
        <input
          type="text"
          name="lastname"
        //   placeholder={`Apellido original: ${userData.lastname || ""}`}
        //   value={editedUserData.lastname}
        //   onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">CIF </label>
        <input
          type="tel"
          name="tel"
        //   placeholder={`Teléfono original: ${userData.tel || ""}`}
        //   value={editedUserData.tel}
        //   onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Correo Electrónico</label>
        <input
          type="email"
          name="email"
        //   placeholder={`Email original: ${userData.email || ""}`}
        //   value={editedUserData.email}
        //   onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Forma de pago: Transferencia/Confirming/ Giro bancario </label>
        <input
          type="password"
          name="password"
        //   placeholder={`Contraseña original: ${userData.password || ""}`}
        //   value={editedUserData.password}
        //   onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Teléfono </label>
        <input
          type="password"
          name="password"
        //   placeholder={`Contraseña original: ${userData.password || ""}`}
        //   value={editedUserData.password}
        //   onChange={handleInputChange}
          className="form-input"
        />
      </div>
      <div className="button-group">
        <button  className="button">
        {/* onClick={handleSaveClick} // No se está utilizando */}
          Guardar Cambios
        </button>
        <button  className="button button-cancel">
        {/* onClick={onCancel} // No se está utilizando */}
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CreateClient;
