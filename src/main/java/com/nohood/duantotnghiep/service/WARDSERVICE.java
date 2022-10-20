package com.nohood.duantotnghiep.service;

import java.util.List;

import com.nohood.duantotnghiep.entity.WARD;

public interface WARDSERVICE {
    List<WARD> findall();
    WARD create(WARD ward);
    void delete(WARD ward);
}
