package com.nohood.duantotnghiep.rest.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.nohood.duantotnghiep.entity.CART;
import com.nohood.duantotnghiep.service.CARTSERVICE;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/orders")
public class CartRestController {
    @Autowired
    CARTSERVICE service;
    @GetMapping()
    public List<CART> index() {
        return service.findall();
    } 
    @PostMapping()
    public CART create(@RequestBody JsonNode data) {
        return service.create(data);
    }  
    @PutMapping()
    public int update(CART cart) {
        return service.UpdateSl(cart.getPHONE(), cart.getADDRESS(), cart.getCARTID());
    } 
} 
 