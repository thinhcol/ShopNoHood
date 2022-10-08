package com.nohood.duantotnghiep.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.nohood.duantotnghiep.entity.BILL;

import java.util.List;

public interface BILLSERVICE {
    List<BILL> findall();
    BILL create(BILL bill);
    void deletebyid(long BILLID);
    void delete(BILL bill);
    BILL findone(long BILLID);
    
}
