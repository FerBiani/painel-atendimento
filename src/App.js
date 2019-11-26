import React, {Component} from 'react';
import './App.css';
import alert from './alert.mp3'
import io from 'socket.io-client'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listaChamada: [],
      diaSemana: '---',
      diaMes: '--',
      mes: '----',
      ano: '----',
      horas: '--',
      minutos: '--',
      segundos: '--'
    }
  }

  componentDidMount = () => {
    
    const socket = io('http://localhost:8888', { query: "id=painel" })

    socket.on('chamado', data => {
      this.adicionarNaLista(data)

      this.audio = new Audio(alert);
      this.audio.play();
    })

    const dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado") 
    const monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro")

    setInterval(() => {
      let now = new Date()
      this.setState({
        diaSemana: dayName[now.getDay()],
        diaMes: now.getDate(),
        mes: monName[now.getMonth()],
        ano: now.getFullYear(),
        horas: now.getHours(),
        minutos: (now.getMinutes()<10?'0':'') + now.getMinutes(),
        segundos: (now.getSeconds()<10?'0':'') + now.getSeconds()
      })
    }, 1000);

  }

  adicionarNaLista = (chamado) => {

    // if(this.state.listaChamada.length > 0) {
    //   if(chamado['id'] == this.state.listaChamada[0].id) {
    //     return false
    //   }
    // }

    const lista = this.state.listaChamada

    lista.unshift(chamado)

    //lista.reverse()

    this.setState({
      listaChamada: lista
    })
  }

  render() {
    return (
      <div className="App">
    
        <div className="header">
          <span>{this.state.diaSemana+', '+this.state.diaMes+' de '+this.state.mes+' de '+this.state.ano}</span>
          <span>{this.state.horas+':'+this.state.minutos+':'+this.state.segundos}</span>
        </div>
        <div className="content">
          <div className="principal">
            <div className="conteudo-esquerda">

              <div className="box">
                <div className="box-header">
                  NOME DO PACIENTE
                </div>
                <div className="box-body">
                  <p className="texto-grande">{this.state.listaChamada.length ? this.state.listaChamada[0].nome : ''}</p>
                </div>
              </div>

              <div className="box">
                <div className="box-header">
                  ESPECIALIDADE
                </div>
                <div className="box-body">
                  <p className="texto-grande">{this.state.listaChamada.length ? this.state.listaChamada[0].especialidade : ''}</p>
                </div>
              </div>
            </div>

            <div className="conteudo-direita">
              <div className="box">
                <div className="box-header">
                  ÚLTIMAS CHAMADAS
                </div>
                <div className="box-body">
                 
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="texto-pequeno">Paciente</th>
                          <th className="texto-pequeno">Especialidade</th>
                          <th className="texto-pequeno">Horário da consulta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.listaChamada.map((paciente) => {
                            return (
                              <tr>
                                <td className="texto-pequeno">{paciente.nome}</td>
                                <td className="texto-pequeno">{paciente.especialidade}</td>
                                <td className="texto-pequeno">{paciente.horario}</td>
                              </tr>
                            )
                        })}
                      </tbody>
                    </table>
            
                </div>
              </div>
            </div>
          </div>
        </div>
           
          {/* {this.state.listaChamada.length > 0 &&
            <div className="chamado">
              <p className="texto-grande">{this.state.listaChamada[0].nome}</p>
              <p>Especialidade: {this.state.listaChamada[0].especialidade}</p>
              <p>Horário do chamado: {this.state.listaChamada[0].horario}</p>
            </div>
          } */}
          {/* <h6 className="titulo">Histórico de chamados</h6>
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
          </div> */}

      </div>
    )
  }
}

export default App;
