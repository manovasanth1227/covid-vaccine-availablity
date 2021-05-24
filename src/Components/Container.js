import "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import classes from "./Container.module.css";
import useFetch from "../Hooks/use-fetch";
import StateBox from "./StateBox";
import DistrictBox from "./DistrictBox";
import SelectBox from "./SelectBox";
import DateFnsUtils from "@date-io/date-fns";
import Loader from "./Loader";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const STATEURL = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
const DISTRICTURL =
  "https://cdn-api.co-vin.in/api/v2/admin/location/districts/";
const useStyles = makeStyles((theme) => ({
  input: {
    color: "#0D9963",
  },
}));
function Container({ preDataToFetch }) {
  const styleClasses = useStyles();
  const [states, setStates] = useState([]);
  const [Districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [userInputHandler, setUserInputHandler] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [age, setAge] = useState("");
  const [vaccine, setVaccine] = useState("");

  const [loading, fetchDetails, error] = useFetch();

  const transformState = useCallback((statesData) => {
    if (statesData.states.length > 0) {
      setStates(statesData.states);
    }
  }, []);

  const transformDistrict = useCallback((districtsData) => {
    if (districtsData.districts.length > 0) {
      setDistricts(districtsData.districts);
    }
  }, []);

  useEffect(() => {
    fetchDetails(STATEURL, transformState);
  }, [transformState, fetchDetails]);

  const districtsFetch = (id) => {
    fetchDetails(DISTRICTURL + id, transformDistrict);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = () => {
    if (!districtId || !age || !vaccine) setUserInputHandler(true);
    else {
      setUserInputHandler(false);
      preDataToFetch({
        id: districtId,
        date: moment(selectedDate).format("DD-MM-YYYY"),
        age,
        vaccine,
      });
    }
  };

  return (
    <div className={classes.container}>
      {userInputHandler && (
        <p style={{ color: "red" }}>Enter the required details</p>
      )}
      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={classes["inner-container"]}>
        <div className={classes["state-district"]}>
          {!loading && !error && (
            <StateBox stateData={states} setState={districtsFetch} />
          )}
          {!loading && !error && (
            <DistrictBox
              DistrictsData={Districts}
              setDistrict={setDistrictId}
            />
          )}
        </div>
        <div className={classes["state-district"]}>
          <SelectBox re name="Age" setSelectState={setAge}>
            <MenuItem value="18">
              <p style={{ color: "#0D9963" }}>&gt; 18</p>
            </MenuItem>
            <MenuItem value="45">
              <p style={{ color: "#0D9963" }}>&gt; 45</p>
            </MenuItem>
          </SelectBox>
          <SelectBox name="Vaccine" setSelectState={setVaccine}>
            <MenuItem value="COVAXIN">
              <p style={{ color: "#0D9963" }}>Covaxin</p>
            </MenuItem>
            <MenuItem value="COVISHIELD">
              <p style={{ color: "#0D9963" }}>Covishield</p>
            </MenuItem>
            <MenuItem value="Both">
              <p style={{ color: "#0D9963" }}>Any</p>
            </MenuItem>
          </SelectBox>
        </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            variant="dialog"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="dd-MM-yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            InputProps={{ className: styleClasses.input }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          style={{
            borderRadius: 35,
            backgroundColor: "#0D9963",
            color: "white",
            padding: "2% 8%",
            fontSize: "16px",
            textTransform: "capitalize",
          }}
          variant="contained"
          onClick={onSubmit}
        >
          Generate
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Container);
