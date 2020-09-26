import React, { useState } from "react";
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider,} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from "@material-ui/styles";
import {ButtonContainer } from './Buttom'
//redux set up
import { connect } from 'react-redux';
import { nextStep } from '../../../redux/actions/uiAction'
import { addShippingDate } from '../../../redux/actions/shopAction'

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#edaf07',
      }
    },
  });
function ShippingDate(props) {
  const [error, setError] = useState(" ");
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleChangeDate = () => {
      if(moment().add(0.5,'hours') <= moment(selectedDate)){
        props.addShippingDate(moment(selectedDate).format('LLL'))
        setError(" ")
        if(props.drawer){
            props.drawer();
        }
      }else{
        setError("Désolé, Entrer une date valide.") 
        console.log(error)
      }
      
  }
  
  return (
    <ThemeProvider theme={theme}>  
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
         variant='static'
         disablePast
        value={selectedDate}
        onChange={setSelectedDate}
      />
    </MuiPickersUtilsProvider>
     {error !== ' '? <div>
     <Alert severity="warning" style={{width:'100%'}}>{error}</Alert>
    </div>:null}
    <ButtonContainer style={{width:'100%'}} active onClick={()=> handleChangeDate()}>Valider</ButtonContainer>

    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
    ui : state.ui,
  });
  const mapActionsToProps = {
    nextStep,
    addShippingDate
  };
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(ShippingDate);
