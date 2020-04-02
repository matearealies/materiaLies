import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";
import "aos/dist/aos.css";
import CookieRulesDialog from "./cookies/CookieRulesDialog";
import CookieConsent from "./cookies/CookieConsent";
import dummyLevelPosts from "../dummy_data/levelPosts";
import DialogSelector from "./register_login/DialogSelector";
import Routing from "./Routing";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";

AOS.init({ once: true });

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden"
  }
});

class Main extends PureComponent {
  state = {
    selectedTab: null,
    mobileDrawerOpen: false,
    levelPosts: [],
    dialogOpen: null,
    cookieRulesDialogOpen: false
  };

  levelPostsMaxUnix = Math.round(new Date().getTime() / 1000);

  componentDidMount() {
    this.fetchLevelPosts();
  }

  // selectHome = () => {
  //   smoothScrollTop();
  //   document.title =
  //     "WaVer - Free template for building an SaaS or admin application";
  //   this.setState({ selectedTab: "Home" });
  // };

  selectLevel = () => {
    smoothScrollTop();
    document.title = "WaVer - Level";
    this.setState({ selectedTab: "Level" });
  };

  openLoginDialog = () => {
    this.setState({ dialogOpen: "login", mobileDrawerOpen: false });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: null });
  };

  openRegisterDialog = () => {
    this.setState({
      dialogOpen: "register",
      mobileDrawerOpen: false
    });
  };

  openTermsDialog = () => {
    this.setState({ dialogOpen: "termsOfService" });
  };

  handleMobileDrawerOpen = () => {
    this.setState({ mobileDrawerOpen: true });
  };

  handleMobileDrawerClose = () => {
    this.setState({ mobileDrawerOpen: false });
  };

  switchSelectedTab = tab => {
    this.setState({ selectedTab: tab });
  };

  openChangePasswordDialog = () => {
    this.setState({ dialogOpen: "changePassword" });
  };

  fetchLevelPosts = () => {
    /**
     * You would fetch this from the server, however we gonna use the example values from state here
     */
    this.levelPostsMaxUnix = dummyLevelPosts[dummyLevelPosts.length - 1].date;
    const levelPosts = dummyLevelPosts.map(levelPost => {
      let title = levelPost.title;
      title = title.toLowerCase();
      /* Remove unwanted characters, only accept alphanumeric and space */
      title = title.replace(/[^A-Za-z0-9 ]/g, "");
      /* Replace multi spaces with a single space */
      title = title.replace(/\s{2,}/g, " ");
      /* Replace space with a '-' symbol */
      title = title.replace(/\s/g, "-");
      levelPost.url = `/level/post/${title}`;
      levelPost.params = `?id=${levelPost.id}`;
      return levelPost;
    });
    this.setState({
      levelPosts
    });
  };

  handleCookieRulesDialogOpen = () => {
    this.setState({ cookieRulesDialogOpen: true });
  };

  handleCookieRulesDialogClose = () => {
    this.setState({ cookieRulesDialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    const {
      selectedTab,
      mobileDrawerOpen,
      levelPosts,
      dialogOpen,
      cookieRulesDialogOpen
    } = this.state;
    return (
      <div className={classes.wrapper}>
        {!cookieRulesDialogOpen && (
          <CookieConsent
            handleCookieRulesDialogOpen={this.handleCookieRulesDialogOpen}
          />
        )}
        <DialogSelector
          openLoginDialog={this.openLoginDialog}
          dialogOpen={dialogOpen}
          onClose={this.closeDialog}
          openTermsDialog={this.openTermsDialog}
          openRegisterDialog={this.openRegisterDialog}
          openChangePasswordDialog={this.openChangePasswordDialog}
        />
        <CookieRulesDialog
          open={cookieRulesDialogOpen}
          onClose={this.handleCookieRulesDialogClose}
        />
        <NavBar
          selectedTab={selectedTab}
          selectTab={this.selectTab}
          openLoginDialog={this.openLoginDialog}
          openRegisterDialog={this.openRegisterDialog}
          mobileDrawerOpen={mobileDrawerOpen}
          handleMobileDrawerOpen={this.handleMobileDrawerOpen}
          handleMobileDrawerClose={this.handleMobileDrawerClose}
        />
        <Routing levelPosts={levelPosts} selectLevel={this.selectLevel} />
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
