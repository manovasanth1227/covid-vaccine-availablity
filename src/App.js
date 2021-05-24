import "./App.css";
import Container from "./Components/Container";
import Table from "./Components/TableContent";
import React, { useState } from "react";
import useFetch from "./Hooks/use-fetch";
import Loader from "./Components/Loader";
import { Footer } from "./Components/Footer";

let errorCheck = false;
function App() {
  const [data, setData] = useState([]);

  const [loading, fetchDetails, error] = useFetch();

  const tranformData = (data, check) => {
    if (data.centers.length > 0 && check.age) {
      let res = [];
      for (let center of data.centers) {
        let newData = {};
        let sessions = [];
        for (let session of center.sessions) {
          if (
            session.min_age_limit === Number(check.age) &&
            (session.vaccine === check.vaccine || check.vaccine === "Both")
          ) {
            sessions.push(session);
          }
        }
        if (sessions.length !== 0) {
          newData = {
            ...center,
            sessions,
          };
          res.push(newData);
        }
      }
      const preData = res.sort((a, b) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      );

      setData(preData);
    }
  };

  const setFetchData = (res) => {
    errorCheck = true;
    console.log(res.date + "  " + res.id);
    if (res.id && res.age) {
      fetchDetails(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${res.id}&date=${res.date}`,
        (data) => tranformData(data, res)
      );
    }
  };

  return (
    <div className="root">
      <div className="heading">
        <h1>Covid Vaccine Appoinments</h1>
        <div></div>
      </div>
      {error && <h1>{error.message}</h1>}
      {loading && <Loader />}
      <Container preDataToFetch={setFetchData}></Container>
      <div className="table">
        {data.length > 0 ? (
          <div className="div-container">
            <h1>Results Found : {data.length}</h1>
            <div className="strike"></div>
          </div>
        ) : (
          !loading &&
          errorCheck && <h1 style={{ color: "#f05945" }}>No Results Found!</h1>
        )}
        {data.length > 0 && <Table rows={data} />}
      </div>
      <Footer css={data.length > 0 ? true : false} />
    </div>
  );
}

export default App;
