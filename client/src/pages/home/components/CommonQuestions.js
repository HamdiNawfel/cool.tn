import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionActions'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//Compoents
import Title from '../../../utils/Title'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    textAlign:'center',
    margin:'0 auto'
  },
  margin: {
   marginTop:'80px'
  },
  explanation:{
    textAlign:'center',
    margin:'0 auto',
    paddingBottom:10,
    [theme.breakpoints.down('md')]: {
      textAlign:'start',
      margin:10
    },
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    height:50,
    textAlign:'center',
    paddingTop:10,
    margin:'0 auto',
    [theme.breakpoints.down('md')]: {
      textAlign:'start',
     
    },
  },
}));

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
        <Title title="FAQs" />
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={1} className={classes.margin}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
         
        >
          <Typography className={classes.secondaryHeading}>How long do the meals last?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.explanation}>
          You won't find any artificial or chemical preservatives here so all of our freshly-prepared
           meals have a refrigerated shelf life of about 4-5 days.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} elevation={1}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.secondaryHeading}>
          How does shipping work?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.explanation}>
          To help guarantee your meals arrive in the freshest condition,
          there is a small shipping fee associated with your order.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} elevation={1}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.secondaryHeading}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.explanation}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}elevation={1}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.secondaryHeading}>How long do the meals last?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.explanation}>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}