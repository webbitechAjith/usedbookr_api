import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { faq_list } from './apiBaseurl';

function Faq() {
    const [faqItems,setFaqItems] = useState([]);

    const faqmap = async()=>{
        const allfaq = await faq_list();
        setFaqItems(allfaq)
    }
    
    useEffect(()=>{
        faqmap();
        window.scrollTo(0, 0);
    },[])

    return (
        <div>
            <Header />
            <section className='w-75 mx-auto py-5'>
                <div className="accordion" id="faqAccordion">
                    {faqItems && faqItems.map((faq, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${index}`}
                                >
                                    {faq.name}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#faqAccordion"
                            >
                                <div className="accordion-body">
                                    {faq.details}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Faq