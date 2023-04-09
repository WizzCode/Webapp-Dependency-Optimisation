package com.wizzcode.server.service;

import com.google.gson.*;
import com.wizzcode.server.util.ApplicationUtils;
import com.wizzcode.wizzcode.Optimisation.Optimiser;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PreDestroy;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class OptimisationService {
    @Value("${custom.user.inputdir}") String dirStr;
    public String findOutput(MultipartFile codeInput) throws Exception {
        ApplicationUtils applicationUtils = new ApplicationUtils();
        applicationUtils.storeMultipartFileAsTempFile(codeInput, dirStr);

        //use library and pass input file path
        Path inputFilePath = applicationUtils.storeMultipartFileAsTempFile(codeInput, dirStr);
        String inputFilePathStr = inputFilePath.toAbsolutePath().toString();
        inputFilePathStr = inputFilePathStr.replace("\\","\\\\");
        Optimiser optimiserObj = new Optimiser(inputFilePathStr);
        optimiserObj.calloptimiser();

        //obtain the optimisations and convert to Json
        List<List<String>> optimisations = optimiserObj.getOptimisations();

        Gson gson = new GsonBuilder().disableHtmlEscaping().setPrettyPrinting().create();
        JsonObject jsonObject = new JsonObject();

        int index = 0;
        for(List<String> optimisation:optimisations){
            JsonObject tempObj = new JsonObject();
            tempObj.addProperty("snippet",optimisation.get(0));
            tempObj.addProperty("lineNo",optimisation.get(1));
            tempObj.addProperty("justificationKey",optimisation.get(2));
            jsonObject.add(Integer.toString(index), tempObj);
            index++;
        }

        return gson.toJson(jsonObject);
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
