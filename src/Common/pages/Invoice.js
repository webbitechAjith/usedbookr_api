import React, { useEffect } from 'react'
import html2pdf from 'html2pdf.js';

import Header from './Header'
import Footer from './Footer'
import '../assets/css/invoice.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsInvoiceDetails, setSingleBookHistory, setallBookDetails } from '../../Redux/CreateSlice';
import { allbooks, bookHistory } from './apiBaseurl';


// image path 
import logo from '../assets/image/usedbookr-logo.svg'

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
        <div className="container" >
          {isInvoiceDetails?.length > 0 ?
            <>
              <div id='element-to-print' className='overflow-hidden'>
                <table className="table-no-border">
                  <tr className='d-lg-block d-md-block d-sm-none d-none'>
                    <td className="width-10 text-center">
                      <img src={logo} alt="" width="200" />
                    </td>

                  </tr>
                  <tr className='d-lg-none d-md-none d-sm-block d-block text-center'>
                    <td className="text-center">
                      <img src={logo} alt="" width="150" />
                    </td>
                  </tr>

                </table>
                <div className="margin-top">
                  <table className="table-no-border">
                    <tr className='d-lg-block d-md-block d-sm-none d-none'>
                      <td className="width-50">
                        <div><strong style={{ fontSize: '20px' }}>Invoice Details</strong></div>
                        <div><strong>Invoice Number: </strong> {isInvoiceDetails[0].invoice_no}</div>
                        <div><strong>Date of Issue: </strong> {isInvoiceDetails[0].order_date}</div>
                        <div><strong>Customer Name:</strong> {isInvoiceDetails[0].name} </div>
                        <div><strong>Customer Phone:</strong> {isInvoiceDetails[0].mobile}</div>
                        <div><strong>Customer Mail:</strong> {isInvoiceDetails[0].email}</div>
                      </td>
                      <td className="width-10">
                        <div><strong style={{ fontSize: '20px' }}>Shipping Address</strong></div>
                        <div>{isInvoiceDetails[0].billing_address}</div>
                        <div>{isInvoiceDetails[0].city},{isInvoiceDetails[0].state}</div>
                        <div><strong>Pincode :</strong> {isInvoiceDetails[0].pincode}</div>
                      </td>
                    </tr>
                    <tr className='d-lg-none d-md-none d-sm-block d-block my-2'>
                      <div><strong style={{ fontSize: '20px' }}>Invoice Details</strong></div>
                      <div><strong>Invoice Number: </strong> {isInvoiceDetails[0].invoice_no}</div>
                      <div><strong>Date of Issue: </strong> {isInvoiceDetails[0].order_date}</div>
                      <div><strong>Customer Name:</strong> {isInvoiceDetails[0].name} </div>
                      <div><strong>Customer Phone:</strong> {isInvoiceDetails[0].mobile}</div>
                      <div><strong>Customer Mail:</strong> {isInvoiceDetails[0].email}</div>
                    </tr>
                    <tr className='d-lg-none d-md-none d-sm-block d-block'>
                      <div><strong style={{ fontSize: '20px' }}>Shipping Address</strong></div>
                      <div>{isInvoiceDetails[0].billing_address}</div>
                      <div>{isInvoiceDetails[0].city},{isInvoiceDetails[0].state}</div>
                      <div><strong>Pincode :</strong> {isInvoiceDetails[0].pincode}</div>
                    </tr>
                  </table>
                </div>
                <div className='over-auto'>
                  <table className="product-table">
                    <thead>
                      <tr>
                        <th className="width-10" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          <strong className='text-white'>S.NO</strong>
                        </th>
                        <th className="width-30" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          <strong className='text-white'>Item</strong>
                        </th>
                        <th className="width-10" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          <strong className='text-white'>Qty</strong>
                        </th>
                        <th className="width-20" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          <strong className='text-white'>Price </strong>
                        </th>
                        <th className="width-20" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          <strong className='text-white'>Total</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {/* <tr>
                        <td className="width-10" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                        </td>
                      </tr> */}
                      {isInvoiceDetails && allbookDetails && isInvoiceDetails
                        .filter(data => data.items.some(item => allbookDetails.some(cate => cate.id === item.book_id)))
                        .map((data, index) => (
                          <>
                            {data.items.map((item, itemIndex) => {
                              const matchingBook = allbookDetails.find(cate => cate.id === item.book_id);
                              return (
                                <>
                                  <tr>
                                    <td className="width-10" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                                      <h6>{itemIndex + 1}</h6>
                                    </td>
                                    <td className="width-10" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                                      <h6>{matchingBook.title_long.slice(0, 10)}</h6>
                                    </td>
                                    <td className="width-10" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                                      <h6>{item.qty}</h6> {/* Use item.qty instead of data.qty */}
                                    </td>
                                    <td className="width-10" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                                      <h6>{item.sub_total}</h6>
                                    </td>
                                    <td className="width-10" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                                      <h6>{item.final_amount}</h6> {/* Use item.final_amount instead of data.final_amount */}
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </>
                        ))}

                    </tbody>
                    <tbody>
                      <tr>
                        <td className="width-70" colspan="4" style={{ border: '1px solid #222', borderBottom: '1px solid #222' }}>
                          Total
                        </td>
                        <td className="width-20" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          {isInvoiceDetails[0].gross_amount}
                        </td>
                      </tr>
                      <tr>
                        <td className="width-70" colspan="4" style={{ border: '1px solid #222', borderBottom: '1px solid #222' }}>
                          GST
                        </td>
                        <td className="width-20" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          {isInvoiceDetails[0].gst_charge}
                        </td>
                      </tr>
                      <tr>
                        <td className="width-70" colspan="4" style={{ border: '1px solid #222', borderBottom: '1px solid #222' }}>
                          Shipping
                        </td>
                        <td className="width-20" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          60
                        </td>
                      </tr>
                      <tr>
                        <td className="width-70" colspan="4" style={{ border: '1px solid #222', borderBottom: '1px solid #222' }}>
                          Final Amount
                        </td>
                        <td className="width-20" style={{ border: '1px solid #222', borderBottom: '1px solid #222', textAlign: 'center' }}>
                          {isInvoiceDetails[0].final_amount}
                        </td>
                      </tr>

                    </tbody>

                  </table>
                </div>
                {/* <div className="new1"></div> */}
                <div className="marg-both-10">
                  <table className="table-no-border">
                    <tr className='d-lg-block d-md-block d-sm-none d-none'>
                      <td className="width-50">
                        <div><strong style={{ fontSize: '20px', lineHeight: '2.2px' }}>Payment Reference</strong></div>
                        <div style={{ fontSize: '14px' }}><strong style={{ fontSize: '14px' }}>Amount of Payment : </strong> Rs.{isInvoiceDetails[0].final_amount}/-</div>
                        <div style={{ fontSize: '14px' }}><strong style={{ fontSize: '14px' }}>Date :</strong> {isInvoiceDetails[0].order_date} </div>
                        <div style={{ fontSize: '14px' }}><strong style={{ fontSize: '14px' }}>Mode of payment :</strong> {isInvoiceDetails[0].payment_mode} </div>
                      </td>
                      <td className="width-10">
                        <div><strong style={{ fontSize: '20px' }}>Company Details</strong></div>
                        <div>Usedbookr</div>
                        <div>Coimbatore, Tamil NADU</div>
                        <div><strong>Invoice issued by :</strong> Usedbookr</div>
                      </td>
                    </tr>
                    <tr className='d-lg-none d-md-none d-sm-block d-block'>
                      <td className="width-50">
                        <div><strong style={{ fontSize: '20px', lineHeight: '2.2px' }}>Payment Reference</strong></div>
                        <div style={{ fontSize: '14px' }}><strong style={{ fontSize: '14px' }}>Amount of Payment : </strong> Rs.{isInvoiceDetails[0].final_amount}/-</div>
                        <div style={{ fontSize: '14px' }}><strong style={{ fontSize: '14px' }}>Date :</strong> {isInvoiceDetails[0].order_date} </div>
                        <div style={{ fontSize: '14px' }}><strong style={{ fontSize: '14px' }}>Mode of payment :</strong> {isInvoiceDetails[0].payment_mode} </div>
                      </td>
                    </tr>
                    <tr className='d-lg-none d-md-none d-sm-block d-block my-2'>
                      <td className="width-50">
                        <div><strong style={{ fontSize: '20px' }}>Company Details</strong></div>
                        <div>Usedbookr</div>
                        <div>Coimbatore, Tamil NADU</div>
                        <div><strong>Invoice issued by :</strong> Usedbookr</div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="text-center my-3">
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