import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './selectTicket.css'
import { useHoaDon } from '../../context/BillContext'
import { Table, TableHead, TableRow } from '@mui/material'
import { TableBar } from '@mui/icons-material'
import Header from '../../components/Header'

const SelectTicket = () => {
  const [tickets, setTickets] = useState([])
  const [bookedTickets, setBookedTickets] = useState([])
  const idLichChieu = useLocation().pathname.split('/')[2]
  const { ve, setVe } = useHoaDon()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/ves/lichchieus/${idLichChieu}`)
        setTickets(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    document.title = 'Chọn vé';
  }, [idLichChieu])

  const handleTicketClick = (ticket) => {
    // Check if the ticket is already booked
    const isBooked = bookedTickets.includes(ticket)

    if (isBooked) {
      // If already booked, remove it from the bookedTickets list
      const updatedBookedTickets = bookedTickets.filter((id) => id !== ticket)
      setBookedTickets(updatedBookedTickets)
      setVe(updatedBookedTickets)
    } else {
      // If not booked, add it to the bookedTickets list
      setBookedTickets([...bookedTickets, ticket])
      setVe([...bookedTickets, ticket])
    }
  }
  console.log(ve)
  // console.log(tickets)
  console.log(bookedTickets)

  const handleNextButton = () => {
    navigate('/services')
  }
  const sections = [
    { title: 'Change Point', url: '/change-point' },
    { title: 'Book Ticket', url: '#' },
  ]
  return (
    <>
      <Header title='MMM Cinema' sections={sections} />
      <div className='container'>
        <div className="wraper">
          <div style={{textAlign: 'center', marginBottom: 10, fontWeight: 'bold', marginBottom: 50}}><h2>Chọn ghế</h2></div>
          <div style={{display: 'flex',justifyContent: 'center', marginBottom: 10}}>
            
            <table style={{boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",}}>
              <tr style={{}}>
                <th>Tên phim</th>
                <th>Rạp</th>
                <th>Suất chiếu</th>
                <th>Phòng chiếu</th>  
              </tr>
              <tr>
                <td style={{borderBottom: "1px solid #ddd", padding: 10}}>{tickets[0]?.lichChieu.phim.name}</td>
                <td style={{borderBottom: "1px solid #ddd", padding: 10}}>{tickets[0]?.lichChieu.phongChieu.rap.name}</td>
                <td style={{borderBottom: "1px solid #ddd", padding: 10}}> {tickets[0]?.lichChieu.date}</td>
                <td style={{borderBottom: "1px solid #ddd", padding: 10}}>{tickets[0]?.lichChieu.phongChieu.name}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className='wrapper'>
          <div className='tickets'>
            {tickets?.map((ticket, index) => (
              <div key={index}>
                {ticket?.booked ? (
                  <div className='ticket selected'>{ticket.ghe.numberChair}</div>
                ) : (
                  <div
                    onClick={() => handleTicketClick(ticket)}
                    className={ve.includes(ticket) ? 'booked ticket' : 'ticket'}
                  >{ticket.ghe.numberChair}</div>
                )}
              </div>
            ))}
          </div>
          <div style={{padding: 15, backgroundColor: 'gray'}} className='button-next' onClick={() => handleNextButton()}>
            Next
          </div>
        </div>
      </div>
    </>
  )
}
export default SelectTicket
