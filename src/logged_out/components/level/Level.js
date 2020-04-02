import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box, isWidthUp, withWidth, withStyles } from "@material-ui/core";
import LevelCard from "./LevelCard";

const styles = theme => ({
  levelContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4)
    },
    maxWidth: 1280,
    width: "100%"
  },
  wrapper: {
    minHeight: "60vh"
  },
  noDecoration: {
    textDecoration: "none !important"
  }
});

class Level extends PureComponent {
  componentDidMount() {
    const { selectLevel } = this.props;
    selectLevel();
  }

  getVerticalLevelposts = () => {
    const { width, levelPosts } = this.props;
    const gridRows = [[], [], []];
    let rows;
    let xs;
    if (isWidthUp("md", width)) {
      rows = 3;
      xs = 4;
    } else if (isWidthUp("sm", width)) {
      rows = 2;
      xs = 6;
    } else {
      rows = 1;
      xs = 12;
    }
    if (levelPosts) {
      levelPosts.forEach((levelPost, index) => {
        gridRows[index % rows].push(
          <Grid key={levelPost.id} item xs={12}>
            <Box mb={3}>
              <LevelCard
                src={levelPost.imageSrc}
                title={levelPost.title}
                snippet={levelPost.snippet}
                date={levelPost.date}
                url={levelPost.url}
              />
            </Box>
          </Grid>
        );
      });
    }
    return gridRows.map((element, index) => (
      <Grid key={index} item xs={xs}>
        {element}
      </Grid>
    ));
  };

  render() {
    const { classes } = this.props;
    return (
      <Box
        display="flex"
        justifyContent="center"
        className={classNames(classes.wrapper, "lg-p-top")}
      >
        <div className={classes.levelContentWrapper}>
          <Grid container spacing={3}>
            {this.getVerticalLevelposts()}
          </Grid>
        </div>
      </Box>
    );
  }
}

Level.propTypes = {
  selectLevel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  levelposts: PropTypes.arrayOf(PropTypes.object)
};

export default withWidth()(withStyles(styles, { withTheme: true })(Level));
