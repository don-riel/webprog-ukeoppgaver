package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class MotorvognController {

    @Autowired
    private MotorvognRepository rep;

    @Autowired
    private HttpSession session;

    @PostMapping("/registrer")
    public boolean registrer (Motorvogn motorvogn) {
        if (session.getAttribute("Innlogget") != null) {
            return rep.registrerMotorvogn(motorvogn);
        }
        return false;
    }

    @GetMapping("slettAlle")
    public boolean slettAlle () {
        if (session.getAttribute("Innlogget") != null) {
            return rep.slettAlleVogner();
        }
        return false;
    }

    @GetMapping("hentAlle")
    public List<Motorvogn> hentAlle () {
            List<Motorvogn> liste = rep.hentAlleMotorvogn();
            return liste;
    }

    @PostMapping("endreVogn")
    public boolean endreVogn (Motorvogn vogn) {
        if (session.getAttribute("Innlogget") != null) {
            return rep.endreVogn(vogn);
        }
        return false;
    }

    @PostMapping("slettEtVogn")
    public boolean slettVogn(Motorvogn vogn) {
        if (session.getAttribute("Innlogget") != null) {
            return rep.slettEnVogn(vogn.getPersonnr());
        }
        return false;
    }
}
