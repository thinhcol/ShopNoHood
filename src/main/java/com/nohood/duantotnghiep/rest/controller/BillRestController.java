package com.nohood.duantotnghiep.rest.controller;
import com.nohood.duantotnghiep.entity.BILL;
import com.nohood.duantotnghiep.entity.PRODUCT;
import com.nohood.duantotnghiep.service.BILLSERVICE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/rest/bill")
public class BillRestController {
    @Autowired
    BILLSERVICE service;

    @GetMapping 
    public List<BILL> getAll(){
        return service.findall();
    }
    @PutMapping("{id}")
    public BILL update(@PathVariable("id") Integer id,@RequestBody BILL bill) {
        return service.create(bill);
    }

}
