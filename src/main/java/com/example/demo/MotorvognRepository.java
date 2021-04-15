package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MotorvognRepository {

    @Autowired
    private JdbcTemplate db;

    public boolean registrerMotorvogn(Motorvogn vogn) {
        String sql = "INSERT INTO Motorvogn (personnr, navn, addresse, kjennetegn, bilmerke, biltype) VALUES(?,?,?,?,?,?)";
        try {
            db.update(sql, vogn.getPersonnr(), vogn.getNavn(), vogn.getAddresse(), vogn.getKjennetegn(), vogn.getBilmerke(), vogn.getBiltype());
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public List<Motorvogn> hentAlleMotorvogn() {
        String sql = "SELECT * FROM Motorvogn";
        try {
            return db.query(sql, new BeanPropertyRowMapper(Motorvogn.class));
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public boolean slettAlleVogner() {
        String sql = "DELETE FROM Motorvogn";
        try {
            db.update(sql);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
