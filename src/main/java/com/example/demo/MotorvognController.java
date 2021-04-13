package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MotorvognController {
    private final List<Motorvogn> liste = new ArrayList<>();

    @PostMapping("/registrer")
    public List<Motorvogn> registrer (Motorvogn motorvogn) {
        liste.add(motorvogn);
        return liste;
    }

    @GetMapping("slettAlle")
    public List<Motorvogn> slettAlle () {
        liste.clear();
        return liste;
    }
}
