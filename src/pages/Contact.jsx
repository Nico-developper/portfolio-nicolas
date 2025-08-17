import React from "react";
import "../styles/pages/Contact.scss";

export default function Contact() {
    return (
        <section className='contact'>
            <div className='container'>
                <h2>Contactez-moi</h2>
                <p>Un projet, une question ? N'hésitez pas à m'écrire !</p>
                <form className='contact-form'>
                    <div className='form-group'>
                        <label htmlFor='name'>Nom</label>
                        <input type='text' id='name' name='name' required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='message'>Message</label>
                        <textarea
                            id='message'
                            name='message'
                            rows='5'
                            required
                        ></textarea>
                    </div>
                    <button type='submit' className='btn'>
                        Envoyer
                    </button>
                </form>
            </div>
        </section>
    );
}
