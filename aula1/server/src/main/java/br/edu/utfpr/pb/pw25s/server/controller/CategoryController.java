package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("categories")
public class CategoryController {

    private static CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping // http://localhost:8025/categories
    public ResponseEntity<Category> create(@RequestBody @Valid Category category) {
        categoryService.create(category);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .buildAndExpand(category.getId()).toUri();

        return ResponseEntity.created(location).body(category);
    }

    @PutMapping("{id}") //http://localhost:8025/categories/{id} em que {id} = um long
    public ResponseEntity<Category> update(@RequestBody @Valid Category category,
                                           @PathVariable Long id) {
        categoryService.update(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public ResponseEntity<List<Category>> findAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Category> findOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(categoryService.findOne(id));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable(name = "id") Long id) {
        categoryService.delete(id);
    }

}
