import React, { useEffect, useState } from 'react'
import EventCard from '../Event/EventCard';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { BASE_URL } from '../../config';
import CreateEventModel from '../Event/CreateEventModel';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

function HomeComponent() {
  const [cookies] = useCookies(['userId', 'jwttoken']);
  const [allEvents, setAllEvents] = useState([]);
  console.log('All Events : ', allEvents);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(BASE_URL + '/api/EventDetails');
      // console.log(res);
      setAllEvents(res.data);
    }
    fetchData();
  }, []);


  const showErrorMsg = () => {
    if (null == cookies['userId'] || null == cookies['jwttoken']) {
      toast.error('Please login to create an event');
    }
  }

  return (
    <div>
      {/* <h1>Home</h1> */}
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-2 col-md-3 col-sm-4 offset-lg-10 offset-md-9 offset-sm-8 mt-4">
            {cookies['userId'] && cookies['jwttoken'] 
            ?
            <>
            <button className="col-12 btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEventModel">Create Event</button>
            <CreateEventModel />
            </>
            :<button className="col-12 btn btn-primary" onClick={showErrorMsg}>Create Event</button>
            }
          </div>
        </div>
        <div className="row justify-content-center">
          <div style={{ textAlign: 'left', marginTop: '45px' }} className="col-md-12">
            <h1>Happening Now!</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {
            allEvents && allEvents.map((event) => <EventCard key={event.id} currentEvent={event} />)
          }

        </div>

      </div>

      <Footer />
    </div>
  )
}

export default HomeComponent;