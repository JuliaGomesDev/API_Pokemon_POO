// realiza o Post dos dados na base de dados
async function cadastrar() {
  let nome = document.getElementById('nome').value
  let tipo = document.getElementById('tipo').value
  let poder = document.getElementById('poder').value
  let nota = Number(document.getElementById('nota').value)

  // criar o dado para enviar
  let dado = {
    nome,
    tipo,
    poder,
    nota
  }

  // chamar ou cosumir a API utilizando fetch
  await fetch('http://localhost:8080/pokemon', {
    method: 'POST',
    body: JSON.stringify(dado),
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
  })
    .then(resposta => {
      alert('Cadastro foi realizado com sucesso')
    })
    .catch(error => {
      alert(error)
    })
  consultar()
}

async function consultar() {
  // consome a API e recupera os pokemons
  let dados = await fetch('http://localhost:8080/pokemon')
    .then(response => {
      return response.json() // atribui os dados em json para dados
    })
    .catch(error => {
      alert(error)
    })

  // percorrer a variável dados
  // vamos criar uma variável result para concatenar a resposta
  let resposta = ''
  dados.map(dado => {
    resposta +=
      '<tr><td>' +
      dado.nome +
      '</td> <td>' +
      dado.tipo +
      '</td> <td>' +
      dado.poder +
      '</td> <td>' +
      dado.nota +
      '</td> <td> <i class="bi bi-trash"></i> </td> <td><i class="bi bi-pencil"></i></td></tr>'
  })
  // colocar a resposta no body da tabela
  document.getElementById('conteudoTabela').innerHTML = resposta
}
