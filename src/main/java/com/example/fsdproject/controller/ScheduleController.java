package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.Schedule;
import com.example.fsdproject.repository.DoctorRepository;
import com.example.fsdproject.repository.ScheduleRepository;
import com.example.fsdproject.service.AppointmentService;
import com.example.fsdproject.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;


    static class abc{
        public Doctor doctor;
        public LocalDate date;
        public Long scheduleId;
        public String slot;

        public abc(){}
        public Doctor getDoctor() {
            return doctor;
        }

        public void setDoctor(Doctor doctor) {
            this.doctor = doctor;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public Long getScheduleId() {
            return scheduleId;
        }

        public void setScheduleId(Long scheduleId) {
            this.scheduleId = scheduleId;
        }

        public String getSlot() {
            return slot;
        }

        public void setSlot(String slot) {
            this.slot = slot;
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/book")

    public ResponseEntity<?> bookAppointment(@RequestBody abc a) {
        try{
            Doctor doctor= a.getDoctor();
            LocalDate date = a.getDate();
            System.out.println(a.getDoctor());
            System.out.println(a.getDate());

            Schedule schedule= scheduleRepository.findByDoctorAndDate(doctor, date);

            if(schedule!=null) {
                System.out.println("inside if");
                switch (a.getSlot()) {
                    case "1" -> schedule.setSlot1(true);
                    case "2" -> schedule.setSlot2(true);
                    case "3" -> schedule.setSlot3(true);
                }
                scheduleService.bookSchedule(schedule);
                return ResponseEntity.ok(schedule);
            }
            else {
                Schedule schedule2= new Schedule();
                schedule2.setDoctor(a.getDoctor());
                schedule2.setDate(a.getDate());
                System.out.println("inside else");
                System.out.println(a.getSlot());
                if(a.getSlot().equals("1"))
                {
                    System.out.println("inside else else esle ");
                    schedule2.setSlot1(true);
                    System.out.println("slotttt "+schedule2.getSlot1());
                    schedule2.setSlot2(false);
                    schedule2.setSlot3(false);
                }
                else if(a.getSlot().equals("2"))
                {
                    schedule2.setSlot1(false);
                    schedule2.setSlot2(true);
                    schedule2.setSlot3(false);
                }
                else if(a.getSlot().equals("3"))
                {
                    schedule2.setSlot1(false);
                    schedule2.setSlot2(false);
                    schedule2.setSlot3(true);
                }
//                System.out.println(schedule.isSlot1());
//                System.out.println(schedule.isSlot2());
//                System.out.println(schedule.isSlot3());
//                System.out.println(schedule2);
                scheduleService.bookSchedule(schedule2);
                return ResponseEntity.ok(schedule2);

            }
            }catch (Exception e) {
            // Handle other exceptions if needed
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during doctor retrieval");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
//            return new ResponseEntity<>("schedule booked successfully", HttpStatus.CREATED);

    }
//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping
//    public ResponseEntity<List<Appointment>> getAppointments() {
//        List<Appointment> appointments = appointmentService.getAllAppointments();
//        return new ResponseEntity<>(appointments, HttpStatus.OK);
//    }
}
