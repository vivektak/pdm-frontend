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
import styled from 'styled-components'
import axios from 'axios'
import FileBase64 from 'react-file-base64';

const CreateInstanceStyle = styled.div`
    .MuiTextField-root .MuiInputBase-formControl {
        height: 40px;
    }
`


const Create = () => {
    const history = useHistory()

    const REFINERYDATA = [
        {name:'Refinery 1', lat: 123.12, long:32.213},
        {name:'Refinery 2', lat: 123.12, long:32.213},
        {name:'Refinery 3', lat: 123.12, long:32.213},
        {name:'Refinery 4', lat: 123.12, long:32.213},
        {name:'Refinery 5', lat: 123.12, long:32.213},
        {name:'Refinery 6', lat: 123.12, long:32.213},
    ]

    const [instanceName, setInstanceName] = useState("")
    const [uploadedFile, setUploadedFile] = useState("")
    const [refineryDetails, setRefineryDetails] = useState(REFINERYDATA)

    

    const handleInstanceChange = (value) => {
        setInstanceName(value)
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setUploadedFile(reader.result)
        };
      }
      
      

    const resetFields = () => {
        setInstanceName("")
        setRefineryDetails(REFINERYDATA)
        setUploadedFile("")
    }   
   
    const handleSubmit = (event) => {
        event.preventDefault();
        const instance = {
            name: instanceName,
            image: uploadedFile,
            refinery: refineryDetails,
            createdBy: "Vivek",
        }
        axios.post('http://localhost:5000/api/create-instance', instance)
        .then((res) => {
            resetFields()
        })
        .catch(() => {
          alert('Something went wrong! Please try again!')
        })
    }

    const handleRefineryDetails = (index, name, value ) => {
        const refineryDetailsObj = [...refineryDetails]
        refineryDetailsObj[index][name] = value
        setRefineryDetails(refineryDetailsObj)
    }

    return (
        <CreateInstanceStyle>
            <Grid container spacing={0} justify="center" direction="row" >
                <Grid item style={{width:'800px', height:'400px'}}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className="login-form"
                    >
                        
                    <Paper
                        variant="elevation"
                        className="login-background"
                    >
                        <Grid item style={{marginTop: '-30px'}}>
                            <Typography component="h1" variant="h5">
                                 Create Instance
                            </Typography>
                        </Grid>
                        <Grid item style={{marginTop: '30px'}}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Grid container direction="column" spacing={2}>
                                <div style={{display:'flex'}}>
                                <Grid item>
                                    <TextField
                                        type="string"
                                        placeholder="Instance Name"
                                        name="instance"
                                        variant="outlined"
                                        value={instanceName}
                                        onChange={(e) => handleInstanceChange(e.target.value)}
                                        required
                                        autoFocus
                                        style={{width: '460px', marginRight: "72px", height:'0px'}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" component="label" style={{width:'192px', height:'40px'}}>
                                        Upload Logo
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => handleImageChange(e)}
                                        />
                                    </Button>
                                </Grid>
                                </div>
                                
                                <Grid item>
                                {refineryDetails.map((item, index) => (
                                    <div style={{display: 'flex'}}>
                                    
                                    <Grid item>
                                        <TextField
                                            type="string"
                                            placeholder="Refinery Name"
                                            name="name"
                                            variant="outlined"
                                            value={item.name}
                                            onChange={(e) => handleRefineryDetails(index, 'name' ,e.target.value)}
                                            required
                                            style={{marginTop: '20px'}}
                                        />
                                        </Grid>
                                        <Grid item>
                                        <TextField
                                            type="string"
                                            placeholder="Latitude"
                                            name="lat"
                                            variant="outlined"
                                            value={item.lat}
                                            onChange={(e) => handleRefineryDetails(index, 'lat' ,e.target.value)}
                                            required
                                            style={{marginLeft:'70px', marginTop: '20px'}}
                                        />
                                        </Grid>
                                        <Grid item>
                                        <TextField
                                            type="string"
                                            placeholder="Longitude"
                                            name="long"
                                            variant="outlined"
                                            value={item.long}
                                            onChange={(e) => handleRefineryDetails(index, 'long', e.target.value)}
                                            required
                                            style={{marginLeft:'70px', marginTop: '20px'}}
                                        />
                                        </Grid>
                                    </div>
                                )) }
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className="button-block"
                                        style={{width:'200px', height:'40px', marginTop: '20px'}}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </Grid>
    </CreateInstanceStyle>
);

}
export default Create;