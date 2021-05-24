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
    color: "#aa8622",
  },
}));
let id = "";
function StateBox({ stateData, setState }) {
  const classes = useStyles();
  const [stateId, setStateId] = useState(id);

  const handleChange = (e) => {
    setStateId(e.target.value);
    setState(e.target.value);
    id = e.target.value;
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.inputLabel} id="state-select-label">
        Select State
      </InputLabel>
      <Select
        labelId="state-select-label"
        id="state-select"
        className={classes.select}
        value={stateId}
        onChange={handleChange}
      >
        {stateData.length !== 0 &&
          stateData.map((state, index) => (
            <MenuItem key={index} value={state.state_id}>
              {state.state_name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default React.memo(StateBox);
