import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Blog() {
    const [blog, setBlog] = useState({})
    const [errMessage, setErrMessage] = useState('')

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
            </div>
        </div>
    )
}