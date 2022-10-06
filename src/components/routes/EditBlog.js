import { useState, useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function EditBlog() {

    const [form, setForm] = useState({
        name: '',
        title: '',
        body: '',
    })
    const [errMessage, setErrMessage] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const blog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
                setForm(response.data)
            } catch (error) {
                console.warn(error)
                if(error.response){
                    setErrMessage(error.response.data.message)
                }
            }
        }
        blog()
    },[])

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`, form)
            navigate(`/blogs/${id}`)
        } catch (error) {
            console.warn(error)
            if(error.response){
                setErrMessage(error.response.data.message)
            }    
        }
    }

    return(
        <div>
            <h1>Edit Blog</h1>

            <p>{errMessage}</p>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input 
                        type='text'
                        id='name'
                        value={form.name}
                        placeholder='authors name...'
                        onChange={e => setForm({...form, name: e.target.value})}
                    />
                </div>
                
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input 
                        type='text'
                        id='title'
                        value={form.title}
                        placeholder='blog title...'
                        onChange={e => setForm({...form, title: e.target.value})}
                    />
                </div>
                
                <div>
                    <label htmlFor='body'>Body:</label>
                    <textarea 
                        style={{width: '500px', height: '100px'}}
                        type='text'
                        id='body'
                        value={form.body}
                        placeholder='Blog Content...'
                        onChange={e => setForm({...form, body: e.target.value})}
                    > 
                    </textarea>
                </div>

                <button type='submit'>Submit changes</button>
            </form>
            <Link to={`/blogs/${id}`}>Discard Changes</Link>
        </div>
    )
}