package com.nohood.duantotnghiep.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nohood.duantotnghiep.entity.BILL;

public interface BILLDAO extends JpaRepository<BILL,Long> {
    
}
