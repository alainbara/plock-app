import styles from './passwordScreen.module.css';
import React, { useEffect, useState } from 'react';    
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';


export const PasswordScreen = (getPasswordsByUserId, getPersonByName) => {
    const [passwordList, setPasswordList] = useState([]);
    const [userId, setUserId] = useState(null);
    
    
    const { user } = useAuth();
    const navigate = useNavigate();

    
}