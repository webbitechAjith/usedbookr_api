import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Invoice() {

  const handlePrintClick = () => {
    window.print();
  };

  return (
    <div>
      <Header />
      <section className='my-5'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-warning text-white">
                  <h5 className="card-title text-dark"><b>Invoice</b></h5>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Product 1</td>
                        <td>2</td>
                        <td>$10.00</td>
                        <td>$20.00</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Product 2</td>
                        <td>1</td>
                        <td>$15.00</td>
                        <td>$15.00</td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-end">Subtotal</td>
                        <td>$35.00</td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-end">Tax (10%)</td>
                        <td>$3.50</td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-end">Total</td>
                        <td>$38.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer">
                  <button className="btn btn-warning" onClick={handlePrintClick}><b>Print</b></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div >
  )
}

export default Invoice