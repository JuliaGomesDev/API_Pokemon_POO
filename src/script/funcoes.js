// realiza o Post dos dados na base de dados
async function cadastrar() {
  let id = document.getElementById('id').value
  let nome = document.getElementById('nome').value
  let tipo = document.getElementById('tipo').value
  let poder = document.getElementById('poder').value
  let nota = Number(document.getElementById('nota').value)
  let dado
  let metodo // vai conter POST ou PUT

  if (id) {
    // vai atualizar
    metodo = 'PUT'
    dado = { id, nome, tipo, poder, nota }
  } else {
    // cadastrar
    metodo = 'POST'
    dado = { id, nome, tipo, poder, nota }
  }

  // chamar ou cosumir a API utilizando fetch
  await fetch('http://localhost:8080/pokemon', {
    method: metodo,
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
    resposta += `<tr><td>
      ${dado.nome} 
      </td> <td> 
      ${dado.tipo} 
      </td> <td> 
      ${dado.poder} 
      </td> <td> 
      ${dado.nota}
      </td> <td> <i onclick='remove(${dado.id})' class="bi bi-trash"></i> </td> <td><i onclick="atualiza(${dado.id}, '${dado.nome}', '${dado.tipo}', '${dado.poder}', ${dado.nota})" class="bi bi-pencil"></i></td></tr>`
  })
  // colocar a resposta no body da tabela
  document.getElementById('conteudoTabela').innerHTML = resposta
}

/*remove um pokemon do banco de dados
quem chamar a função remove() pode fazer outra ação de receber resposta*/

async function remove(id) {
  let confirma = confirm(`Confirma exclusão do pokemon?`)
  if (confirma) {
    //confirma é true
    // chama a api -> é sincrona (aguardamos o retorno do servidor)
    await fetch(`http://localhost:8080/pokemon/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        //quando o servidor retornou
        alert('Pokemon foi removido com sucesso')
        consultar()
      })
      .catch(error => {
        // houve erro na comunicação com o servidor
        alert('Problema na remoção')
      })
  }
}

function atualiza(id, nome, tipo, poder, nota) {
  // insere no formulário os dados do Pokemón que será atualizado
  document.getElementById('id').value = id
  document.getElementById('nome').value = nome
  document.getElementById('tipo').value = tipo
  document.getElementById('poder').value = poder
  document.getElementById('nota').value = nota
}
