import React, { useState } from 'react';
import './App.css';
import homepageBackground from './assets/homepage.png'; // 4x4 grid background
import meditationBackground from './assets/meditationpage.png'; // Meditation page background
import timerBackground from './assets/timerBackground.png'; // Timer page background


const App = () => {
 const [screen, setScreen] = useState('homepage'); // Default to 'homepage'
 const [trackerState, setTrackerState] = useState({}); // Tracks completed days in the habit tracker
 const [time, setTime] = useState(0); // Timer value for dropdown
 const [mood, setMood] = useState(''); // Mood selection


 const handleMeditationClick = () => {
   setScreen('meditate'); // Navigate to meditation page
 };


 const handleTrackerClick = () => {
   setScreen('tracker'); // Navigate to tracker page
 };


 const handleHomeClick = () => {
   setScreen('homepage'); // Navigate back to homepage
 };


 const handlePlayClick = () => {
   if (time > 0) {
     setScreen('timer'); // Navigate to timer page
   } else {
     alert('Please select a valid timer value!'); // Alert if no timer value is selected
   }
 };


 const handleTimeChange = (e) => {
   setTime(parseInt(e.target.value)); // Update timer state
 };


 const handleMoodChange = (e) => {
   setMood(e.target.value); // Update mood state
 };


 const toggleDay = (day) => {
   // Toggle the state of a day between completed and not completed
   setTrackerState((prevState) => ({
     ...prevState,
     [day]: !prevState[day],
   }));
 };


 return (
   <div
     style={{
       backgroundImage: `url(${
         screen === 'homepage'
           ? homepageBackground
           : screen === 'meditate'
           ? meditationBackground
           : timerBackground
       })`,
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
       backgroundPosition: 'center',
       width: '100vw',
       height: '100vh',
       position: 'relative',
     }}
   >
     {screen === 'homepage' && (
       <Homepage
         onMeditationClick={handleMeditationClick}
         onTrackerClick={handleTrackerClick}
       />
     )}
     {screen === 'meditate' && (
       <MeditationPage
         onHomeClick={handleHomeClick}
         onPlayClick={handlePlayClick}
         onTimeChange={handleTimeChange}
         onMoodChange={handleMoodChange}
         time={time}
         mood={mood}
       />
     )}
     {screen === 'tracker' && (
       <TrackerPage
         onHomeClick={handleHomeClick}
         trackerState={trackerState}
         toggleDay={toggleDay}
       />
     )}
     {screen === 'timer' && <TimerPage onHomeClick={handleHomeClick} time={time} />}
   </div>
 );
};


const Homepage = ({ onMeditationClick, onTrackerClick }) => {
 return (
   <div>
     {/* Green Rectangle for Meditation */}
     <div
       onClick={onMeditationClick}
       style={{
         position: 'absolute',
         top: '0%',
         left: '0%',
         width: '50%',
         height: '50%',
         cursor: 'pointer',
       }}
     ></div>


     {/* Orange Rectangle for Tracker */}
     <div
       onClick={onTrackerClick}
       style={{
         position: 'absolute',
         top: '50%',
         left: '0%',
         width: '50%',
         height: '50%',
         cursor: 'pointer',
       }}
     ></div>
   </div>
 );
};


const MeditationPage = ({
 onHomeClick,
 onPlayClick,
 onTimeChange,
 onMoodChange,
 time,
 mood,
}) => {
 return (
   <div>
     {/* Textbox */}
     <textarea
       placeholder="How are you feeling today?"
       style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         width: '80%',
         height: '200px',
         padding: '10px',
         fontSize: '16px',
         borderRadius: '8px',
         border: '1px solid #ccc',
         backgroundColor: 'white',
         color: '#000',
         outline: 'none',
       }}
     ></textarea>


     {/* Mood Dropdown */}
     <select
       onChange={onMoodChange}
       value={mood}
       style={{
         position: 'absolute',
         top: '69%',
         left: '50%',
         transform: 'translateY(-50%)',
         width: '150px',
         padding: '5px',
         borderRadius: '5px',
         border: '1px solid #ccc',
         backgroundColor: 'white',
         color: '#000',
         outline: 'none',
       }}
     >
       <option value="">Select Mood</option>
       <option value="Happy">Happy</option>
       <option value="Relaxed">Relaxed</option>
       <option value="Stressed">Stressed</option>
       <option value="Anxious">Anxious</option>
       <option value="Excited">Excited</option>
     </select>


     {/* Timer Dropdown */}
     <select
       onChange={onTimeChange}
       value={time}
       style={{
         position: 'absolute',
         top: '79%',
         left: '50%',
         transform: 'translateY(-50%)',
         width: '100px',
         padding: '5px',
         borderRadius: '5px',
         border: '1px solid #ccc',
         backgroundColor: 'white',
         color: '#000',
         outline: 'none',
       }}
     >
       <option value="0">Select Timer</option>
       <option value="30">0:30</option>
       <option value="60">1:00</option>
       <option value="90">1:30</option>
       <option value="120">2:00</option>
     </select>


     {/* Home Button */}
     <button
       onClick={onHomeClick}
       style={{
         position: 'absolute',
         top: '20px',
         right: '20px',
         padding: '10px 20px',
         backgroundColor: '#4caf50',
         color: 'white',
         border: 'none',
         borderRadius: '5px',
         fontSize: '14px',
         cursor: 'pointer',
       }}
     >
       Home
     </button>


     {/* Play Button */}
     <button
       onClick={onPlayClick}
       style={{
         position: 'absolute',
         top: '89%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         padding: '10px 20px',
         backgroundColor: '#4caf50',
         color: 'white',
         border: 'none',
         borderRadius: '5px',
         fontSize: '16px',
         cursor: 'pointer',
       }}
     >
       Play
     </button>
   </div>
 );
};


const TrackerPage = ({ onHomeClick, trackerState, toggleDay }) => {
 const days = Array.from({ length: 30 }, (_, i) => i + 1); // Generate days 1-30


 return (
   <div
     style={{
       backgroundColor: '#FFA500', // Replace with the exact orange color code you want
       width: '100vw',
       height: '100vh',
       padding: '20px',
       fontFamily: 'Arial, sans-serif',
     }}
   >
     {/* Home Button */}
     <button
       onClick={onHomeClick}
       style={{
         position: 'absolute',
         top: '20px',
         right: '20px',
         padding: '10px 20px',
         backgroundColor: '#4caf50',
         color: 'white',
         border: 'none',
         borderRadius: '5px',
         fontSize: '14px',
         cursor: 'pointer',
       }}
     >
       Home
     </button>


     {/* Habit Tracker Table */}
     <table
       style={{
         width: '100%',
         borderCollapse: 'collapse',
         marginTop: '50px',
         backgroundColor: 'white', // Optional: keep the table background white for contrast
       }}
     >
       <thead>
         <tr>
           <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc' }}>Habits</th>
           {days.map((day) => (
             <th
               key={day}
               style={{
                 textAlign: 'center',
                 padding: '10px',
                 borderBottom: '2px solid #ccc',
               }}
             >
               {day}
             </th>
           ))}
         </tr>
       </thead>
       <tbody>
         <tr>
           <td
             style={{
               textAlign: 'left',
               padding: '10px',
               fontWeight: 'bold',
               borderBottom: '1px solid #ccc',
             }}
           >
             Meditate
           </td>
           {days.map((day) => (
             <td
               key={day}
               onClick={() => toggleDay(day)}
               style={{
                 textAlign: 'center',
                 padding: '10px',
                 cursor: 'pointer',
                 backgroundColor: trackerState[day] ? '#4caf50' : 'white', // Change color if clicked
                 color: trackerState[day] ? 'white' : 'black', // Contrast text color
                 border: '1px solid #ccc',
                 transition: 'all 0.3s ease',
               }}
             >
               {trackerState[day] ? '✔' : ''}
             </td>
           ))}
         </tr>
       </tbody>
     </table>
   </div>
 );
};


const TimerPage = ({ onHomeClick, time }) => {
 const [remainingTime, setRemainingTime] = useState(time);


 React.useEffect(() => {
   if (remainingTime > 0) {
     const timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
     return () => clearTimeout(timer);
   }
 }, [remainingTime]);


 return (
   <div
     style={{
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh',
       color: '#4caf50',
       fontSize: '48px',
       fontWeight: 'bold',
       textAlign: 'center',
       position: 'relative',
       top: '-4.5%',
     }}
   >
     {/* Countdown Timer */}
     <div>
       {Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, '0')}
     </div>


     {/* Home Button */}
     <button
       onClick={onHomeClick}
       style={{
         position: 'absolute',
         top: '20px',
         right: '20px',
         padding: '10px 20px',
         backgroundColor: '#f44336',
         color: 'white',
         border: 'none',
         borderRadius: '5px',
         fontSize: '14px',
         cursor: 'pointer',
       }}
     >
       Home
     </button>
   </div>
 );
};


export default App;





