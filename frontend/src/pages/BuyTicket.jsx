import React, { useEffect, useRef, useState } from 'react'
// import './Gigs.scss'
// import { gigs } from '../../data'
import GigCard from '../components/gigCard/GigCard'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Film from '../components/Film'
import Header from '../components/Header'
const BuyTicket = () => {
  const [films, setFilms] = useState([])

  const { user, dispatch } = React.useContext(AuthContext)
  console.log(user)
  const sections = [
    { title: 'Change Point', url: '/change-point' },
    { title: 'Book Ticket', url: '#' },
  ]
  useEffect(() => {
    const fetchData = async () => {
      let res
      try {
        res = await axios.get('/api/phims')
        console.log(res.data)
        setFilms(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    document.title = 'Book ticket'

    fetchData()
  }, [])

  return (
    <>
      <div className='gigs'>
        <div className='container'>
          <div className='container-left'>
            <div className='cards'>
              {films.map((film) => (
                <Film key={film.id} item={film} />
              ))}
            </div>
          </div>

          {/* </Link> */}
        </div>
      </div>
    </>
  )
}

export default BuyTicket
