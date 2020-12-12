import React, { FC } from "react";
import {
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import { Consumer } from "../../store/consumer/consumer.types";

type Props = {
  items: Consumer[];
  onClickItem: (item: Consumer) => void;
};

const useStyles = makeStyles({
  clickable: {
    textDecoration: "underline dotted",
    "&:hover": {
      cursor: "pointer",
      color: blue[300],
    },
  },
});

const ConsumerList: FC<Props> = ({ items, onClickItem }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} style={{ marginTop: "40px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Date of first purchase</TableCell>
            <TableCell>Total budget</TableCell>
            <TableCell>Budget spent</TableCell>
            <TableCell>Budget left</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow hover key={item.id}>
              <TableCell
                className={classes.clickable}
                onClick={() => onClickItem(item)}
              >
                {item.name}
              </TableCell>
              <TableCell>{item.date_of_first_purchase}</TableCell>
              <TableCell>{item.budget}</TableCell>
              <TableCell>{item.budget_spent}</TableCell>
              <TableCell>{item.budget - item.budget_spent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ConsumerList;
