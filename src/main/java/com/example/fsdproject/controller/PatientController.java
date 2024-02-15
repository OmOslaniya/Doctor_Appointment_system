package com.example.fsdproject.controller;

import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.Patient;
import com.example.fsdproject.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{pemail}")
    public ResponseEntity<?> getPatientByEmail(@PathVariable String pemail) {
        try {
            Optional<Patient> item = patientService.findPatientByEmail(pemail);

            if (item != null) {
                // Return the doctor object if found
                return ResponseEntity.ok(item);
            } else {
                // Return a response indicating that the doctor was not found
                Map<String, String> response = new HashMap<>();
                response.put("error", "Patient not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            // Handle other exceptions if needed
            Map<String, String> response = new HashMap<>();
            response.put("error", "Error during Patient retrieval");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Patient savePatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }
    // Add other endpoints as needed
}
