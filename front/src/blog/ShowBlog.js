import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/';

const CompShowBlogs = () => {
    const [blogs, setBlog] = useState([]);

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        const res = await axios.get(URI);
        setBlog(res.data);
    };

    const deleteBlogs = async (id) => {
        await axios.delete(`${URI}${id}`);
        getBlogs();
    };


    const formatDate = (toFormat) => {
        const date = new Date(toFormat);
        return date.toLocaleString(); 
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to="/create" className='btn btn-primary mt-2 mb-2'>Crear</Link>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Titulo</th>
                                <th>Contenido</th>
                                <th>Fecha Creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>{blog.titulo}</td>
                                    <td>{blog.contenido}</td>
                                    <td>{formatDate(blog.createdAt)}</td>  
                                    <td>
                                        <Link to={`/edit/${blog.id}`} className='btn btn-info'>Editar</Link>
                                        <button onClick={() => deleteBlogs(blog.id)} className='btn btn-danger'>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompShowBlogs;
