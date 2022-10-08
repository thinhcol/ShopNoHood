package com.nohood.duantotnghiep.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nohood.duantotnghiep.entity.CART;

public interface CARTDAO extends JpaRepository<CART,Long> {
	@Query("SELECT o FROM CART o where o.account.USERNAME = ?1")
	List<CART> findByUsername(String username);
}
