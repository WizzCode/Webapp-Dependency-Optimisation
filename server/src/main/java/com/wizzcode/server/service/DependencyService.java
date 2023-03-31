package com.wizzcode.server.service;

import com.wizzcode.server.util.ApplicationUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PreDestroy;
import java.io.*;

@Service
public class DependencyService {
    @Value("${custom.user.inputdir}") String dirStr;
    public int[][] findOutput(MultipartFile codeInput) {
        ApplicationUtils applicationUtils = new ApplicationUtils();
        applicationUtils.storeMultipartFileAsTempFile(codeInput, dirStr);

        //use library and pass input stream

        //obtain the output matrix
        int outputMatrix[][] = new int[][]{
                {1, 1, 1, 1},
                {2, 2, 2, 2}
        };

        return outputMatrix;
    }

    @PreDestroy
    public void shutdown(){
        try {
            File dir = new File(dirStr);
            if(dir.exists()){
                FileUtils.deleteDirectory(dir);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
