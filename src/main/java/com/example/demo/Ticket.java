package com.example.demo;

public class Ticket {

    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private String telefonnr;
    private String epost;


    public Ticket(String film, int antall, String fornavn, String etternavn, String telefonnr, String epost) {
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonnr = telefonnr;
        this.epost = epost;
    }

    public Ticket() {
    }

    public String getFilm() {
        return film;
    }

    public int getAntall() {
        return antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public String getTelefonnr() {
        return telefonnr;
    }

    public String getEpost() {
        return epost;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "film='" + film + '\'' +
                ", antall=" + antall +
                ", fornavn='" + fornavn + '\'' +
                ", etternavn='" + etternavn + '\'' +
                ", telefonnr='" + telefonnr + '\'' +
                ", epost='" + epost + '\'' +
                '}';
    }
}
