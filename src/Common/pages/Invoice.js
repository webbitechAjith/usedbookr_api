import React, { useEffect } from 'react'
import html2pdf from 'html2pdf.js';

import Header from './Header'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsInvoiceDetails, setSingleBookHistory, setallBookDetails } from '../../Redux/CreateSlice';
import { allbooks, bookHistory } from './apiBaseurl';

function Invoice() {
  const { allbookDetails, isInvoiceDetails } = useSelector((state) => state.usedbookr_product)
  const params = useParams();
  const dispatch = useDispatch();

  const handlePrintClick = () => {
    // window.print();
    const element = document.getElementById('element-to-print');

    // Set options for html2pdf
    const opt = {
      margin: 0.5,
      filename: 'InvoiceDocument.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate the PDF
    html2pdf().from(element).set(opt).save();
  };

  const viewHistory = async (book) => {
    try {
      const all_books = await allbooks();
      dispatch(setallBookDetails(all_books))
      const books = await bookHistory(book); // Assuming bookHistory is an asynchronous function
      dispatch(setIsInvoiceDetails(books));
    } catch (error) {
      console.error('Error fetching book history:', error);
      // Handle error if necessary
    }
  };

  useEffect(() => {
    viewHistory(params.id)
  }, []);
  console.log(isInvoiceDetails)
  return (
    <div>
      <Header />
      <section className='my-5'>
        <div className="container">
          {isInvoiceDetails?.length > 0 ?
            <>
              <div className="row justify-content-center" id='element-to-print'>
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header bg-warning text-white">
                      <h5 className="card-title text-dark"><b>Invoice</b></h5>
                    </div>
                    <div className=' mx-4 my-3'>
                      <h6>Name : {isInvoiceDetails[0].name}</h6>
                      <h6>PhoneNumber : {isInvoiceDetails[0].mobile}</h6>
                      <h6>Address : {isInvoiceDetails[0].billing_address}</h6>
                    </div>
                    <hr />
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
                          {isInvoiceDetails && allbookDetails && isInvoiceDetails
                            .filter(data => data.items.some(item => allbookDetails.some(cate => cate.id === item.book_id)))
                            .map((data, index) => (
                              <>
                                {data.items.map((item, itemIndex) => {
                                  const matchingBook = allbookDetails.find(cate => cate.id === item.book_id);
                                  return (
                                    <>
                                      <tr>
                                        <td >
                                          <h6>{itemIndex + 1}</h6>
                                        </td>
                                        <td>
                                          <h6>{matchingBook.title_long.slice(0, 10)}</h6>
                                        </td>
                                        <td >
                                          <h6>{item.qty}</h6> {/* Use item.qty instead of data.qty */}
                                        </td>
                                        <td>
                                          <h6>{item.sub_total}</h6>
                                        </td>
                                        <td >
                                          <h6>{item.final_amount}</h6> {/* Use item.final_amount instead of data.final_amount */}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            ))}
                          <tr>
                            <td colSpan="3" className="text-end">Gst</td>
                            <td colSpan="4" className="text-center">{isInvoiceDetails[0].gst_charge}</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end">Shipping</td>
                            <td colSpan="4" className="text-center">60</td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end">finalAmount</td>
                            <td colSpan="4" className="text-center">{isInvoiceDetails[0].final_amount}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                  </div>
                </div>
              </div>
              <div className="text-end my-3" style={{ width: '83%' }}>
                <button className="btn btn-warning" onClick={handlePrintClick}><b>Download</b></button>
              </div>
            </>
            :
            <>
            </>
          }

        </div>
      </section>
      <Footer />
    </div >
  )
}

export default Invoice