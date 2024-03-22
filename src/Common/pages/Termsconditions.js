import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'


// css path 
import '../assets/css/footer.css'
import { terms_condition } from './apiBaseurl';


function Termsconditions() {

    const [termsCondition, setTermsCondition] = useState([]);

    const faqmap = async () => {
        const allterms = await terms_condition();
        setTermsCondition(allterms)
    }

    useEffect(() => {
        faqmap();
        window.scrollTo(0, 0);
    }, [])


    return (
        <div>
            <Header />
            <section>
                {termsCondition && termsCondition.map((terms, index) => (
                    <main class="wrap">
                        <section class="container">
                            <div class="container__heading">
                                <h2>Terms & Conditions</h2>
                            </div>
                            <div class="container__content">
                                <p>{terms.details}</p>
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

export default Termsconditions