package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MotorvognController {

    @Autowired
    private MotorvognRepository rep;

    @PostMapping("/registrer")
    public boolean registrer (Motorvogn motorvogn) {
       return rep.registrerMotorvogn(motorvogn);
    }

    @GetMapping("slettAlle")
    public boolean slettAlle () {
        return rep.slettAlleVogner();
    }

    @GetMapping("hentAlle")
    public List<Motorvogn> hentAlle () {
        List<Motorvogn> liste = rep.hentAlleMotorvogn();
        return liste;
    }

    @PostMapping("endreVogn")
    public boolean endreVogn (Motorvogn vogn) {
        System.out.println(vogn.getPersonnr());
        Motorvogn selected  = rep.hentVogn(vogn.getPersonnr());
        return rep.endreVogn(selected);
    }

    @PostMapping("slettEtVogn")
    public boolean slettVogn(Motorvogn vogn) {
       return rep.slettEnVogn(vogn.getPersonnr());
    }
}
