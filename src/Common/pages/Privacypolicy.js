import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'


// css path 
import '../assets/css/footer.css'
import { privacy_policy, terms_condition } from './apiBaseurl';


function Privacypolicy() {

    const [privactPolicy, setPrivactPolicy] = useState([]);

    const faqmap = async () => {
        const allterms = await privacy_policy();
        setPrivactPolicy(allterms)
    }

    useEffect(() => {
        faqmap();
        window.scrollTo(0, 0);
    }, [])


    return (
        <div>
            <Header />
            <section>
                {privactPolicy && privactPolicy.map((privacy, index) => (
                    <main class="wrap">
                        <section class="container">
                            <div class="container__heading">
                                <h2>{privacy.name}</h2>
                            </div>
                            <div class="container__content">
                                <p>{privacy.details}</p>
                            </div>
                            {/* <div class="container__nav">
                            <small>By clicking 'Accept' you are agreeing to our terms and conditions.</small>
                            <a class="button" href="#">Accept</a>
                        </div> */}
                        </section>
                    </main>
                ))}
            </section>
            <Footer />
        </div>
    )
}

export default Privacypolicy