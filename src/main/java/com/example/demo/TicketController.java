package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TicketController {

    private List<Ticket> tickets = new ArrayList<>();
    private final Logger log = LoggerFactory.getLogger(TicketController.class);


    @PostMapping("/tickets")
    public void saveTicket(@RequestBody Ticket ticket) {

        log.debug("Invoking saveTickets: {}", ticket);
        tickets.add(ticket);
    }

    @GetMapping("/tickets")
    public List<Ticket> allTickets(){
        log.debug("Invoking allTickets");
        return tickets;
    }

    @DeleteMapping("tickets")
    public void deleteAllTickets() {
        log.debug("Invoking deleteAllTickets");
        tickets.clear();
    }
}
