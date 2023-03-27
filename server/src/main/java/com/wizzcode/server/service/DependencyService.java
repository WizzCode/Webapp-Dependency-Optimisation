package com.wizzcode.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.InputStream;

@Service
public class DependencyService {
    public int[][] findOutput(MultipartFile codeInput) throws Exception{
        InputStream is = codeInput.getInputStream();

        //use library and pass input stream
        //obtain the output matrix
        int outputMatrix[][] = new int[][]{
                {1, 1, 1, 1},
                {2, 2, 2, 2}
        };

        return outputMatrix;
    }
}
