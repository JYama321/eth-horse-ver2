import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {horseInfoPageStyles} from "../../containers/Info-horse/styles";
import { horseToOnSale } from '../../utils/eth-function'
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});
function SellHorseButton (props) {
  const { classes } = props;
  return (
      <Button
          variant="raised"
          size='medium'
          color='primary'
          style={horseInfoPageStyles.sellButton}
          className={classes.button}
          onClick={horseToOnSale()}
      >
        SellHorse
      </Button>
  );
}

SellHorseButton.propTypes={
  classes: PropTypes.object.isRequired,
  horseId: PropTypes.number.isRequired
};

export default withStyles(styles)(SellHorseButton)
