import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MyPageHorses from '../../containers/MyPage-horses'
import Ranking from '../../containers/Ranking'

function TabContainer(props) {
  return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons='auto'>
              <Tab label="Top" />
              <Tab label="MyHorses" href='#my-horses'/>
              <Tab label="MyRaces" href='#my-races'/>
              <Tab label="Activities" href='#activities'/>
              <Tab label="Market" href='#market'/>
              <Tab label="Races" href='#races' />
              <Tab label="Ranking" href='#ranking' />
            </Tabs>
          </AppBar>
          {value === 0 &&
          <TabContainer>
            Top
          </TabContainer>}
          {value === 1 &&
          <TabContainer>
            <MyPageHorses/>
          </TabContainer>}
          {value === 2 &&
            <TabContainer>
              MyRaces
            </TabContainer>}
          {value === 3 &&
          <TabContainer>
            Activities
          </TabContainer>}
          {value === 4 &&
          <TabContainer>
            Market
          </TabContainer>}
          {value === 5 &&
          <TabContainer>
            Races
          </TabContainer>}
          {value === 6 &&
          <TabContainer>
            <Ranking/>
          </TabContainer>}
        </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
