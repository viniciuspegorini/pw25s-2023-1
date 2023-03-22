package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.model.Category;

import java.util.List;

public interface CategoryService {

    Category create(Category category);

    Category update(Category category);

    List<Category> findAll();

    Category findOne(Long id);

    void delete(Long id);

}
