import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

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

function SelectBox({ name, setSelectState, children }) {
  const classes = useStyles();
  const [state, setState] = useState("");

  const handleChange = (e) => {
    setState(e.target.value);
    setSelectState(e.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.inputLabel} id="name-select-label">
        Select {name}
      </InputLabel>
      <Select
        labelId="name-select-label"
        id="name-select"
        className={classes.select}
        value={state}
        onChange={handleChange}
      >
        {children}
      </Select>
    </FormControl>
  );
}

export default React.memo(SelectBox);
