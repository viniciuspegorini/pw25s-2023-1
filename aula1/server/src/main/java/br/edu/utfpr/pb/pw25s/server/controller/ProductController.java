package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.error.ApiError;
import br.edu.utfpr.pb.pw25s.server.model.Product;
import br.edu.utfpr.pb.pw25s.server.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("products")
public class ProductController {

    private static ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping // http://localhost:8025/categories
    public ResponseEntity<Product> create(@RequestBody @Valid Product product) {
        productService.create(product);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .buildAndExpand(product.getId()).toUri();

        return ResponseEntity.created(location).body(product);
    }

    @PutMapping("{id}") //http://localhost:8025/categories/{id} em que {id} = um long
    public ResponseEntity<Product> update(@RequestBody @Valid Product product,
                                           @PathVariable Long id) {
        productService.update(product);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> findOne(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(productService.findOne(id));
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable(name = "id") Long id) {
        productService.delete(id);
    }

}
