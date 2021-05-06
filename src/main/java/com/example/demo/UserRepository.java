package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    JdbcTemplate db;

    public boolean registrerUser(User user) {
        String sql =  "INSERT INTO User (brukernavn, passord) VALUES(?,?)";
        try {
            db.update(sql, user.getBrukernavn(), user.getPassord());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean loggeInn(User user) {
        String sql = "SELECT * FROM User WHERE brukernavn = ? AND passord = ?";
        try {
            List<User> bruker = db.query(sql, new BeanPropertyRowMapper(User.class), user.getBrukernavn(), user.getPassord());
            return bruker.get(0).getBrukernavn() != null;
        } catch (Exception e) {
            return false;
        }
    }
}
