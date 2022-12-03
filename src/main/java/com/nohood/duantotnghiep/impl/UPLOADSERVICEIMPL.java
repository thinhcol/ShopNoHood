package com.nohood.duantotnghiep.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nohood.duantotnghiep.service.UPLOADSERVICE;

import javax.servlet.ServletContext;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UPLOADSERVICEIMPL implements UPLOADSERVICE {
    @Autowired
    ServletContext app;
    @Override
    public File save(MultipartFile file, String folder) {
//    	System.out.println("ShopQuanAoNam\\src\\main\\resources\\static\\images\\avatar\\" + folder);
        File dir = new File(app.getRealPath("/" + folder));
//        File dir1 = new File("ShopQuanAoNam\\src\\main\\resources\\static\\"+folder+"\\avatar\\");
        if(!dir.exists()) {
            dir.mkdirs();
        }
        String s = System.currentTimeMillis() + file.getOriginalFilename();
        String name = Integer.toHexString(s.hashCode()) + s.substring(s.lastIndexOf("."));
        try {
        	byte[] bytes = file.getBytes();
            Path path = Paths.get("..\\ShopNoHood\\src\\main\\resources\\static\\images\\"+folder+"\\" + name);
            Files.write(path, bytes);
            File savedFile = new File(dir,name);
            file.transferTo(savedFile);  
            return savedFile;
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
    }

}
