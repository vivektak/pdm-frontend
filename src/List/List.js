import React, {useState, useEffect
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '20px 5%'
  },
  container: {
    maxHeight: 540,
  },
})

const List = () => {

  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [instanceList, setInstanceList] = useState([])
  

  const getInstanceList = () => {
        axios.get('http://localhost:5000/api/instances')
        .then((res) => {
            setInstanceList(res.data.data)
        })
        .catch(() => {
        alert('Something went wrong! Please try again!')
        })
    }

    useEffect(() => {
        getInstanceList()
    }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleDelete =(column) => {
    axios.delete(`http://localhost:5000/api/instances/${column._id}`)
    .then((res) => {
        getInstanceList()
    })
    .catch(() => {
      alert('Something went wrong! Please try again!')
    })
  }

  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
  }


  const CollapseRow = (props) =>{
    const { row } = props;
    const [open, setOpen] = useState(false);
    
    return (
        <React.Fragment>
        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell key={row.id} align="left">
                            {row.name}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                            {row.createdBy}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                            {formatDate(row.createdDate)}
                        </TableCell>
                        <TableCell key={row.id} align="left">
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(row)}>DELETE</Button>
                        </TableCell>
                    </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
            <Typography variant="h6" gutterBottom component="div">
                Refinery Detail
            </Typography>
            <Table size="small" aria-label="purchases">
                <TableHead>
                <TableRow>
                    <TableCell>Refinery Name</TableCell>
                    <TableCell>Latitude</TableCell>
                    <TableCell align="right">Longitude</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {row.refinery.map((item) => (
                    <TableRow key={item.name}>
                        <TableCell component="th" scope="row">
                            {item.name}
                        </TableCell>
                        <TableCell>{item.lat}</TableCell>
                        <TableCell align="right">{item.long}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </Box>
        </Collapse>
        </TableCell>
    </TableRow>
    </React.Fragment>
    );
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell
                  key="arrow"
                  align="left"
                  style={{ minWidth: 20 }}
                >
                  
                </TableCell>
                <TableCell
                  key="instance name"
                  align="left"
                  style={{ minWidth: 170 }}
                >
                  Instance Name
                </TableCell>
                <TableCell
                  key="refinery name"
                  align="left"
                  style={{ minWidth: 170 }}
                >
                  Created By
                </TableCell>
                <TableCell
                  key="refinery name"
                  align="left"
                  style={{ minWidth: 170 }}
                >
                  Created On
                </TableCell>
                <TableCell
                  key="action"
                  align="left"
                  style={{ minWidth: 170 }}
                >
                  Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instanceList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                    <>
                        <CollapseRow key={row.name} row={row} />
                    </>
                )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={instanceList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default List