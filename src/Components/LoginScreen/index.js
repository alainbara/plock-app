import { useState } from "react";
import styles from "./loginScreen.module.css"
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const LoginScreen = ({userConnection}) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const  { login } = useAuth();

    //erreurs de connexion
    const [isFalse, setIsFalse] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    //gestion d'états
    const [submitIsLoading, setSubmitIsLoading] = useState(false);

    const onSubmit = async e => {
        setSubmitIsLoading(true);
        e.preventDefault();
        resetErrors();

        if (isNotEmpty()) {
            // L'utilisateur a entré un nom d'utilisateur et un mot de passe
            var answer = await userConnection(username, password);
            if (answer.success === true) {
                //Connexion réussie
                
                var connexionData = {
                    username: username,
                    token: answer.token,
                }
                resetFields()
                login(connexionData);
            } else {
                //Connexion échouée
                setIsFalse(true);
                resetFields();
            }
        } else {
            // L'utilisateur n'a pas entré de nom d'utilisateur et/ou de mot de passe
            setIsEmpty(true);
            resetFields();
        }
    }

    const isNotEmpty = () => {
        return username.trim() !== "" && password.trim() !== "";
    }

    const resetFields = () => {
        setUsername("");
        setPassword("");
        setSubmitIsLoading(false);
    }

    const resetErrors = () => {
        setIsEmpty(false);
        setIsFalse(false);
    }
    
    return (
        <div className={`${styles.loginContainer}`}>
            <h1 className={`title is-1 has-text-centered ${styles.loginTitle}`}>Bienvenue chez Plock !</h1>
            <form className={`${styles.form}`} onSubmit={onSubmit}>

                <fieldset>
                    <h2 className={`title is-3 has-text-centered`}>Veuillez-vous connecter</h2>
                    <div className={`field ${styles.form_field}`} class="field">
                        <label class="label" htmlFor='username'>Nom d'utilisateur</label>
                        <div class="control has-icons-left">
                            <input type='text' className='input is-primary' id='username' name='username' value={username ?? ""} onChange={e => setUsername(e.target.value)} />
                            <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                     <div className={`field ${styles.formField}`} class="field">
                        <label class="label" htmlFor='password'>Mot de passe</label>
                        <div class="control has-icons-left">
                            <input type='password' className='input is-primary' id='password' name='password'  value={password ?? ""} onChange={e => setPassword(e.target.value)} />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className={`buttons ${styles.form_submit}`}>
                        <button class={`button is-primary ${submitIsLoading===true ? "is-loading" : ""} `} type='submit'>S'identifier</button>
                        <Link to="/inscription" className="button is-primary is-outlined">C'est la première fois que j'utilise Plock</Link>
                    </div>
                    <div className={`${styles.errorsWrapper}`}>
                        {isFalse && <p className="has-text-danger">Nom d'utilisateur ou mot de passe incorrect</p>}
                        {isEmpty && <p className="has-text-danger">Veuillez remplir tous les champs</p>}
                    </div>
                </fieldset>
            </form>
        </div>
    
    )
}

