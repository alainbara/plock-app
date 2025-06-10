import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./inscriptionScreen.module.css";
import { useNavigate } from "react-router-dom";
export const InscriptionScreen = () => {
    
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    //erreurs d'inscription
    const [isEmpty, setIsEmpty] = useState(false);
    const [isNotIdentical, setIsNotIdentical] = useState(false);
    const [isNotAvailable, setIsNotAvailable] = useState(false);

    //gestion d'états
    const [submitIsLoading, setSubmitIsLoading] = useState(false);

    const onSubmit = async e => {
        setSubmitIsLoading(true);
        e.preventDefault();
        resetErrors();

        if (isNotEmpty()) {
            // L'utilisateur a entré un nom d'utilisateur et des mots de passe
            if (arePwdIdentical()) {
                if (await checkUsernameAvailability(username)) {
                    const result = await window.sqlite.userDB.insertPerson(username, password1);
                    if (result.success) {
                        // Inscription réussie
                        resetFields();
                        navigate("/", { replace: true });
                    } else {
                        // Erreur lors de l'inscription
                        alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
                    }
                    
                } else {
                    // Le nom d'utilisateur n'est pas disponible
                    setIsNotAvailable(true);
                    resetFields();
                }
            } else {
                // Les mots de passe ne sont pas identiques
                setIsNotIdentical(true);
                resetFields();
            }
        } else {
            // L'utilisateur n'a pas entré de nom d'utilisateur et/ou de mot de passe
            setIsEmpty(true);
            resetFields();
        }
    }
    
    
    const checkUsernameAvailability = async (username) => {
        const result = await window.sqlite.userDB.getPersonByName(username).person;
        const userNameList = result?.person || [];

        return userNameList.length === 0;
    }

    const resetFields = () => {
        setUsername("");
        setPassword1("");
        setPassword2("");
        setSubmitIsLoading(false);
    }

    const resetErrors = () => { 
        setIsEmpty(false);
        setIsNotIdentical(false);
        setIsNotAvailable(false);
    }   

    const arePwdIdentical = () => {
        return password1.trim() !== "" && password2.trim() !== "" && password1 === password2;
    }

    const isNotEmpty = () => {
        return username.trim() !== "" && password1.trim() !== "" && password2.trim() !== "";
    }
    return (
        <div className={`${styles.inscriptionContainer}`}>
            <h1 className="title is-1 login-title has-text-centered">Bienvenue chez Plock !</h1>
            <form className="form"  onSubmit={onSubmit} >
                <fieldset>
                    <h2 className="title is-3 has-text-centered">Veuillez-vous inscrire</h2>
                    <div className="field form-field">
                        <label className="label" htmlFor='username'>Nom d'utilisateur</label>
                        <div className="control has-icons-left">
                            <input type='text' className='input is-primary' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field form-field">
                        <label className="label" htmlFor='password1'>Mot de passe</label>
                        <div className="control has-icons-left">
                            <input type='password' className='input is-primary' id='password1' name='password1' value={password1} onChange={e => setPassword1(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                     <div className="field form-field">
                        <label className="label" htmlFor='password1'>Confirmez votre mot de passe</label>
                        <div className="control has-icons-left">
                            <input type='password' className='input is-primary' id='password2' name='password2' value={password2} onChange={e => setPassword2(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                   
                    </div>
                    
                    <div className={`buttons ${styles.form_submit}`}>
                        <button class={`button is-primary ${submitIsLoading===true ? "is-loading" : ""} `} type='submit'>S'inscrire</button>
                        <Link to="/" class="button is-primary is-outlined">Retour</Link>
                    </div>
                </fieldset>

                <div className={`${styles.errorsWrapper}`}>
                    {isNotIdentical && <p className="has-text-danger">Les mots de passe ne sont pas identiques</p>}
                    {isEmpty && <p className="has-text-danger">Veuillez remplir tous les champs</p>}
                    {isNotAvailable && <p className="has-text-danger">Ce nom d'utilisateur n'est pas disponible</p>}
                </div>
            </form>
        </div>
    );

}
