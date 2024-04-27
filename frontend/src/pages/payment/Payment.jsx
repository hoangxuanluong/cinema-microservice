import React, { useContext, useEffect, useState } from 'react'
import './payment.css'
import { useHoaDon } from '../../context/BillContext'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import moment from 'moment/moment'
import { useNavigate } from 'react-router-dom'

import { Container } from '@mui/material'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MainFeaturedPost from '../../components/MainFeaturedPost'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const sections = [
  { title: 'Change Point', url: '/change-point' },
  { title: 'Book Ticket', url: '#' },
]

const mainFeaturedPost = {
  title: 'Forrest Gump',
  description:
    'A man with a low IQ accomplishes great things in his life and witnesses and influences various historical events.',
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
}

const API = process.env.REACT_APP_PAYMENT_API

const Payment = () => {
  const { ve, setVe, chiTietDichVus, setChiTietDichVus } = useHoaDon()
  const { user } = useContext(AuthContext)
  const [qr, setQr] = useState('')
  const [open, setOpen] = React.useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const navigate = useNavigate()
  console.log(moment().format('YYYY/MM/DD'))
  let MY_BANK = {
    BANK_ID: 'MB',
    ACCOUNT_NO: process.env.ACCOUNT_NUMBER,
    TEMPLATE: 'compact2',
  }

  const payment = async (filterService, filteredTicket) => {
    const data = {
      thanhVienId: user.id,
      chiTietDichVus: filterService,
      chiTietVes: filteredTicket,
    }
    // console.log(data)
    // console.log(JSON.stringify(data))

    try {
      const res = await axios.post('/api/hoadons', data)
      // console.log(data)
      setOpen(true)

      setTimeout(() => navigate('/'), 2000)

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    document.title = 'Payment'
    let transactionContent = user.name + ' '

    var filteredTicket = ve.map(function (item) {
      transactionContent += item.id
      return {
        veId: item.id,
      }
    })

    var filterService = chiTietDichVus.map(function (item) {
      return {
        price: item.price,
        quantity: item.quantity,
        dichVuId: item.dichVu.id,
      }
    })

    let total = 0
    console.log(transactionContent)

    for (let i = 0; i < ve.length; i++) {
      total += ve[i].lichChieu.price
    }

    for (let i = 0; i < chiTietDichVus.length; i++) {
      total += chiTietDichVus[i]?.quantity * chiTietDichVus[i]?.price
    }
    total = total * 10

    setQr(
      `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${MY_BANK.ACCOUNT_NO}-${MY_BANK.TEMPLATE}.png?amount=${total}&addInfo=${transactionContent}&accountName=CINEMA`
    )

    console.log('Tổng giá trị là: ' + total)

    // checkTransaction(total)

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          'https://oauth.casso.vn/v2/transactions?pageSize=50',
          {
            headers: {
              Authorization: `Apikey ${API}`,
              'Content-Type': 'application/json',
            },
          }
        )

        console.log(res.data.data.records)
        var transactions = res.data.data.records

        console.log(total)

        transactions.forEach((transaction) => {
          if (
            transaction.amount === total &&
            transaction.description.includes(transactionContent)
          ) {
            clearInterval(interval)
            console.log('Giao dịch trùng khớp:', transaction)
            payment(filterService, filteredTicket)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }, 5 * 1000) // 5s

    // Hủy lập lịch sau một khoảng thời gian nhất định (ví dụ: sau 20p)
    setTimeout(() => {
      clearInterval(interval)
    }, 10 * 60 * 1000)
  }, [
    MY_BANK.ACCOUNT_NO,
    MY_BANK.BANK_ID,
    MY_BANK.TEMPLATE,
    chiTietDichVus,
    user.email,
    ve,
    user.name,
  ])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Thay YOUR_API_KEY_HERE bằng khóa API thực của bạn
  //       const response = await axios.post(
  //         'https://oauth.casso.vn/v2/sync',
  //         {
  //           bank_acc_id: '1230116112002',
  //         },
  //         {
  //           headers: {
  //             Authorization: `Apikey ${API}`,
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       )
  //       console.log(response.data) // In dữ liệu phản hồi vào console
  //     } catch (error) {
  //       console.error('Error:', error)
  //     }
  //   }

  //   const timer = setTimeout(() => {
  //     fetchData()
  //   }, 120000) // Chờ 2 phút (120000 milliseconds) trước khi gửi yêu cầu

  //   return () => clearTimeout(timer) // Xóa timer khi component bị unmounted để tránh memory leaks
  // }, [])

  // const handlePayment = async (e) => {
  //   e.preventDefault()
  //   console.log(ve)
  //   console.log(chiTietDichVus)
  //   console.log(user)
  //   var filterService = chiTietDichVus.map(function (item) {
  //     return {
  //       price: item.price,
  //       quantity: item.quantity,
  //       dichVuId: item.dichVu.id,
  //     }
  //   })

  //   var filteredTicket = ve.map(function (item) {
  //     return {
  //       veId: item.id,
  //     }
  //   })

  //   const data = {
  //     thanhVienId: user.id,
  //     chiTietDichVus: filterService,
  //     chiTietVes: filteredTicket,
  //   }
  //   console.log(data)
  //   // console.log(JSON.stringify(data))

  //   try {
  //     const res = await axios.post('/api/hoadons', data)
  //     console.log(data)

  //     setTimeout(() => navigate('/'), 2000)

  //     console.log(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <>
      <Container maxWidth='lg'>
        <Header title='MMM Cinema' sections={sections} />
        <div className='payment-container'>
          <div className='payment-left'>
            <div className='member-info' style={{ textTransform: 'uppercase' }}>
              {user.name} - {user.tel || '0349940359'}
            </div>
            <div className='movie-info'>
              MOVIE: {ve[0]?.lichChieu?.phim.name}
            </div>
            <div className='movie-info'>DATE: {ve[0]?.lichChieu?.date}</div>
            <div className='movie-info'>
              ROOM: {ve[0]?.lichChieu?.phongChieu.name}
            </div>
            <div className='movie-info'>
              Time: {ve[0]?.lichChieu?.khungGio.timeStart}
            </div>
            <div className='ticket-book'>
              <div className='ticket-title'>Ticket:</div>
              <div className='ticket-details'>
                {ve.map((ele) => (
                  <div key={ve.id} className='ticket-number'>
                    Seat:{ele.ghe.numberChair}
                  </div>
                ))}
              </div>
            </div>
            <div className='service-book'>
              <div className='serviceTitle'>ITEM:</div>
              <div className='serviceInfo'>
                {chiTietDichVus.map((ele, index) => (
                  <div key={ele.dichVu.id} className='service-details'>
                    {ele.dichVu.name} - {ele.quantity} - {ele.dichVu.price} -{' '}
                    {ele.quantity * ele.dichVu.price}
                  </div>
                ))}
              </div>
            </div>
            {/* <div className='payment-button' onClick={(e) => handlePayment(e)}>
              Payment
            </div> */}
          </div>
          <div className='right'>
            <img src={qr} alt='' />
          </div>
        </div>
      </Container>

      <Footer
        title='Footer'
        description='Something here to give the footer a purpose!'
      />
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
            anchororigin={{ vertical: 'top', horizontal: 'right' }}
          >
            Buy ticket successfully !!!
          </Alert>
        </Snackbar>
        {/* <Alert severity='success'>This is a success message!</Alert> */}
      </Stack>
    </>
  )
}

export default Payment
