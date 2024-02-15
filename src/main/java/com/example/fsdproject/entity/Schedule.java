package com.example.fsdproject.entity;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;
    private LocalDate date;
    private boolean slot1;
    private boolean slot2;
    private boolean slot3;
    private String status; // e.g., booked, canceled

    // Constructors, getters, and setters

    public Schedule() {
        // Default constructor
    }

    public Schedule(Long scheduleId, Doctor doctor, LocalDate date, boolean slot1, boolean slot2, boolean slot3, String status) {
        this.scheduleId = scheduleId;
        this.doctor = doctor;
        this.date = date;
        this.slot1 = slot1;
        this.slot2 = slot2;
        this.slot3 = slot3;
        this.status = status;
    }

    // Getters and setters for all fields

    public Long getAppointmentId() {
        return scheduleId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.scheduleId = appointmentId;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // toString method for easy logging or debugging


    public Long getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Long scheduleId) {
        this.scheduleId = scheduleId;
    }

    public boolean getSlot1() {
        return slot1;
    }

    public void setSlot1(boolean slot1) {
        this.slot1 = slot1;
    }

    public boolean getSlot2() {
        return slot2;
    }

    public void setSlot2(boolean slot2) {
        this.slot2 = slot2;
    }

    public boolean getSlot3() {
        return slot3;
    }

    public void setSlot3(boolean slot3) {
        this.slot3 = slot3;
    }
}
