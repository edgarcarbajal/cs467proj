import React, {useRef} from "react";
import './Contact.css'
import FacebookIcon from "./FacebookIcon.png"
import TwitterIcon from "./TwitterIcon.png";
import YoutubeIcon from "./YoutubeIcon.png";
import InstagramIcon from "./InstagramIcon.webp";
import emailjs from '@emailjs/browser';


export const Contact = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
                publicKey: 'YOUR_PUBLIC_KEY',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };
    return (
        <section id="contactPage">
        <div id="contact">
            <h1 className="contactPageTitle">Contact</h1>
            <span className="contactDesc">Please fill out the form below to request a quote</span>
            <form className='contactForm' ref={form} onSubmit={sendEmail}>
                <input type="text" className="name" placeholder='Your Name'/>
                <input type="email" className="email" placeholder='Your Email'/>
                <textarea className="msg" name="message" rows="5" placeholder='Your Message'></textarea>
                <button type='submit' value='send' className="submitBtn">Submit</button>
                <div className="links">
                    <img src={FacebookIcon} alt="Facebook" className="link"/>
                    <img src={TwitterIcon} alt="Twitter" className="link"/>
                    <img src={YoutubeIcon} alt="Youtube" className="link"/>
                    <img src={InstagramIcon} alt="Instagram" className="link"/>
                </div>
            </form>
        </div>
        </section>
    )
}

export default Contact