import React, { Component } from 'react';
import GithubCard from "./components/GithubCard";

export default class App extends Component {
  state = {
    githubUser: {
      data: {},
      followers: []
    },
    curUserLogin: "calvarezberrios"
  }

  

  getUserData(login) {
    fetch(`https://api.github.com/users/${login}`)
      .then(res => res.json())
      .then(res => {
        
        if (res.message === "Not Found") {
          console.error("cea: App.js: App: CDM: fetch error ", res.message);
        } else {
          console.log("cea: App.js: App: CDM: fetch res ", res);
          this.setState({
            githubUser: {
              ...this.state.githubUser,
              data: res
            }
          });
          
          fetch(res.followers_url)
            .then(res => res.json())
            .then(followers => {
              followers.forEach(follower => {
                fetch(follower.url)
                .then(res => res.json())
                .then(res => {
                  console.log("cea: App.js: App: CDM: fetch followers data ", res);
                  this.setState({
                    githubUser: {
                      ...this.state.githubUser,
                      followers: [
                        ...this.state.githubUser.followers,
                        res
                      ]
                    }
                  })
                })
                .catch(err => console.log("cea: App.js: App: CDM: fetch followers ", err.message));
              })
            })
            .catch(err => console.log("cea: App.js: App: CDM: fetch followers ", err.message));
        }
      })
      .catch(err => {
        console.error("cea: App.js: App: CDM: fetch error ", err.message);
      })
  }


  componentDidMount() {
    this.getUserData(this.state.curUserLogin);
  }

  render() {
    return (
      <div className = "App">
        <h1>Github User Card</h1>

        <GithubCard user = {this.state.githubUser.data} />

        <h2>Followers: </h2>

        {this.state.githubUser.followers.map(follower => (
          <GithubCard key = {follower.id} user = {follower} />
        ))}
      </div>
    );
  }
}
