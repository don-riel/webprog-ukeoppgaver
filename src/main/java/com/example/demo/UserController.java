package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    @Autowired
    private UserRepository rep;

    @Autowired
    private HttpSession session;

    @PostMapping("/registrerUser")
    public boolean  registrerUser (User user) {
        if (rep.registrerUser(user)) {
           session.setAttribute("Innlogget", user);
           return true;
        }
        return false;
    }
     @GetMapping("loggeInn")
    public boolean loggeInn(User user) {
        if (rep.loggeInn(user)) {
            session.setAttribute("Innlogget", user);
            return true;
        }
        return false;
     }

     @GetMapping("loggUt")
    public  boolean loggUt() {
        session.setAttribute("Innlogget", null);
        return session.getAttribute("Innlogget") == null;
     }
}
