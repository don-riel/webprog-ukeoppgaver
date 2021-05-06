package com.example.demo;

public class User {
    String brukernavn, passord;

    public User(String brukernavn, String passord) {
        this.brukernavn = brukernavn;
        this.passord = passord;
    }

    public User() {}

    public String getBrukernavn() {
        return brukernavn;
    }

    public void setBrukernavn(String brukernavn) {
        this.brukernavn = brukernavn;
    }

    public String getPassord() {
        return passord;
    }

    public void setPassord(String passord) {
        this.passord = passord;
    }
}
