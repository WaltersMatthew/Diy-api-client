import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function NewBlog() {
    
        const [form, setForm] = useState({
            name: '',
            title: '',
            body: '',
        })
        const [errMessage, setErrMessage] = useState('')

        const navigate = useNavigate()

        const handleSubmit = async e => {
            try {
                e.preventDefault()
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/blogs`, form)
                navigate('/blogs')
            } catch (error) {
                console.log(error)
                if(error.response){
                    setErrMessage(error.response.data.message)
                }
            }
        }
    return(
        <div>
            <h1>New Blog</h1>

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

                <button type='submit'>Submit your blog</button>
            </form>
        </div>
    )
}