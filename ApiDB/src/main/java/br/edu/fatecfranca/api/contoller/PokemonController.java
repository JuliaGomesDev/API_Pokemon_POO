package br.edu.fatecfranca.api.contoller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import br.edu.fatecfranca.api.model.Pokemon;
import br.edu.fatecfranca.api.model.repositories.PokemonRepository;

// Informa que a classe responde por requisições restfull
@RestController
public class PokemonController {
	
	//característica principal do Spring
	// injeção de denpendência
	// objeto pode utilizar métodos de sua interace sem ser instanciado 
	
	@Autowired
	PokemonRepository injecao;
	
	//método get para consultar os pokemons na rota/pokemon
	@GetMapping("/pokemon")
	@CrossOrigin(origins="*")
	public  List<Pokemon> get(){
		//select * from pokemon
		return injecao.findAll();
	}
	
	// método que insere pokemon na rota /pokemon
	@PostMapping("/pokemon")
	@CrossOrigin(origins="*")
	public Pokemon add(@RequestBody Pokemon pokemon) {
		Pokemon novoPokemon = injecao.save(pokemon);
		return novoPokemon;
	}
	
	
	// método delelte para remover um pokemon na rota /pokemon
	@DeleteMapping("/pokemon/{id}")
	@CrossOrigin(origins="*")
	public String remove(@PathVariable Long id) {
		
		try { // tente remover
			injecao.deleteById(id);
			return "Remoção com sucesso";
		} 
		catch(Exception e) { // pegar o erro
			return "Pokemon não encontrado para remoção";
		}	
	}	
	
	// método post para inserir um pokemon na rota /pokemon
	@PutMapping("/pokemon")
	@CrossOrigin(origins="*")
	public Pokemon uppdates(@RequestBody Pokemon pokemon) {
		// pokemon terá id, pontanto o save atualiza
		Pokemon novoPokemon = injecao.save(pokemon);
		return novoPokemon;
	}		
	
	
}
