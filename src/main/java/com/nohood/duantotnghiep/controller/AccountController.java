package com.nohood.duantotnghiep.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nohood.duantotnghiep.entity.ACCOUNT;
import com.nohood.duantotnghiep.service.ACCOUNTSERVICE;

@Controller
public class AccountController {
	@Autowired
	ACCOUNTSERVICE accService;
	
    @RequestMapping("/account/profile")
    public String editinfo(Model model, HttpServletRequest request) {
    	String username = request.getRemoteUser();
    	ACCOUNT acc = accService.findone(username);
    	model.addAttribute("user",acc);
        return "/account/profile";
    }
    
    @RequestMapping("/account/profile/edit")
    public String doEdit(Model model, @ModelAttribute("user") ACCOUNT account) {
    	System.out.println(account.getEMAIL());
    	account.setPHOTO("");
    	accService.create(account);
        return "redirect:/account/profile";
    }
    
    @RequestMapping("/account/address")
    public String showAddress(Model model, HttpServletRequest request) {
        return "/account/address";
    }
    
    @RequestMapping("/account/changepass")
    public String showChangePass(Model model, HttpServletRequest request) {
        return "/account/changepass";
    }
    
    @RequestMapping("/account/coin")
    public String showCoinPage(Model model, HttpServletRequest request) {
        return "/account/coin";
    }
}
