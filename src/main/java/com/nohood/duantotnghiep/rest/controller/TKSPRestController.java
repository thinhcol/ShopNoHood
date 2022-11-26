package com.nohood.duantotnghiep.rest.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nohood.duantotnghiep.entity.TKSP;
import com.nohood.duantotnghiep.service.BILLSERVICE;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/TKSP")
public class TKSPRestController {
	@Autowired
	BILLSERVICE dao;
	@GetMapping()
	public List<TKSP> thongke(){
		return dao.sanphammuanhieu();
	}
}
