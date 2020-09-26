import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2020-08-18T06:00:00'));
    // const handleDateChange = (date) => {
    //   setSelectedDate(date);
    //   console.log(selectedDate)
    // };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disablePast
          autoOk
          
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="dd/MM/yyyy"
          value={props.selectedDate}
          onChange={props.handleDateChange}
        //   onClose={props.handleSubmitDate}
          
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
         autoOk
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={props.selectedDate}
          onChange={props.handleDateChange}
        //   onClose={props.handleSubmitDate}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
      
    </MuiPickersUtilsProvider>
  );
}
