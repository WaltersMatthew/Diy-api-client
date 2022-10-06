import {useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Blogs() {
    
    const [blogs, setBlogs] = useState([])
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blogs`)
                // console.log(response.data)
                setBlogs(response.data)
            } catch (error) {
                console.log(error)
                if(error.response){
                    setErrMessage(error.response.data.message)
                }
            }
        }
        getBlogs()
    },[])

    const blogLinks = blogs.map(blog => {
        return(
            <div key={blog._id}>
                <Link to={`/blogs/${blog._id}`}><h2>{blog.title}</h2></Link>
                <p>By: {blog.name}</p>
            </div>
        )
    })
    return(
        <div>
            <h1>All Blogs</h1>
            {blogLinks}
        </div>
    )
}