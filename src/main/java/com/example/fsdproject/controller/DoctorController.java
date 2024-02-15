package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {


    @Autowired
    private DoctorService doctorService;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{doctorId}")
    public ResponseEntity<?> getDoctorById(@PathVariable long doctorId) {
        try {
            Doctor item = doctorService.getDoctorById(doctorId);

            if (item != null) {
                // Return the doctor object if found
                return ResponseEntity.ok(item);
            } else {
                // Return a response indicating that the doctor was not found
                Map<String, String> response = new HashMap<>();
                response.put("error", "Doctor not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            // Handle other exceptions if needed
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during doctor retrieval");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Doctor saveDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }
    // Add other endpoints as needed
}
