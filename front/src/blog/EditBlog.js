import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const URI = 'http://localhost:8000/blogs/'

const CompEditBlog = () => {
    const[titulo, setTitulo] = useState('')
    const[contenido, setContenido] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(URI+id, {
            titulo: titulo,
            contenido: contenido
        })
        navigate('/')
    }

    useEffect (() => {
        getBlogById()
    },[])

    const getBlogById = async () => {
        const res = await axios.get(URI+id)
        setTitulo(res.data.titulo)
        setContenido(res.data.contenido)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h3 className='mt-4 mb-4'>Editar Blog</h3>
                    <form onSubmit={update}>
                        <div className='mb-3'>
                            <label className='form-label'>Titulo</label>
                            <input
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Contenido</label>
                            <textarea
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}
                                className='form-control'
                                rows='3'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompEditBlog