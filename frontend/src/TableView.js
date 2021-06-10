import "./App.css";
import { employeeData } from "./data";
import { useState } from 'react';

const HomePageHeader = ({ searchQuery, setSearchQuery }) => {
      return (
          <form action="/" method="get" class="search">
            <h2>Table View</h2>
              <label htmlFor="header-search">
                  <span>Filter</span>
              </label>
              <input
                  value={searchQuery}
                  onInput={e => setSearchQuery(e.target.value)}
                  type="text"
                  id="header-search"
                  placeholder="Filter"
                  name="s" 
              />
              <button type="submit">Search</button>
          </form>
      
      );
};



const MyTable = ({ company, ticker}) => {
      if (!company) return <div />;
      return (
          <tbody>
            <tr>
              <td>
                <h5>{company}</h5>
              </td>
              <td>
                <h5>{ticker}</h5>
              </td>
            </tr>
          </tbody>
      );
    };

    function check(fruits, location){
        
      if(fruits.length === 0)
      {
        return -1;
      }
        for(var i = 0; i < fruits.length; i++)
        {
            if(fruits[i].location === location)
            {
                return i;
            }
        }
        return -1;
      };

      function filterPosts(posts, query){

        var filtered = []
        if (!query) {
            return posts;
        }
      
        for(var i = 0; i < posts.length; i++)
        {
          if(posts[i].location.toLowerCase().startsWith(query))
          {
            filtered.push(posts[i]);
          }
        }

        return filtered;
      };

      function getEmployeeData(data){

        var employee_dict = []; 
        for(var i = 0; i < data.length; i++)
        {
          var index = check(employee_dict, data[i].location);
          if(index === -1)
          {
            employee_dict.push({
                  location:   data[i].location,
                  currValue: parseFloat(data[i].currSalary.replace("$", "")),
                  noOf: 1
              });
          }
          else{
            employee_dict[index].currValue += parseFloat(data[i].currSalary.replace("$", ""));
            employee_dict[index].noOf += 1;
          }
        }
        return employee_dict;
      }

    export const TableView = () => {
        var employee_dict = getEmployeeData(employeeData);
        const { search } = window.location;
        const query = new URLSearchParams(search).get('s');
        const [searchQuery, setSearchQuery] = useState(query || '');
         const filtered = filterPosts(employee_dict, searchQuery);

          return (
        <>
              <HomePageHeader 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <div>
              <table>
                    <thead>
                    <th>First Name</th>
                    <th>Mean Salary($)</th>
                  </thead>
                
                {
                filtered.map((data, key) => {
                    var mean = data.currValue/data.noOf;
                  return (

                      <MyTable
                        company={data.location}
                        ticker={mean}
                      />
                  );
                })}
                </table>
              </div>
            </>
          );
        };

