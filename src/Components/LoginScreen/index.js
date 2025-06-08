import styles from "./loginScreen.module.css"
export const LoginScreen = () => {
    return (
       
        <div className={`${styles.loginContainer}`}>
            <h1 className={`title is-1 ${styles.loginTitle}`}>Bienvenue chez Plock !</h1>
            <form className={`${styles.form}`}>
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
                     <div className={`field ${styles.form_field}`} class="field">
                        <label class="label" htmlFor='password'>Mot de passe</label>
                        <div class="control has-icons-left">
                            <input type='password' className='input is-primary' id='password' name='password' />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className={styles.form_submit}>
                        <input class="button is-primary" type='submit' value="S'identifier"/>
                    </div>
                </fieldset>
            </form>
        
        </div>
    
    )
}

