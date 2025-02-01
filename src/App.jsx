import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Calender from './components/Calender';
import { useState, useEffect, useCallback } from 'react';
import AppointmentInfo from './components/ApointmentInfo';

const App = () => {
  const [Data, setData] = useState([]);

  const [query, setQuery] = useState('');
  let [sortBy, setSortBy] = useState('petName');
  let [orderBy, setOrderBy] = useState('asc');

  const filteredAppointments = Data.filter(item =>
    typeof item.petName === 'string' && item.petName.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => {
    let order = (orderBy === "asc") ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
    )

  });


  const fetchData = useCallback(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  useEffect(() => fetchData(), [fetchData]);

  // Function to delete an appointment by id
  const handleDelete = (dataId) => {
    setData(prevData => prevData.filter(item => item.id !== dataId));
  };

  return (
    <>
      <div className="grid grid-cols-2 p-10 h-8 pb-10">
        <Header />
        <Search query={query}
          onQueryChange={myQuery => setQuery(myQuery)}
          orderBy={orderBy}
          onOrderByChange={mySort => setOrderBy(mySort)}
          sortBy={sortBy}
          onSortByChange={mySort => setSortBy(mySort)}
        />
      </div>

      <div className="grid grid-cols-1 p-10">
        <Calender />
      </div>

      <div className="grid grid-cols-1 pt-4 p-10">
        <ul className="divide-y divide-gray-200">
          {filteredAppointments.map(data => (
            <AppointmentInfo
              key={data.id}
              data={data}
              onDeleteData={handleDelete} // Pass the function here
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
