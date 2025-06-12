import styles from './passwordScreen.module.css';
import React, { useEffect, useState } from 'react';    
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { PasswordList } from '../PasswordList/';


export const PasswordScreen = ({getPasswordsByUserId, getPersonByName}) => {
    const [passwordList, setPasswordList] = useState([]);
    
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    //Données du formulaire d'ajout de mot de passe
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [website, setWebsite] = useState("");
    const [icon, setIcon] = useState(null); // Pour stocker l'icône du site
    const [iconName, setIconName] = useState("");

    //Erreurs de validation
    const [isEmpty, setIsEmpty] = useState(false);      
    const [isWrongImage, setIsWrongImage] = useState(false); // Pour gérer les erreurs d'image


    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                const answer = await getPasswordsByUserId(user.id);
                setPasswordList(answer.passwords);
                console.log('Fetched passwords:', answer.passwords);
            } catch (error) {
                console.error('Error fetching passwords:', error);
            }
        };

        fetchPasswords();
    }, [user.id, getPasswordsByUserId]);    


    const fetchPasswords = async () => {
            try {
                const answer = await getPasswordsByUserId(user.id);
                setPasswordList(answer.passwords);
                console.log('Fetched passwords:', answer.passwords);
            } catch (error) {
                console.error('Error fetching passwords:', error);
            }
    };

    const openModal = () => {
        setIsAddModalOpen(true);    
    };

    const closeModal = () => {
        resetFields();
        setIsAddModalOpen(false);
    }

    const resetFields = () => {
        setPassword("");
        setUsername("");
        setWebsite("");
        setIcon(null);
        setIconName("");
    };
    
    const manageFileInput = (e) => {
        resetErrors()
        const file = e.target.files[0];
        if (file && checkImage(file)) {
            setIcon(file || null);
            setIconName(file ? file.name : ""); 
        } else {
            setIsWrongImage(true);
        }
    };

    const submitNewPassord = async () => {
        console.log("submitNewPassord called");
        resetErrors();
        // Vérification des champs requis

        // Appel à la fonction pour ajouter le mot de passe
        if (checkErrors()) {
            try {
                await window.sqlite.passwordDB.insertPassword(user.id, website, username, password, icon ? await icon.arrayBuffer() : null);
                resetFields();
                closeModal();
                fetchPasswords()
                
            } catch (error) {
                console.error("Erreur lors de l'ajout du mot de passe :", error);
                alert("Une erreur est survenue lors de l'ajout du mot de passe.");
            }
        } else {
            setIsEmpty(true);   
            resetFields();
        }
    }

    const checkErrors = () => {
        // Vérifie si les champs requis sont remplis
        return website.trim() !== "" && username.trim() !== "" && password.trim() !== "";
    }

    const checkImage = (file) => {
        // Vérifie si l'icône est une image valide  
        if (file) {
            console.log(file)
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            return validImageTypes.includes(file.type);
        } 

        return true; // Si pas d'icône, on considère que c'est valide
    }
    
    
    const resetErrors = () => {
        setIsEmpty(false);
    }

    return (
        <div>
            <PasswordList passwordList={passwordList} />
             <button class="button is-primary" onClick={openModal}>Ajouter un mot de passe</button>

            <div className={`modal${isAddModalOpen ? " is-active" : ""}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class={`modal-card-head ${styles.modalHeader}`}>
                        <p class="modal-card-title">Ajout d'un mot de passe</p>
                        <button class="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <section class="modal-card-body">
                        <form>
                            <div className="field">
                                <label className="label">Site</label>
                                <div className="control">
                                    <input className="input is-primary" type="text" placeholder="Nom du site" value={website} onChange={e => setWebsite(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Nom d'utilisateur</label>
                                <div className="control">
                                    <input className="input is-primary" type="text" placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Mot de passe</label>
                                <div className="control">
                                    <input className="input is-primary" type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Icône du site</label>
                                <div class="file has-name is-fullwidth is-primary">
                                    <label class="file-label">
                                        <input class="file-input" type="file" name="resume" onChange={e => manageFileInput(e)} />
                                        <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label">Choisissez un fichier</span>
                                        </span>
                                        <span class="file-name"> {iconName.trim()!=="" ? iconName : "Ceci est optionnel."} </span>
                                    </label>
                                </div>
                            </div>
                             <div className={`${styles.errorsWrapper}`}>
                                {isEmpty && <p className="has-text-danger">Les champs Site, Nom d'utilisateur et Mot de passe doivent être remplis.</p>}
                                {isWrongImage && <p className="has-text-danger">Seulement les formats PNG, JPG et GIF sont autorisés.</p>}
                            </div>
                        </form>
                    </section>
                    <footer class="modal-card-foot">
                        <div class="buttons">
                            <button class="button is-primary" onClick={submitNewPassord}>Enregistrer</button>
                            <button class="button" onClick={closeModal}>Annuler</button>
                        </div>
                    </footer>
                </div>  
            </div>
        </div>
    )

    
}