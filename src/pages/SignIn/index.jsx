import './signin.css'
import logo from '../../assets/login.png'
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";

export const SignIn = () => {
  const { signInGoogle, signed } = useContext(AuthGoogleContext);
  async function handleLoginFromGoogle() {
    await signInGoogle();
  }


  if (!signed) {
    return (
      <div className="conteiner-center">
        <div className="login">
          
          <div className="login-area">
            <img src={logo} alt="Logo do Sistema"/>
          </div>
         
          <div style={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1>SISTEMA DE CHAMADOS</h1>
            {/* <input type="text" value={email} placeholder="email@email.com"  onChange={(e)=>{setEmail(e.target.value)}} />

            <input type="password" value={senha} placeholder="*****" onChange={(e)=>{setSenha(e.target.value)}}/> */}
            <button style={{ padding: '8px'  }} onClick={handleLoginFromGoogle}>Logar com o Google</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/dashboard" />;
  }
}
