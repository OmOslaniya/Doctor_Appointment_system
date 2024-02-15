package com.example.fsdproject.entity;

import jakarta.persistence.*;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    private String slot;

    public Appointment() {
        // Default constructor
    }

    public Appointment(Long appointmentId, Patient patient, Schedule schedule, String slot) {
        this.appointmentId = appointmentId;
        this.patient = patient;
        this.schedule = schedule;
        this.slot = slot;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

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
}
