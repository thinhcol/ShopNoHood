package com.nohood.duantotnghiep.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SecurityController {
    @RequestMapping("/security/login/form")
    public String loginForm(Model model) {
        model.addAttribute("message","Vui lòng đăng nhập");
        return "/login/login.html"; 
    }    
   
    @RequestMapping("/security/login/success")
    public String success(Model model) {
        model.addAttribute("message","�?ăng nhập thành công");
        return "redirect:/product/list";
    }

    @RequestMapping("/security/login/error")
    public String error(Model model) {
        model.addAttribute("message","Sai thông tin đăng nhập");
        return "/login/login.html";
    }

    @RequestMapping("/security/unauthoried")
    public String unau(Model model) {
        model.addAttribute("message","Không có quy�?n truy xuất");
        return "/login/login.html";
    }

    @RequestMapping("/security/logoff/success")
    public String logoff(Model model) {
        model.addAttribute("message","Đăng xuất thành công");
        return "/login/login.html";
    }
}
