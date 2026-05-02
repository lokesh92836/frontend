import { useEffect, useState } from 'react'
import axios from 'axios'
import './Dashboard.css'

const API_BASE = import.meta.env.VITE_API_URL

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

function Dashboard({ onLogout }) {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    city: ''
  })

  const fetchStudents = async () => {
    const res = await axios.get(`${API_BASE}/students/`, authHeader())
    setStudents(res.data)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addStudent = async () => {
    await axios.post(`${API_BASE}/students/`, form, authHeader())
    setForm({ name: '', age: '', email: '', city: '' })
    fetchStudents()
  }

  const deleteStudent = async (id) => {
    await axios.delete(`${API_BASE}/students/${id}`, authHeader())
    fetchStudents()
  }

  const logout = () => {
    localStorage.removeItem('token')
    onLogout()
  }

  return (
    <div className="dashboard">
      
      
      <div className="navbar">
        <h2>Student Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      
      <div className="form-box">
        <h3>Add Student</h3>

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />

        <button onClick={addStudent}>Add Student</button>
      </div>

      
      <div className="card-container">
        {students.map(s => (
          <div className="card" key={s.id}>
            <h3>{s.name}</h3>
            <p><b>ID:</b> {s.id}</p>
            <p><b>Age:</b> {s.age}</p>
            <p><b>Email:</b> {s.email}</p>
            <p><b>City:</b> {s.city}</p>

            <button className="delete-btn" onClick={() => deleteStudent(s.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;