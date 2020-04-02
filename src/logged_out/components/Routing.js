import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import Level from "./level/Level";
import LevelPost from "./level/LevelPost";

function Routing(props) {
  const { levelPosts, selectLevel } = props;

  return (
    <Switch>
      {levelPosts.map(post => (
        <PropsRoute
          /* We cannot use the url here as it contains the get params */
          path={post.url}
          component={LevelPost}
          title={post.title}
          key={post.title}
          src={post.imageSrc}
          date={post.date}
          content={post.content}
          otherArticles={levelPosts.filter(
            levelPost => levelPost.id !== post.id
          )}
        />
      ))}
      <PropsRoute
        exact
        path="/level"
        component={Level}
        selectLevel={selectLevel}
        levelPosts={levelPosts}
      />
      )
      <PropsRoute path="/" component={Level} selectLevel={selectLevel} />)
    </Switch>
  );
}

Routing.propTypes = {
  levelposts: PropTypes.arrayOf(PropTypes.object),
  selectHome: PropTypes.func.isRequired,
  selectLevel: PropTypes.func.isRequired
};

export default Routing;
