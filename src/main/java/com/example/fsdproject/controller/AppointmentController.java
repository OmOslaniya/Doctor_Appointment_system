package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Appointment;
import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.Patient;
import com.example.fsdproject.entity.Schedule;
import com.example.fsdproject.repository.AppointmentRepository;
import com.example.fsdproject.repository.DoctorRepository;
import com.example.fsdproject.repository.PatientRepository;
import com.example.fsdproject.repository.ScheduleRepository;
import com.example.fsdproject.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentRepository appointmentRepository;

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


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{pemail}")
    public ResponseEntity<?> getAppointments(@PathVariable String pemail) {
        try {
            System.out.println(pemail);
            Patient patient = patientRepository.findByEmail(pemail).orElse(null);
            List<Appointment> appointments = appointmentService.getAppointmentsByPatient(patient);

            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            // Handle other exceptions if needed
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during doctor retrieval");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    static class abc{
        public Schedule schedule;
        public abc(){}

        public Schedule getSchedule() {
            return schedule;
        }

        public void setSchedule(Schedule schedule) {
            this.schedule = schedule;
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/getallappointments")
    public ResponseEntity<List<Appointment>> getallAppointments(@RequestBody abc a) {
        try {
            System.out.println("entered");
            System.out.println(a.getSchedule());
            List<Appointment> appointments = appointmentService.getAppointmentsBySchedule(a.getSchedule());
            System.out.println(appointments);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    static class abc2{
        public Schedule schedule;
        public String slot;
        public String email;

        public abc2(){}

        public Schedule getSchedule() {
            return schedule;
        }

        public void setSchedule(Schedule schedule) {
            this.schedule = schedule;
        }

        public String getSlot() {
            return slot;
        }

        public void setSlot(String slot) {
            this.slot = slot;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/removeselectedappointment")
    public ResponseEntity<List<Appointment>> removeSelectedSchedule(@RequestBody abc2 a) {
        try {
            System.out.println("entered aaa");
            System.out.println(a.getSchedule());
            System.out.println(a.getSlot());

            Appointment appointment = appointmentRepository.findByScheduleAndSlot(a.getSchedule(),a.getSlot());

            appointmentRepository.delete(appointment);
            System.out.println("deleted");

            return ResponseEntity.ok(null);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/cancelappointment")
    public ResponseEntity<?> cancelAppointment(@RequestBody abc2 a) {
        try {
            System.out.println("inside...");
            System.out.println(a.getSlot());
            System.out.println(a.getEmail());
            Appointment appointment = appointmentRepository.findByScheduleAndSlot(a.getSchedule(), a.getSlot());

            if (appointment != null) {
                appointmentRepository.delete(appointment);
                System.out.println("Appointment canceled");

                Schedule schedule= a.getSchedule();
                String slot= a.getSlot();

                switch (slot) {
                    case "1" -> schedule.setSlot1(false);
                    case "2" -> schedule.setSlot2(false);
                    case "3" -> schedule.setSlot3(false);
                }
                scheduleRepository.save(schedule);
                System.out.println("scheduleeee deleted");

                Patient patient= patientRepository.findByEmail(a.getEmail()).orElse(null);
                List<Appointment> updatedAppointments = appointmentService.getAppointmentsByPatient(patient);

                return ResponseEntity.ok(updatedAppointments);

            } else {
                System.out.println("Appointment not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
            }

        } catch (Exception e) {
            System.out.println("Error during appointment cancellation");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during appointment cancellation");
        }
    }

}
