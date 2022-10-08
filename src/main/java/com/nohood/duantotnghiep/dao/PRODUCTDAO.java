package com.nohood.duantotnghiep.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nohood.duantotnghiep.entity.PRODUCT;

import java.util.List;

public interface PRODUCTDAO extends JpaRepository<PRODUCT,Long> {
    @Query("select p from PRODUCT p where p.categories.CATEID like ?1")
    List<PRODUCT> findByCategoryId(String id);
}
