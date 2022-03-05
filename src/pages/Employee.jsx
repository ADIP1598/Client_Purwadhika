import '../App.css';
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { Table, Card, InputGroup, FormControl, Form, Spinner, Button } from 'react-bootstrap'
import Axios from 'axios';

const Employee = () => {
    const userGlobal = useSelector(state => state.user)
    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState(0)
    const [position, setPosition] = useState("-")

    const [usernameFilter, setUsernameFilter] = useState("")
    const [positionFilter, setPositionFilter] = useState("")

    const [editToggle, setEditToggle] = useState(null)
    const [editUsername, setEditUsername] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [editPassword, setEditPassword] = useState("")
    const [editStatus, setEditStatus] = useState("")
    const [editAge, setEditAge] = useState(0)
    const [editPosition, setEditPosition] = useState("")

    const [loading, setLoading] = useState(false)

    const [sort, setSort] = useState("•")

    const fetchEmployees = () => {
        Axios.get(`http://localhost:4400/user`)
            .then((result) => {
                setEmployees(result.data)
                setFilteredEmployees(result.data)
            })
            .catch(() => {
                alert("Something wrong in the Server")
            })
    }

    const addEmployee = () => {
        if (username && email && password) {
            setLoading(true)
            Axios.post(`http://localhost:4400/user/add`, {
                "username": username,
                "email": email,
                "password": password,
                "status": "unverified",
                "age": parseInt(age),
                "position": position,
            })
                .then((result) => {
                    console.log(result)
                    if (result.data.isExist) {
                        alert(result.data.message)
                    } else {
                        fetchEmployees()
                    }
                    setLoading(false)
                })
                .catch(() => {
                    alert("Something wrong in the Server")
                    setLoading(false)
                })
        } else {
            alert("Please insert All data!")
        }
    }

    const deleteEmployee = (idEmployee) => {
        Axios.delete(`http://localhost:4400/user/delete/${idEmployee}`)
            .then((result) => {
                console.log(result.data)
                fetchEmployees()
            })
            .catch(() => {
                alert("Something wrong in the Server")
            })
    }

    const editEmployee = (idEmployee) => {
        Axios.patch(`http://localhost:4400/user/edit/${idEmployee}`, {
            "username": editUsername,
            "email": editEmail,
            "password": editPassword,
            "status": editStatus,
            "age": parseInt(editAge),
            "position": editPosition,
        })
            .then((result) => {
                fetchEmployees()
            })
            .catch(() => {
                alert("Something wrong in the Server")
            })
        setEditUsername("")
        setEditEmail("")
        setEditPassword("")
        setEditStatus("")
        setEditAge(0)
        setEditPosition("")
        setEditToggle(null)
    }

    const onEditToggle = (dataEmployee) => {
        setEditUsername(dataEmployee.username)
        setEditEmail(dataEmployee.email)
        setEditPassword(dataEmployee.password)
        setEditStatus(dataEmployee.status)
        setEditAge(dataEmployee.age)
        setEditPosition(dataEmployee.position)
        setEditToggle(dataEmployee._id)
    }

    const renderEmployees = () => {
        let sortedEmployees = [...filteredEmployees]
        if (sort === "∧") {
            sortedEmployees.sort(function (a, b) { return a.age - b.age })
        }
        if (sort === "∨") {
            sortedEmployees.sort(function (a, b) { return b.age - a.age })
        }
        if (sort === "•") {
            sortedEmployees = [...filteredEmployees]
        }
        console.log(sortedEmployees, employees)
        return sortedEmployees.map((employee, index) => {
            if (editToggle === employee._id) {
                return (
                    <tr>
                        <td>{employee._id}</td>
                        <td><input value={editUsername} onChange={(e) => setEditUsername(e.target.value)} type="text" className='form-control' name='editName' /></td>
                        <td><input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} type="text" className='form-control' name='editEmail' /></td>
                        <td><input value={editPassword} onChange={(e) => setEditPassword(e.target.value)} type="text" className='form-control' name='editPassword' /></td>
                        <td>
                            <Form.Select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} name="editStatus">
                                <option value="">Choose Status</option>
                                <option value="unverified">unverified</option>
                                <option value="verified">verified</option>
                            </Form.Select>
                        </td>
                        <td><input value={editAge} onChange={(e) => setEditAge(e.target.value)} type="number" className='form-control' name='editName' /></td>
                        <td>
                            <Form.Select value={editPosition} onChange={(e) => setEditPosition(e.target.value)} name="editPosition">
                                <option value="-">Choose Position</option>
                                <option value="CEO">CEO</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Moderator">Moderator</option>
                                <option value="Helper">Helper</option>
                            </Form.Select>
                        </td>
                        <td>
                            <button onClick={() => editEmployee(employee._id)} className='btn btn-warning'>Save</button>
                        </td>
                        <td>
                            <button onClick={() => setEditToggle(null)} className='btn btn-danger'>Cancel</button>
                        </td>
                    </tr>
                )
            }
            return (
                <tr key={index}>
                    <td>{employee._id}</td>
                    <td>{employee.username}</td>
                    <td>{employee.email}</td>
                    <td>{employee.password}</td>
                    <td>{employee.status}</td>
                    <td>{employee.age}</td>
                    <td>{employee.position}</td>
                    <td>
                        <button onClick={() => onEditToggle(employee)} className='btn btn-warning'>Edit</button>
                    </td>
                    <td>
                        <button onClick={() => deleteEmployee(employee._id)} className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    const onSort = () => {
        if (sort === "•") {
            setSort("∧")
        } else if (sort === "∧") {
            setSort("∨")
        } else if (sort === "∨") {
            setSort("•")
        }
    }

    const filterByUsername = () => {
        const filteredEmployees = employees.filter((employee) => {
            return employee.username.toLowerCase().includes(usernameFilter.toLowerCase()) && employee.position.toLowerCase().includes(positionFilter.toLowerCase())
        })
        setFilteredEmployees(filteredEmployees)
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    useEffect(() => {
        filterByUsername()
    }, [usernameFilter, positionFilter])

    return (
        <div className='container-xxl mt-5 text-center'>
            <div className='row'>
                <h1> Front End Tester </h1>
                <div className='col-12'>
                    <Card className=''>
                        <Card.Header bg="dark">
                            Filter Employee {userGlobal.username}
                        </Card.Header>
                        <Card.Body>
                            <InputGroup onChange={(e) => setUsernameFilter(e.target.value)}>
                                <InputGroup.Text>Username</InputGroup.Text>
                                <FormControl aria-label="Filter" />
                            </InputGroup>
                            <Form.Select onChange={(e) => setPositionFilter(e.target.value)} className='mt-3'>
                                <option value="">All</option>
                                <option value="ceo">CEO</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="moderator">Moderator</option>
                                <option value="helper">Helper</option>
                            </Form.Select>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-12 mt-3'>
                    <Table variant="dark" striped bordered hover>
                        <thead>
                            <tr className="align-middle">
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Status</th>
                                <th>
                                    Age <Button className='btn btn-dark' onClick={onSort}>{sort}</Button>
                                </th>
                                <th>Position</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderEmployees()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>ID</td>
                                <td><input onChange={(e) => setUsername(e.target.value)} type="text" className='form-control' placeholder="Username" /></td>
                                <td><input onChange={(e) => setEmail(e.target.value)} type="text" className='form-control' placeholder="Email" /></td>
                                <td><input onChange={(e) => setPassword(e.target.value)} type="text" className='form-control' placeholder="Password" /></td>
                                <td>Status</td>
                                <td><input onChange={(e) => setAge(e.target.value)} type="number" className='form-control' placeholder="Age" /></td>
                                <td>
                                    <select onChange={(e) => setPosition(e.target.value)} className='form-control'>
                                        <option value="-">Choose Position</option>
                                        <option value="CEO">CEO</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Designer">Designer</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Helper">Helper</option>
                                    </select>
                                </td>
                                <td colSpan="2">
                                    {
                                        (loading) ?
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                            :
                                            <button onClick={addEmployee} className='btn btn-success'>Submit</button>
                                    }
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                </div>
            </div>
            <div className='mt-5'>
            </div>
        </div >
    )
}

export default Employee;