import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Blog() {
    const [blog, setBlog] = useState({})
    const [errMessage, setErrMessage] = useState('')
    const [comments, setComments] = useState([{
        name: '',
        content: ''
    }])

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const blog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
                // console.log(response.data)
                setBlog(response.data)
            } catch (error) {
                console.log(error)
                if(error.response){
                    setErrMessage(error.response.data.message)
                }
            }
        }
        blog()
    },[])

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`)
            navigate('/blogs')
        } catch (error) {
            console.warn(error)
            if(error.response){
                setErrMessage(error.response.data.message)
            }
        }
    }
    const submitComments = async e => {
        try {
            e.preventDefault()
            const blogToComment = await axios.put(`${process.env.REACT_APP_SERVER_URL}/blogs/${id}`, comments)
            console.log(blogToComment, comments)
            blogToComment.comments.push(comments)
            await blogToComment.save()
        } catch (error) {
            console.warn(error)
            if(error.response){
                setErrMessage(error.response.data.message)
            }
        }
    }

    // const showComments = blog.comments.map(comm =>{
    //     return(
    //         <div>
    //             <h2>{comm.name}</h2>
    //             <p>{comm.content}</p>
    //         </div>
    //     )
        
    // })

    return(
        <div>
            <div>
                <Link to={`/blogs/${id}/edit`}><button>Edit Blog</button></Link>

                <button onClick={handleDelete}>Delete Blog</button>
            </div>
            <h1>{blog.title}</h1>
            <div>
                {/* Link goes here */}
            </div>

            <p>{errMessage}</p>

            <div>                
                <h3>By: {blog.name}</h3>

                <p>{blog.body}</p>
                {/* {showComments} */}
            </div>
            <form onSubmit={submitComments}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        id='name'
                        value={comments.name}
                        placeholder='name...'
                        onChange={e => setComments([...comments, { name: e.target.value}])}
                    />
                </div>

                <div>
                    <label htmlFor='content'>Content:</label>
                    <input
                        type='text'
                        id='content'
                        value={comments.content}
                        placeholder='content...'
                        onChange={e => setComments([...comments,{ content: e.target.value}])}
                    />
                </div>
                
                <button type='submit'>Submit Comment</button>
            </form>
        </div>
    )
}