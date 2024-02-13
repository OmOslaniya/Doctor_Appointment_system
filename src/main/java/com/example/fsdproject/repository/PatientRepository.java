package com.example.fsdproject.repository;

import com.example.fsdproject.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // You can add custom query methods here if needed
    Patient findByName(String name);
    Optional<Patient> findByEmail(String email);
}
