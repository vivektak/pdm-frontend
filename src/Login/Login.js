import React, {useState}  from "react";
import {
Button,
TextField,
Grid,
Paper,
AppBar,
Typography,
Toolbar,
Link,
} from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import './Login.css'

const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (value) => {
        setUsername(value)
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username == 'admin@littech.in' && password == 'secret') {
            history.push("/dashboard");
        } else {
            alert('Incorrect Credentials!');
        }
    }

    return (
        <div>
            <AppBar position="static" alignitems="center" color="primary">
                <Toolbar>
                    <Grid container justify="center" wrap="wrap">
                        <Grid item>
                            {/* <Typography variant="h6"></Typography> */}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className="login-form"
                    >
                    <Paper
                        variant="elevation"
                        elevation={2}
                        className="login-background"
                    >
                        <Grid item>
                            <Typography component="h1" variant="h5" style={{marginTop: '-30px'}}>
                                Sign in
                            </Typography>
                        </Grid>
                        <Grid item style={{marginTop: '30px'}}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        type="email"
                                        placeholder="Email"
                                        fullWidth
                                        name="username"
                                        variant="outlined"
                                        value={username}
                                        onChange={(e) => handleUsernameChange(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        type="password"
                                        placeholder="Password"
                                        fullWidth
                                        name="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className="button-block"
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            Forgot Password?
                        </Link>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </Grid>
</div>
);

}
export default Login;