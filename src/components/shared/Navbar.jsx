import { useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import toDoList from "../../assets/to-do-list.png";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Navbar = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { user,  } = useContext(AuthContext);

  const today = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
    year: 'numeric'
  });

  return (
    <nav>
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img className="h-10 w-auto" alt="toDoList" src={toDoList} />
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setCalendarOpen(!calendarOpen)} className="text-white">{today}</button>
            {user ? (
              <>
                <img className="h-8 w-8 rounded-full" src={user.photoURL} alt={user.displayName} />
                <div className="flex flex-col items-start">
                  <span className="text-white">{user.displayName}</span>
                  <span className="text-white text-xs">{user.email}</span>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {calendarOpen && (
          <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black/5">
            <Calendar />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
