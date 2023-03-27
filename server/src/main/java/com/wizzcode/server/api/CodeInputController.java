package com.wizzcode.server.api;

import com.wizzcode.server.service.DependencyService;
import com.wizzcode.server.service.OptimizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("api/")
@RestController
public class CodeInputController {
    private final DependencyService dependencyService;
    private final OptimizationService optimizationService;

    @Autowired
    public CodeInputController(DependencyService dependencyService, OptimizationService optimizationService) {
        this.dependencyService = dependencyService;
        this.optimizationService = optimizationService;
    }

    @RequestMapping(value = "dependency", method = { RequestMethod.GET, RequestMethod.POST })
    public int[][] dependency(@RequestBody MultipartFile codeInput) throws Exception{
        return dependencyService.findOutput(codeInput);
    }

    @RequestMapping(value = "optimization", method = { RequestMethod.GET, RequestMethod.POST })
    public List<List<String>> optimization(@RequestBody MultipartFile codeInput) throws Exception{
        return optimizationService.findOutput(codeInput);
    }
}
