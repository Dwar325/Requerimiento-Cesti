import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/';

const CompCreateBlog = () => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, { titulo: titulo, contenido: contenido });
        navigate('/');
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h3 className='mt-4 mb-4'>Crear un Nuevo Blog</h3>
                    <form onSubmit={store}>
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
                        <button type='submit' className='btn btn-primary'>Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompCreateBlog;
