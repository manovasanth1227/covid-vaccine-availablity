import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    "&:before": {
      borderColor: "#aa8622",
      color: "#aa8622",
    },
    "&:after": {
      borderColor: "#aa8622",
      color: "#aa8622",
    },
    color: "#0D9963",
  },
  icon: {
    fill: "#aa8622",
  },
  inputLabel: {
    color: "#aa8622",
    "&.Mui-focused": {
      color: "#aa8622",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
let id = "";

function DistrictBox({ DistrictsData, setDistrict }) {
  const classes = useStyles();
  const [districtId, setDistrictId] = useState(id);

  const handleChange = (e) => {
    setDistrictId(e.target.value);
    setDistrict(e.target.value);
    id = e.target.value;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.inputLabel} id="District-select-label">
        Select District
      </InputLabel>
      <Select
        labelId="District-select-label"
        id="District-select"
        className={classes.select}
        disabled={DistrictsData.length === 0}
        value={districtId}
        onChange={handleChange}
      >
        {DistrictsData.length !== 0 &&
          DistrictsData.map((district, index) => (
            <MenuItem key={index} value={district.district_id}>
              {district.district_name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default React.memo(DistrictBox);
