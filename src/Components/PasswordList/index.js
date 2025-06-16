import React, { useState } from 'react';
import styles from './passwordList.module.css';

export const PasswordList = ({ passwordList, edit, deletePassword }) => {
  
    

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
            <table className={`table ${styles.passwordTable}`}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Site</th>
                        <th>Nom d'utilisateur</th>
                        <th>Mot de passe</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {passwordList.map((password, index) => (
                        <tr key={index}>
                            <td className={`${styles.tableCell}`}>
                                <img
                                    src={blobToUrl(password.icon)}
                                    alt="icon"
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </td>
                            <td className={`${styles.tableCell}`}>{password.website}</td>
                            <td className={`${styles.tableCell}`}>{password.username}</td>
                            <td className={`${styles.tableCell}`}>
                                {password.password}
                            </td>
                            <td className={`${styles.tableCell}`}></td>
                            <td className={`${styles.actionButtons} has-text-right`}>
                                <div className={`${styles.editIconWrapper}`}> 
                                    <span className={`icon is-small ${styles.editIcon} ${styles.actionButton}`} onClick={e => edit(password.id)}>   
                                        <i class="fas fa-pen"></i>
                                    </span>
                                </div>
                                 <div class={`${styles.deleteIconWrapper}`}>
                                    <span  className={`icon is-small ${styles.deleteIcon} ${styles.actionButton}`} onClick={e => deletePassword(password.id)}>   
                                        <i class="fas fa-times"></i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
            
        </div>
    )
}