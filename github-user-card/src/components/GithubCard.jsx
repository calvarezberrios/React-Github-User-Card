import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const GithubCard = ({ user }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src = {user.avatar_url} alt = "A" width = "100%" />
                    </Avatar>
                }
                
                title={user.name}
                subheader={`${user.login} ${user.location ? "- " + user.location : ""}`}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Profile: <a href = {user.html_url} target = "_blank" rel = "noopener noreferrer">{user.html_url}</a><br />
                    Followers: {user.followers}<br />
                    Following: {user.following}<br />
                    Bio: {user.bio}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default GithubCard;