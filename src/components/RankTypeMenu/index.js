import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class RankTypeMenu extends React.Component {
  state = {
    open: false,
  };


  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
        <form autoComplete="off">
          <Button className={classes.button} onClick={this.handleOpen}>
            Open the select
          </Button>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="controlled-open-select">RankType</InputLabel>
            <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.props.value}
                onChange={this.props.handleChange}
                inputProps={{
                  name: 'type',
                  id: 'controlled-open-select',
                }}
            >
              <MenuItem value='gene'>Strength</MenuItem>
              <MenuItem value='prize'>TotalPrize</MenuItem>
              <MenuItem value='winCount'>WinCount</MenuItem>
            </Select>
          </FormControl>
        </form>
    );
  }
}

RankTypeMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RankTypeMenu);
