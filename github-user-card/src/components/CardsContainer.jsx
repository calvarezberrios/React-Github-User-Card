import React from "react";
import GithubCard from "./GithubCard";

export default function CardsContainer(props) {
    
    return (
        <div className = "cards">
            <GithubCard user = {props.user} />

            <h2>Followers: </h2>
            <div className = "follower-cards">
                

                {props.followers.map(follower => (
                <GithubCard key = {follower.id} user = {follower} />
                ))}
            </div>
        </div>
    );
}