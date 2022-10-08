package com.nohood.duantotnghiep.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nohood.duantotnghiep.service.CARTSERVICE;

import javax.servlet.http.HttpServletRequest;

@Controller
public class CartController {
    @Autowired
    CARTSERVICE service;
    @RequestMapping("/order/checkout")
    private String index() { 
        return "checkout/checkout.html"; 
    }   
    @RequestMapping("/order/list")   
    private String list(Model model, HttpServletRequest request) {
        String username = request.getRemoteUser();
        model.addAttribute("orders",service.findByUsername(username));
        return "order/orderlist.html";
    }  
    @RequestMapping("/order/detail/{id}")
    private String detail(@ PathVariable("id") long id, Model model) {
        model.addAttribute("order",service.findone(id));
        return "order/orderdetail.html";
    }
} 
