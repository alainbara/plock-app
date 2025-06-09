import { useState } from "react";
import styles from "./loginScreen.module.css"
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const LoginScreen = () => {
   
    
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    console.log("check : ", useAuth().isConnected)

    useEffect(() => {
        
        console.log("LoginScreen mounted");

    }, []);

    const onSubmit = e => {
        e.preventDefault();

        const name = e.target.username?.value
		const pwd = e.target.password?.value

        setUsername(name);
        setPassword(pwd);

        console.log("Username:", username);
        console.log("Password:", password);

        if (checkForErrors()) {
            // les réponses utilisateurs sont valides
            // TODO: implémenter la logique de connexion
        } else {
            setUsername("");
            setPassword("");
        }
    }

    const checkForErrors = () => {
        return true; // TODO: implémenter la vérification des erreurs
    }
    
    return (
        <div className={`${styles.loginContainer}`}>
            <h1 className={`title is-1 ${styles.loginTitle}`}>Bienvenue chez Plock !</h1>
            <form className={`${styles.form}`} onSubmit={onSubmit}>
                <fieldset>
                    <h2 className={`title is-3`}>Veuillez-vous connecter</h2>
                    <div className={`field ${styles.form_field}`} class="field">
                        <label class="label" htmlFor='username'>Nom d'utilisateur</label>
                        <div class="control has-icons-left">
                            <input type='text' className='input is-primary' id='username' name='username' />
                            <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                     <div className={`field ${styles.formField}`} class="field">
                        <label class="label" htmlFor='password'>Mot de passe</label>
                        <div class="control has-icons-left">
                            <input type='password' className='input is-primary' id='password' name='password' />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <Link to="/inscription" className="button is-link">C'est la première fois que j'utilise Plock</Link>
                    <div className={styles.formSubmit}>
                        <input class="button is-primary" type='submit' value="S'identifier"/>
                    </div>
                </fieldset>
            </form>
        

        <h2 className={`title is-3`}>{username}</h2>
        </div>
    
    )
}

