package com.nohood.duantotnghiep.rest.controller;

import com.nohood.duantotnghiep.entity.ACCOUNT;
import com.nohood.duantotnghiep.service.ACCOUNTSERVICE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/accounts")
public class AccountRestController {
	@Autowired
	ACCOUNTSERVICE dao;

	@GetMapping
	public List<ACCOUNT> getAll(@RequestParam("admin") Optional<Boolean> admin) {
		if (admin.orElse(true)) {
			return dao.getAdministrators();
		}
		return dao.findall();
	}

	@GetMapping("getone")
	public ACCOUNT getOne() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			return dao.findone(auth.getName());
		} else {
			return null;
		}
	}
	@PostMapping()
	 public ACCOUNT create(@RequestBody ACCOUNT ACCOUNT) {
        return dao.create(ACCOUNT);
    }
	@GetMapping("soluong")
	public long getsoluong() {
		return dao.sluser();
	}

	@PutMapping("changepassword")
	public void updatepass(@RequestParam String email,@RequestParam String pass) {
		dao.UpdatePW(pass, email);
	}

}
