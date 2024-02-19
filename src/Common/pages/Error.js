import React from 'react'
import Header from './Header'
import Footer from './Footer'

import notfound from '../assets/image/404-found.png'

function Error() {
    return (
        <div>
            <Header />
            <div className='text-center'>
                <img src={notfound} />
            </div>
            <Footer />
        </div>
    )
}

export default Error