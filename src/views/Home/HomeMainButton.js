// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Locale from 'shared/localization';
import VBLogo from 'core/assets/vb.png';
import Progress from 'core/Progress';

type Props = {
  classes: Object,
  onClick: Function,
  requestPending: boolean,
};

const styles = {
  card: {
    margin: '5%',
    '&:hover': {
      backgroundColor: '#ebf6f9',
    },
  },
  cardAction: {
    paddingTop: 20,
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
  },
  text: {
    textAlign: 'center',
  },
  textInner: {
    fontWeight: 700,
    color: '#207EDD',
  },
};

function HomeMainButton(props: Props) {
  const { classes, onClick, requestPending } = props;
  return (
    <Card className={classes.card} onClick={onClick}>
      <CardActionArea className={classes.cardAction}>
        <CardMedia
          className={classes.media}
          image={VBLogo}
          title={Locale.createVersion}
        />
        <CardContent className={classes.text}>
          {requestPending ? (
            <React.Fragment>
              <Typography
                gutterBottom
                component="p"
                className={classes.textInner}
              >
                {Locale.creatingVersion}
              </Typography>
              <Progress />
            </React.Fragment>
          ) : (
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.textInner}
            >
              {Locale.createVersion}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(HomeMainButton);
