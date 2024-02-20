package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.Schedule;
import com.example.fsdproject.repository.DoctorRepository;
import com.example.fsdproject.repository.ScheduleRepository;
import com.example.fsdproject.service.AppointmentService;
import com.example.fsdproject.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
    public ResponseEntity<?> bookschedule(@RequestBody abc a) {
        try{
            System.out.println("Enteredddd");
           System.out.println(a.getDate());
           Schedule s = scheduleService.findByDoctorAndDate(a.getDoctor(),a.getDate());

           if(s!=null) {
               switch (a.getSlot()) {
                   case "1" -> s.setSlot1(true);
                   case "2" -> s.setSlot2(true);
                   case "3" -> s.setSlot3(true);
               }
               scheduleService.bookSchedule(s);
               return ResponseEntity.ok(s);

           }
           else{
               System.out.println("inside else");
               Schedule s1= new Schedule();
               s1.setDoctor(a.getDoctor());
               s1.setDate(a.getDate());

               if(a.getSlot().equals("1"))
               {
                   s1.setSlot1(true);
                   s1.setSlot2(false);
                   s1.setSlot3(false);
               }
               else if(a.getSlot().equals("2"))
               {
                   s1.setSlot1(false);
                   s1.setSlot2(true);
                   s1.setSlot3(false);
               }
               else if(a.getSlot().equals("3"))
               {
                   s1.setSlot1(false);
                   s1.setSlot2(false);
                   s1.setSlot3(true);
               }
               scheduleService.bookSchedule(s1);
               return ResponseEntity.ok(s1);

           }
            }catch (Exception e) {
            // Handle other exceptions if needed
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during doctor retrieval");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
//            return new ResponseEntity<>("schedule booked successfully", HttpStatus.CREATED);

    }

    static class abc2{
        public Doctor doctor;
        public LocalDate date;

        public abc2(){}
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

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/giveschedules")
    public ResponseEntity<Schedule> giveSchedule(@RequestBody abc2 a)  {
        try {
            System.out.println(a.getDoctor());
            System.out.println(a.getDate());

            Schedule schedule= scheduleService.findByDoctorAndDate(a.getDoctor(),a.getDate());

            if(schedule!=null)
            {
                return ResponseEntity.ok(schedule);
            }
            else{
                Schedule schedule1=new Schedule();
                schedule1.setDoctor(a.getDoctor());
                schedule1.setDate(a.getDate());
                schedule1.setSlot1(false);
                schedule1.setSlot2(false);
                schedule1.setSlot3(false);
                return ResponseEntity.ok(schedule1);

            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

}
