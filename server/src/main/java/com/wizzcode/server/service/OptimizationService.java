package com.wizzcode.server.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class OptimizationService {
    public List<List<String>> findOutput(MultipartFile codeInput) throws Exception{
        InputStream is = codeInput.getInputStream();

        //use library and pass input stream
        //obtain the optimizations
        List<List<String>> optimizations = Arrays.asList(
                Arrays.asList("3","if(i==0){","5"),
                Arrays.asList("9","const temp = 5;","9")
        );

        return optimizations;
    }
}
