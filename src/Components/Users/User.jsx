import React, { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import Repos from "../Repos/Repos";
const User = ({
  getUserRepos,
  get_user,
  repos,
  user_details,
  loading,
  match,
}) => {
  useEffect(() => {
    get_user(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);
  const {
    login,
    avatar_url,
    html_url,
    name,
    company,
    blog,
    hireable,
    followers,
    following,
    bio,
    location,
    public_repos,
    public_gists,
  } = user_details;
  if (loading) return <Spinner />;
  return (
    <React.Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt="Loading..."
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location : {location}</p>
        </div>
        <div>
          {bio && (
            <React.Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </React.Fragment>
          )}
          <a href={html_url} className="btn btn-dark mu-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <React.Fragment>
                  <strong>Login: </strong>
                  {login}
                </React.Fragment>
              )}
            </li>
            <li>
              {company && (
                <React.Fragment>
                  <strong>Company: </strong>
                  {company}
                </React.Fragment>
              )}
            </li>
            <li>
              {blog && (
                <React.Fragment>
                  <strong>Website: </strong>
                  {blog}
                </React.Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </React.Fragment>
  );
};

export default User;
