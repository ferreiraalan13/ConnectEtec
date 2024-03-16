
import './App.css'

function App() {
  return (
    <div className="container">
      <div className="form-image">
        <img src="img/undraw_sign_up_n6im.svg" alt="" />
      </div>
      <div className="form">
        <form action="">
          <div className="form-header">
            <div className="title">
              <h1>Cadastre-se</h1>
            </div>
            <div className="login-button">
              <button><a href="login.html">Login</a></button>
            </div>
          </div>
          <div className="input-group">
            <div className="input-box">
              <label htmlFor="firstname">Primeiro nome</label>
              <input id="firstname" type="text" name="firstname" placeholder="Digite seu Primeiro nome" required />
            </div>
            <div className="input-box">
              <label htmlFor="lastname">Sobrenome</label>
              <input id="lastname" type="text" name="lastname" placeholder="Digite seu Sobrenome" required />
            </div>
            <div className="input-box">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" name="email" placeholder="Digite seu email" required />
            </div>
            <div className="input-box">
              <label htmlFor="number">Celular</label>
              <input id="number" type="tel" name="number" placeholder="(xx) xxxxx xxxx" required />
            </div>
            <div className="input-box">
              <label htmlFor="password">Senha</label>
              <input id="password" type="password" name="password" placeholder="Digite sua Senha" required />
            </div>
            <div className="input-box">
              <label htmlFor="confirmpassword">Confirme sua Senha</label>
              <input id="confirmpassword" type="password" name="confirmpassword" placeholder="Confirme sua Senha" required />
            </div>
          </div>
          <div className="gender-inputs">
            <div className="gender-title">
              <h6>Gênero</h6>
            </div>
            <div className="gender-group">
              <div className="gender-input">
                <input type="radio" id="female" name="gender" />
                <label htmlFor="female">Feminino</label>
              </div>
              <div className="gender-input">
                <input type="radio" id="male" name="gender" />
                <label htmlFor="male">Masculino</label>
              </div>
              <div className="gender-input">
                <input type="radio" id="other" name="gender" />
                <label htmlFor="other">Outro</label>
              </div>
              <div className="gender-input">
                <input type="radio" id="undisclosed" name="gender" />
                <label htmlFor="undisclosed">Prefiro não dizer</label>
              </div>
            </div>
          </div>
          <div className="continue-button">
            <button><a href="">Continuar</a></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;