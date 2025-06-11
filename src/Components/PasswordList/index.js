import React, { useState } from 'react';
import styles from './passwordList.module.css';

export const PasswordList = ({ passwordList }) => {
  
    

    const blobToUrl = (blobData) => {
        if (blobData === null) return "/Assets/logo_placeholder.png";
        // Si blobData est déjà un Blob
        if (blobData instanceof Blob) {
            return URL.createObjectURL(blobData);
        }
        // Si blobData est un ArrayBuffer ou Uint8Array
        const blob = new Blob([blobData], { type: "image/png" });
        return URL.createObjectURL(blob);
    };

   

    return (
        <div className="password-list">
            <table className={`table`}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Site</th>
                        <th>Nom d'utilisateur</th>
                        <th>Mot de passe</th>
                    </tr>
                </thead>
                <tbody>
                    {passwordList.map((password, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    src={blobToUrl(password.icon)}
                                    alt="icon"
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </td>
                            <td>{password.website}</td>
                            <td>{password.username}</td>
                            <td>
                                {password.password}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
            
        </div>
    )
}