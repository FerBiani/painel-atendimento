import React, {Component} from 'react';
import './App.css';
import io from 'socket.io-client'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listaChamada: [],
    }
  }

  componentDidMount = () => {
    
    const socket = io('http://localhost:8888', { query: "id=painel" })

    socket.on('chamado', data => {
      this.adicionarNaLista(data)
    })

  }

  adicionarNaLista = (chamado) => {

    if(this.state.listaChamada.length > 0) {
      if(chamado['id'] == this.state.listaChamada[0].id) {
        return false
      }
    }

    const lista = this.state.listaChamada

    lista.unshift(chamado)

    if(lista.length > 5) {
      lista.pop()
    }

    this.setState({
      listaChamada: lista
    })
  }

  render() {
    return (
      <div className="App">
    
          <div className="principal">
            {this.state.listaChamada.length > 0 &&
              <div className="chamado">
                <p className="texto-grande">{this.state.listaChamada[0].nome}</p>
                <p>Especialidade: {this.state.listaChamada[0].especialidade}</p>
                <p>Horário do chamado: {this.state.listaChamada[0].horario}</p>
              </div>
            }
          </div>

          {this.state.listaChamada.length == 0 &&
            <h6 className="titulo">Nenhuma senha na fila</h6>
          }
        
          {this.state.listaChamada.length > 1 &&
            <h6 className="titulo">Histórico de chamados</h6>
          }
          <div className="historico">
            
            {this.state.listaChamada.map((paciente, index) => {
              if(index != 0) {
                return (
                  <div className="chamado">
                    <p>{paciente.nome}</p>
                    <p className="texto-pequeno">Especialidade: {paciente.especialidade}</p>
                    <p className="texto-pequeno">Horário do chamado: {this.state.listaChamada[0].horario}</p>
                  </div>
                )
              }
            })}
          </div>
          
      </div>
    )
  }
}

export default App;
