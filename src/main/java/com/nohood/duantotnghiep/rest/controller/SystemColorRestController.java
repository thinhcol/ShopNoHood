package com.nohood.duantotnghiep.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nohood.duantotnghiep.entity.PROVINCE;
import com.nohood.duantotnghiep.service.PRODUCTSERVICE;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/system/color")
public class SystemColorRestController {
	@Autowired
	PRODUCTSERVICE productservice;
	
	@GetMapping("")
    public List<String> getAllColor(){
		return productservice.getAllColor();
    }
}
