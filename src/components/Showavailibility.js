import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { BACKEND_URL } from '../services/helper';
const Showavailibility = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [message,setmessage]=useState('');
  useEffect(() => {
    // Fetch available dates from the backend API
    axios.get(`${BACKEND_URL}/filldates`)
      .then(response => {
        setAvailableDates(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    // Fetch available time slots for the selected date
    if (selectedDate) {
      axios.get(`${BACKEND_URL}/available-time-slots`)
        .then(response => {
          setAvailableTimeSlots(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedDate]);
  const handleTimeSlotSelect = (timeSlot) => {
    console.log(`Selected time slot: ${timeSlot}`);
    const e=localStorage.getItem("useremail");
    const bookingData = {
        selectedDate: selectedDate,
        selectedTimeSlot: timeSlot,
        email:e,
      };
      // Making a POST request to book the appointment
      axios.post('https://server-e37o.onrender.com/book-appointment', bookingData)
        .then(response => {
          console.log(response.data.message); 
          if(response.status===201){
            setmessage("Appointment Booked Succesfully")
          }
          if(response.status===200)
          {
            setmessage("This time slot has been booked")
          }
        })
        .catch(error => {
          console.error(error);
        });
  };
  const cancelAppointment=()=>{
    const e=localStorage.getItem("useremail");
    const data={
      email:e,
    };
    axios.delete(`${BACKEND_URL}/cancel-appointment`, {
      data: data, // Sending the payload in the data property
      headers: {
        'Content-Type': 'application/json', 
      },
    })
    .then(response=>{
      console.log(response.data.message);
      if(response.status===200){
        setmessage("You have not booked any appointments")
      }
      else{
        setmessage("Appointment has been cancelled")
      }
      
    })
    .catch(error=>{
      console.error(error);
    });
  }
  return (
      <div style={{"display":"flex","backgroundImage":"url('https://img.freepik.com/premium-photo/calendar-page-close-up-blue-background-business-planning-appointment-meeting-concept_293060-976.jpg')","backgroundSize":"cover","backgroundRepeat":"no-repeat","width":"100vw","height":"100vh"}}>
      <div>
        <div style={{"margin":"30px","marginTop":"60px"}}>
      <h3 style={{"marginLeft":"60px"}}>Available Dates and Time Slots</h3>
      </div>
      <div className="calendar-container" style={{"marginLeft":"60px","marginRight":"60px","marginBottom":"10px"}}>
        <Calendar
          tileDisabled={({ date }) =>
            availableDates.some(d => new Date(d.date).toDateString() === date.toDateString())
          }
          onClickDay={(date) => setSelectedDate(date)}
        />
      </div>
      <h3 style={{"marginLeft":"80px","marginRight":"60px","marginTop":"30px"}}>{message}</h3>
      <button style={{"marginTop":"10px","padding":"10px","cursor":"pointer","marginLeft":"140px","borderRadius":"5px","backgroundColor":"red"}} 
              onClick={()=>cancelAppointment()}>Cancel Appointment</button>
      </div>
      {selectedDate && (
        <div style={{"marginTop":"60px"}}>
          <h3 style={{"marginLeft":"10px","marginBottom":"20px"}}>Available Time Slots<p>{selectedDate.toDateString()}</p> </h3>
          <div className="time-slots" style={{"display":"flex","justifyContent":"center","flexDirection":"column","alignItems":"center"}}>
            {availableTimeSlots.map((timeSlot, index) => (
              <button key={index} className="time-slot-button"onClick={() => handleTimeSlotSelect(timeSlot)}
                style={{"padding": "4px","textAlign": "center","textDecoration": "none","width":"70%","margin":"4px"}}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
    
  );
};
export default Showavailibility;

