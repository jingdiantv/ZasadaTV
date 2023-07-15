package com.example.zasada_tv.controllers.tabs;


import com.example.zasada_tv.controllers.tabs.dto.AttendedEventDTO;
import com.example.zasada_tv.services.EventsTabService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class EventsTabController {

    private final EventsTabService eventsTabService;


    public EventsTabController(EventsTabService eventsTabService) {
        this.eventsTabService = eventsTabService;
    }


    @RequestMapping(value = "/getPlayerEventsByType/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Object>> getPlayerEventsByType(@PathVariable("id") String id, @PathVariable("type") String type) {
        ArrayList<Object> idMatches = eventsTabService.getPlayerEventsByType(id, type);
        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getPlayerAttendedEvents/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<AttendedEventDTO>> getPlayerAttendedEvents(@PathVariable String id) {
        ArrayList<AttendedEventDTO> idMatches = eventsTabService.getPlayerAttendedEvents(id);
        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getTeamEventsByType/{id}/{type}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Object>> getTeamEventsByType(@PathVariable("id") String id, @PathVariable("type") String type) {
        ArrayList<Object> idMatches = eventsTabService.getTeamEventsByType(id, type);
        return ResponseEntity.ok(idMatches);
    }


    @RequestMapping(value = "/getTeamAttendedEvents/{id}", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<AttendedEventDTO>> geTeamAttendedEvents(@PathVariable String id) {
        ArrayList<AttendedEventDTO> idMatches = eventsTabService.getTeamAttendedEvents(id);
        return ResponseEntity.ok(idMatches);
    }
}
