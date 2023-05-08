package br.edu.utfpr.pb.pw25s.iocdi.controller;

import br.edu.utfpr.pb.pw25s.iocdi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {

    /**
     * 1 - constructor injection
     * 2 - setter injection
     * 3 - field injection
     */
    //@Autowired
    private final CategoryRepository repository;

//    @Autowired
//    public void setRepository(CategoryRepository repository) {
//        this.repository = repository;
//    }

    //    @Autowired
    public CategoryController(CategoryRepository repository) {
        this.repository = repository;
    }
}
