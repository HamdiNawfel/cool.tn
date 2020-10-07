import React from 'react';
import moment from 'moment';
//Mui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//redux set up
import { connect } from 'react-redux';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function RecentOrder(props) {
  const classes = useStyles();

  return (
    <TableContainer >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="left">Addresse</TableCell>
            <TableCell align="right">Total (DT)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.user.orders.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {moment(row.shippingDate).format('LLL')}
              </TableCell>
              <TableCell align="left">{row.shippingAddress}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {props.user.orders.length === 0?
      <div style={{textAlign:'center', margin:'10px'}}>Aucune commande n’a encore été passée</div>:null
    }
    </TableContainer>
  
  );
}

const mapStateToProps = (state) => ({
    user: state.user
   });
  
   
   export default connect(
     mapStateToProps,
     null
   )(RecentOrder);