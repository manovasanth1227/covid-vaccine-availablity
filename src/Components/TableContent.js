import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
  },
  TableHead: {
    backgroundColor: "#aa8622",
  },
  TableCell: {
    color: "white",
    fontWeight: "400",
    fontSize: "16px",
    fontFamily: "Montserrat",
  },
  Session: {
    color: "#0D9963",
    fontWeight: "300",
    fontSize: "32px",
    fontFamily: "Montserrat",
  },
  margin: {
    margin: "0 5%",
    color: "white",
  },
  heads: {
    color: "#0D9963",
  },
  name: {
    color: "#0D9963",
    fontSize: "16px",
  },
  result: {
    textAlign: "center",
    height: "4%",
    padding: "5% 5%",
    color: "#aa8622",
    backgroundColor: "white",
    fontWeight: "300",
    fontSize: "32px",
    fontFamily: "Montserrat",
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          <p className={classes.name}>{row.name}</p>
        </TableCell>
        <TableCell align="left">
          <p>{row.block_name}</p>
        </TableCell>
        <TableCell align="center">
          <p>{row.district_name}</p>
        </TableCell>
        <TableCell align="center">
          <p>{row.fee_type}</p>
        </TableCell>
        <TableCell align="center">
          <p>{row.sessions.length}</p>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            className={classes.heads}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: "20px", paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                className={classes.Session}
                variant="h6"
                gutterBottom
                component="div"
              >
                <div>Session Details</div>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className={classes.heads}>Date</p>
                    </TableCell>
                    <TableCell align="center">
                      <p className={classes.heads}>Vaccine</p>
                    </TableCell>
                    <TableCell align="center">
                      <p className={classes.heads}>Slots</p>
                    </TableCell>
                    <TableCell align="center">
                      <p className={classes.heads}>Age Limit</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sessions.map((session, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <p>{session.date}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p>{session.vaccine}</p>
                      </TableCell>
                      <TableCell align="center">
                        {session.slots.map((slot, index) => (
                          <p key={index}>{slot}</p>
                        ))}
                      </TableCell>
                      <TableCell align="center">
                        <p>{session.min_age_limit}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ rows }) {
  const classes = useRowStyles();
  const [state, setState] = useState(rows);
  const [order, setOrder] = useState("asec");
  const [orderCenter, setOrderCenter] = useState("desc");
  const centerNameHandler = () => {
    if (orderCenter === "asec") {
      setOrderCenter("desc");
      setState((preState) => {
        const temp = preState.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
        return [...temp];
      });
    } else if (orderCenter === "desc") {
      setOrderCenter("asec");
      setState((preState) => {
        const temp = preState.sort((a, b) =>
          a.name > b.name ? -1 : a.name < b.name ? 1 : 0
        );
        return [...temp];
      });
    }
  };
  const blockNameHandler = () => {
    if (order === "asec") {
      setOrder("desc");
      setState((preState) => {
        const temp = preState.sort((a, b) =>
          a.block_name < b.block_name ? -1 : a.block_name > b.block_name ? 1 : 0
        );
        return [...temp];
      });
    } else if (order === "desc") {
      setOrder("asec");
      setState((preState) => {
        const temp = preState.sort((a, b) =>
          a.block_name > b.block_name ? -1 : a.block_name < b.block_name ? 1 : 0
        );
        return [...temp];
      });
    }
  };

  useEffect(() => setState(rows), [rows]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className={classes.TableHead}>
          <TableRow>
            <TableCell
              className={classes.TableCell}
              onClick={centerNameHandler}
            >
              Center Name
              {orderCenter === "desc" && (
                <IconButton
                  aria-label="delete"
                  onClick={centerNameHandler}
                  className={classes.margin}
                  size="small"
                >
                  <ArrowDownwardIcon fontSize="inherit" />
                </IconButton>
              )}
              {orderCenter === "asec" && (
                <IconButton
                  aria-label="delete"
                  onClick={centerNameHandler}
                  className={classes.margin}
                  size="small"
                >
                  <ArrowUpwardIcon fontSize="inherit" />
                </IconButton>
              )}
            </TableCell>
            <TableCell className={classes.TableCell} align="left">
              Block Name
              {order === "desc" && (
                <IconButton
                  aria-label="delete"
                  onClick={blockNameHandler}
                  className={classes.margin}
                  size="small"
                >
                  <ArrowDownwardIcon fontSize="inherit" />
                </IconButton>
              )}
              {order === "asec" && (
                <IconButton
                  aria-label="delete"
                  onClick={blockNameHandler}
                  className={classes.margin}
                  size="small"
                >
                  <ArrowUpwardIcon fontSize="inherit" />
                </IconButton>
              )}
            </TableCell>
            <TableCell className={classes.TableCell} align="center">
              District Name
            </TableCell>
            <TableCell className={classes.TableCell} align="center">
              Fee Type
            </TableCell>
            <TableCell className={classes.TableCell} align="center">
              Available Sessions
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
