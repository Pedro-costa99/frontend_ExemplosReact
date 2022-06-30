
import './dashboard.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { getChamados } from '../../services/api';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";


const initialValuesListaChamados = [


  {
      clienteId: 0,  
      nomeCliente:'',
      assunto: '',   
      status: '',
      complemento: ''
  },
  {
      clienteId: 1,  
      nomeCliente:'',
      assunto: '',   
      status: '',
      complemento: ''
  },
  {
      clienteId: 2,  
      nomeCliente:'',
      assunto: '',   
      status: '',
      complemento: ''
  },


]


export const Dashboard = () => {
  const [chamados, setChamados] = useState([]);

  const { user, signOut } = useContext(AuthGoogleContext);
  let userLogado = JSON.parse(user);

   useEffect(() => {

    (async () => {

        await getChamados().then((res) => {
            setChamados(res.data);
            console.log(chamados);

          
        })
            .catch((error) => {
                console.log(error)
            })
    })();

}, []);


  return(
    <div>
      <Header/>
      <div className='container-user'>
        <h1 className="container-user__h1">Bem vindo: {userLogado.displayName}</h1>
        <button className='buttonSair' onClick={() => signOut()}>sair</button>  
      </div>
      

      <div className="content">
        <Title nome="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        )  : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
           
              {chamados.map((value, index)=>(
                
                <tr key={index}>
                  <td data-label="Cliente">{value.nomeCliente}</td>
                  <td data-label="Assunto">{value.assunto}</td>
                  <td data-label="Status">
                    <span className="badge" style={{backgroundColor: '#5cb85c' }}>{value.status}</span>
                  </td>
                  <td data-label="Cadastrado">{value.cadastradoEm}</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#3583f6' }}>
                      <FiSearch color="#FFF" size={17} />
                    </button>
                    <button className="action" style={{backgroundColor: '#F6a935' }}>
                      <FiEdit2 color="#FFF" size={17} />
                    </button>
                  </td>
                </tr>
                
                ))}
              </tbody>
            </table>
          </>
        )}

      </div>
      

    </div>
  )
}