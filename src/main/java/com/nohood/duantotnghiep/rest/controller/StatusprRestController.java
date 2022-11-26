package com.nohood.duantotnghiep.rest.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.nohood.duantotnghiep.entity.STATUSPR;
import com.nohood.duantotnghiep.service.STATUSPRSERVICE;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/status")
public class StatusprRestController {
    @Autowired
    STATUSPRSERVICE service;
  
   @GetMapping()
   public List<STATUSPR> index(){
	   return service.findall();
   }
} 
 