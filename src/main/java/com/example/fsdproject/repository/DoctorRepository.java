package com.example.fsdproject.repository;

import com.example.fsdproject.entity.Doctor;
import com.example.fsdproject.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // You can add custom query methods here if needed
    List<Doctor> findBySpecialization(String specialization);
    Optional<Doctor> findByEmail(String email);



}
