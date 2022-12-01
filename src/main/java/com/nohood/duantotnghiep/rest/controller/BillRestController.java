package com.nohood.duantotnghiep.rest.controller;
import com.nohood.duantotnghiep.entity.BILL;
import com.nohood.duantotnghiep.entity.PRODUCT;
import com.nohood.duantotnghiep.service.BILLSERVICE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
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
    @PutMapping("cancel/{id}")
    public int cancel(@PathVariable("id") Integer id,@RequestBody BILL bill) {
        return service.UpdateSl(bill.getSTATUS(), id);
    }
    @PutMapping("pre/{id}")
    public int per(@PathVariable("id") long id,@RequestBody BILL bill) {
    	Date dt = new Date();
        return service.Updatepre(bill.getSTATUS(),dt,id);
    }
}
