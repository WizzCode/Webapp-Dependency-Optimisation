package com.wizzcode.server.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ApplicationUtils {

    //Takes MultipartFile obj as input and save it at specified path
    public Path storeMultipartFileAsTempFile(MultipartFile multipartFile, String path){
        try{
            if (multipartFile.isEmpty()) {
                throw new RuntimeException("Empty File");
            }
            File dir = new File(path);
            dir.mkdir();
            Path filepath = Paths.get(dir.toString(), multipartFile.getOriginalFilename());
            try (OutputStream os = Files.newOutputStream(filepath)) {
                os.write(multipartFile.getBytes());
            }
            return filepath;
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
