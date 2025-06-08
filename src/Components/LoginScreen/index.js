import styles from "./loginScreen.module.css"

export const LoginScreen = () => {
    return (
       
        <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>Bienvenue chez Plock !</h1>
            <form className={styles.form}>
                <fieldset>
                    <legend>Login</legend>
                    <div className={styles.form_field}>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' />
                    </div>
                    <div className={styles.form_submit}>
                        <input type='submit' value='LOGIN' />
                    </div>
                </fieldset>
            </form>
        
        </div>
    
    )
}

