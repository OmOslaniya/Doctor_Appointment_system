package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Appointment;
import com.example.fsdproject.entity.Schedule;
import com.example.fsdproject.repository.DoctorRepository;
import com.example.fsdproject.repository.PatientRepository;
import com.example.fsdproject.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PatientRepository patientRepository;
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/book")
    public ResponseEntity<String> bookAppointment(@RequestBody Appointment appointment) {
        System.out.println("inside apppppp");
        System.out.println(appointment.getSchedule());
        appointmentService.bookAppointment(appointment);

        return new ResponseEntity<>("Appointment booked successfully", HttpStatus.CREATED);
    }
//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping
//    public ResponseEntity<List<Appointment>> getAppointments() {
//        List<Appointment> appointments = appointmentService.getAllAppointments();
//        return new ResponseEntity<>(appointments, HttpStatus.OK);
//    }
}
