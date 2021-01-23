import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import ACIssues from './components/ACIssues';
import ACPullRequests from './components/ACPullRequests';


function App() {  

  return (
    <Router>
      <div className="App">
        <Navbar />
        <ACIssues />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <ACPullRequests />
      </div>
    </Router>
  );
}


// function App() {

//   const { loading, error, data } = useQuery(EXCHANGE_RATE);
//   console.log(data);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.rates.map(({ currency, rate }) => (
//     <div key={currency}>
//       <p>
//         {currency}: {rate}
//       </p>
//     </div>
//   ));

//   return (
//       <div className="App">
//         <h2>My First Apollo App</h2>
//         { loading && <h2>Loading...</h2>}
//         { error && <h2>Whoops... Something went wrong</h2>}
//         { data.rates.map((rate, id) => (
//           <p id={ id }>{ rate.currency }</p>
//         ))}
//         {/* <p>{ data.rates }</p> */}
//       </div>
//   );
// }

export default App;
