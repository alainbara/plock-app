import  React from 'react';
import { useAuth } from '../../AuthContext';  
import styles from "./header.module.css"         

export const Header = () => {

    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <nav className={`navbar is-flex ${styles.headerWrapper}`} role="navigation" aria-label="main navigation">
            <div className={`navbar-brand`}>
                <div className={`navbar-item ${styles.userContainer}`}>
                    <i className="fas fa-user-circle"></i>
                    <span className="userName">{user.username}</span>
                </div>
            </div>
            <div className={`navbar-start`}>
               
            </div>
            <div className={`navbar-end ${styles.logoutWrapper}`}>
                <div className={`navbar-item`}>
                    <div className={`button is-primary is-outlined`} onClick={handleLogout}>
                        Déconnexion
                    </div>
                </div>  
            </div>
        </nav>
    );
}
