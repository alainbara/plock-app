import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./inscriptionScreen.module.css";
export const InscriptionScreen = () => {
    
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");


    const onSubmit = e => {
        e.preventDefault();

        // récuperer les données + s'inscrire
    }

    return (
        <div className={`${styles.inscriptionContainer}`}>
            <h1 className="title is-1 login-title has-text-centered">Bienvenue chez Plock !</h1>
            <form className="form" >
                <fieldset>
                    <h2 className="title is-3 has-text-centered">Veuillez-vous inscrire</h2>
                    <div className="field form-field">
                        <label className="label" htmlFor='username'>Nom d'utilisateur</label>
                        <div className="control has-icons-left">
                            <input type='text' className='input is-primary' id='username' name='username' />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field form-field">
                        <label className="label" htmlFor='password1'>Mot de passe</label>
                        <div className="control has-icons-left">
                            <input type='password' className='input is-primary' id='password1' name='password1' />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                     <div className="field form-field">
                        <label className="label" htmlFor='password1'>Confirmez votre mot de passe</label>
                        <div className="control has-icons-left">
                            <input type='password' className='input is-primary' id='password2' name='password2' />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    
                    <div className={`buttons ${styles.form_submit}`}>
                        <input class="button is-primary" type='submit' value="S'identifier"/>
                        <Link to="/" class="button is-primary is-outlined">Retour</Link>
                    </div>
                </fieldset>
            </form>
        </div>
    );

}
