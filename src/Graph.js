import { Bar } from 'react-chartjs-2';
import { employeeData } from "./data";
import { useState } from 'react';

function check(fruits, location){
        
    for(var i = 0; i < fruits.length; i++)
    {
        if(fruits[i] === location)
        {
            return i;
        }
    }
    return -1;
  };

function returnCountries(data, searchQuery){
    
    var fruits = [];
    for(var i = 0; i < data.length; i++)
    {
        var index = check(fruits, data[i].location);
        searchQuery = searchQuery.toLowerCase();
        if(index === -1 && data[i].location.toLowerCase().startsWith(searchQuery))
        {
            fruits.push(data[i].location);
        }
    }
    return fruits;

  };

  function returnMeanSalary(data, country){
    
    var fruits = [];
    var len = []
    
    for(var k = 0; k < country.length; k++)
    {
        fruits.push(0);
        len.push(0);
    }

    for(var i = 0; i < country.length; i++)
    {
        for(var j = 0; j < data.length; j++)
        {
            if (country[i] === data[j].location)
            {
                fruits[i] += parseFloat(data[j].currSalary.replace("$", ""));
                len[i] += 1;
            }
        }
    }

    for(var m = 0; m < fruits.length; m++)
    {
        fruits[m] = fruits[m] / len[m];
    }
    return fruits;

  };
  
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const VerticalBar = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('t');
  const [searchQuery, setSearchQuery] = useState(query || '');

const data = {
  labels: returnCountries(employeeData, searchQuery),
  datasets: [
    {
      label: 'Mean Salary',
      data: returnMeanSalary(employeeData, returnCountries(employeeData, searchQuery)),
      borderWidth: 0.5,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
    },
  ],
};

return (
  
  <>
  <form action="/about" method="get" class="search">
            <h2>Chart View</h2>
              <label htmlFor="header">
                  <span>Filter</span>
              </label>
              <input
                  value={searchQuery}
                  onInput={e => setSearchQuery(e.target.value)}
                  type="text"
                  id="header"
                  placeholder="Filter"
                  name="t" 
              />
              <button>Search</button>
          </form>
    <div className='header'>
      <div className='links'>
      </div>
    </div>
    <Bar data={data} options={options} class = "bar" />
  </>
);
}
