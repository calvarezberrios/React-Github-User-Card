import React, { Component } from 'react';
import axios from "axios";
import NavBar from "./components/NavBar";
import CardsContainer from "./components/CardsContainer";

export default class App extends Component {
  state = {
    githubUser: {
      data: {},
      followers: []
    },
    curUserLogin: "calvarezberrios"
  }

  handleChanges = e => {
    this.setState({
      curUserLogin: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    if(this.state.curUserLogin) this.getUserData(this.state.curUserLogin);
  }

  getUserData(login) {

    axios.get(`https://api.github.com/users/${login}`, {headers: {authorization: "token ba9e0f9615cbead78f989239f17ee24912efaec3"}})
      .then(res => {
        
          console.log("cea: App.js: App: CDM: fetch res ", res);
          this.setState({
            githubUser: {
              ...this.state.githubUser,
              data: res.data,
              followers: []
            },
          });
          
          axios.get(res.data.followers_url, {headers: {authorization: "token ba9e0f9615cbead78f989239f17ee24912efaec3"}})
            .then(followers => {
              followers.data.forEach(follower => {
                axios.get(follower.url, {headers: {authorization: "token ba9e0f9615cbead78f989239f17ee24912efaec3"}})
                .then(res => {
                  console.log("cea: App.js: App: CDM: fetch followers data ", res.data);
                  this.setState({
                    githubUser: {
                      ...this.state.githubUser,
                      followers: [
                        ...this.state.githubUser.followers,
                        res.data
                      ]
                    }
                  })
                })
                .catch(err => console.log("cea: App.js: App: CDM: fetch followers error", err.message));
              })
            })
            .catch(err => console.log("cea: App.js: App: CDM: fetch followers error", err.message));
      
      })
      .catch(err => {
        console.error("cea: App.js: App: CDM: fetch user error ", err.message);
      })
  }


  componentDidMount() {
    this.getUserData(this.state.curUserLogin);
  }

  render() {
    return (
      <div className = "App">
        <NavBar user = {this.state.curUserLogin} handleChanges = {this.handleChanges} handleSubmit = {this.handleSubmit} />
        {
          this.state.githubUser.data.id ?
          <CardsContainer user = {this.state.githubUser.data} followers = {this.state.githubUser.followers} /> :
          null
        }
      </div>
    );
  }
}
