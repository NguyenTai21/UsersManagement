import axios from 'axios'
import React, { useEffect, useState } from 'react'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { Modal, Button, Form } from 'react-bootstrap';



  


// const editusers = async ()=>{
//   const data =  await axios.put('http://localhost:8080/api/edit').then(response =>{
//   setUsers(response.data)
//    })
// }

const  User=()=>{
const[users, setUsers] = useState([])
const [showModal, setShowModal] = useState(false)
const [editModal, setEditModal] = useState(false)
const [formData, setFormData]= useState({id:'', name:'',email:'',role:false});

const loadUsers = async ()=>{
  await axios.get('http://localhost:8080/api/all').then(response =>{
  setUsers(response.data)
  
  })
}
const handleDelete = async(id)=>{
  console.log(id);
  await axios.delete(`http://localhost:8080/api/delete/${id}`);
  
   setShowModal(false);
   loadUsers();

}
useEffect(()=>{
  loadUsers();

},[]);


const columns = [
    {dataField: "id", text: "User ID"},
    {dataField: "name", text: "User Name"},
    {dataField: "email", text: "User Email"},
    {dataField: "role", text: "Admin",formatter: (cell)=> (cell? "Admin":"User")},
    {dataField: "actions", text:"Actions", formatter:(cell,row)=>(
      <>
      <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(row.id)}>Delete</button>
      </>
    ),
   headerStyle: () => {
      return { width: '100px', textAlign: 'center' };
    },
    align: 'center',
  },
  ]
 

const handleRowClick =(row) => {
  setEditModal(true);
  setFormData({
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.active
  });
  setShowModal(true);
} 
const handleAddClick= ()=>{
  setEditModal(false);
  setFormData({id:'', name:'',email:'',role:false});
  setShowModal(true);
}

  const handleSave=  async ()=>{
    try{
    if(editModal){
      await axios.put(`http://localhost:8080/api/edit/${formData.id}`,formData);
    }else{
      console.log(formData);
      await axios.post('http://localhost:8080/api/addUser',formData,{
        headers:{"Content-Type": "application/json"}
      });
    }
    setShowModal(false);
    loadUsers();
  }
    catch(error){
      console.log("save failed",error);
    }
  }
  return (
    <div className='App'>
     <br />
     <br />
     <br />
     
     <h3>User Data</h3>
     <br />
    <Button variant="primary" onClick={handleAddClick}>
    Add New User
    </Button>

      <BootstrapTable
      keyField='id'
      data={users}
      columns={columns}
      pagination={paginationFactory()}
      rowEvents={{
        onClick: (e,row)=> handleRowClick(row)
      }}
      bordered={false}
      hover
      />

 <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editModal ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="number"
                value={formData.id}
                onChange={e => setFormData({ ...formData, id: Number(e.target.value) })}
              />
            </Form.Group>
             <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Role</Form.Label>
              <Form.Check
                type="checkbox"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
          
        </Modal.Footer>
      </Modal>

      {/* 
       <button onClick={addUser} className='btn btn-outline-primary position-absolute top-1 start-0'>Add</button>
    
      <table class="table table-striped">
      <thead>
        <th scope='col'> User ID</th>
        <th scope='col'> User Name</th>
        <th scope='col'> Email</th>
        <th scope='col'> Status</th>
        <th scope='col'> Action</th>
      </thead>
      <tbody>
        {users.map((user,index)=>(
          <tr>
            <th scope='row' key={index}>{index+1}</th>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td> 
              <button className='btn btn-outline-warning '>Edit</button>
              <button className='btn btn-outline-danger'>Delete</button>
              </td>   
          </tr>
        ))}
      </tbody>
      </table> */}
    </div>
   

  )
}; export default User;
 

