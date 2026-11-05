package com.Sona.HA_Packing_Backend.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "LU0101Parts", 
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "LU0101"),
       })
public class PartNumberLU01 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "EntryDate", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime entryDate = LocalDateTime.now();

    @Column(name = "LU0101", length = 30, nullable = false, unique = true)
    private String lu0101;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDateTime entryDate) {
        this.entryDate = entryDate;
    }

    public String getLu0101() {
        return lu0101;
    }

    public void setLu0101(String lu0101) {
        this.lu0101 = lu0101;
    }

    public PartNumberLU01(Long id, LocalDateTime entryDate, String lu0101) {
        this.id = id;
        this.entryDate = entryDate;
        this.lu0101 = lu0101;
    }

    public PartNumberLU01() {
    }

    @Override
    public String toString() {
        return "PartNumberLU01 [id=" + id + ", entryDate=" + entryDate + ", lu0101=" + lu0101 + "]";
    }


}
