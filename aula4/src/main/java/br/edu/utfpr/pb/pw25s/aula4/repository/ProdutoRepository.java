package br.edu.utfpr.pb.pw25s.aula4.repository;

import br.edu.utfpr.pb.pw25s.aula4.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{

}