import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth';
import { Redirect } from 'react-router';

export default function Home() {

    const [logged, setLogged] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authUser();
    }, []);

    const authUser = async () => {
        try {
            await isAuthenticated();

            setLogged(true);
            setLoading(false);
        } catch (err) {
            console.log(err)
            setLogged(false);
            setLoading(false);
        }
    };
    return (
        <div>
            {logged ? "logged" : <Redirect to="/login" />}
            Home
        </div>
    )
}
