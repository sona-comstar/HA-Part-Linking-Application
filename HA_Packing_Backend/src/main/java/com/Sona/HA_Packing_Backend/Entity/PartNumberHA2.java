package com.Sona.HA_Packing_Backend.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "HA0102Parts", 
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "HA01S5"),
           @UniqueConstraint(columnNames = "HA01S5"),
           @UniqueConstraint(columnNames = "HA0102")
       })
public class PartNumberHA2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "EntryDate", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime entryDate = LocalDateTime.now();

    @Column(name = "HA01S4", length = 25, nullable = false, unique = true)
    private String ha01s4;

    @Column(name = "HA01S5", length = 25, nullable = false, unique = true)
    private String ha01s5;

    @Column(name = "HA0102", length = 25, nullable = false, unique = true)
    private String ha0102;

    // Constructors
    public PartNumberHA2() {
    }

    public PartNumberHA2(String ha01s4, String ha01s5, String ha0102) {
        this.ha01s4 = ha01s4;
        this.ha01s5 = ha01s5;
        this.ha0102 = ha0102;
    }

    // Getters and Setters
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

    public String getHa01s4() {
        return ha01s4;
    }

    public void setHa01s4(String ha01s4) {
        this.ha01s4 = ha01s4;
    }

    public String getHa01s5() {
        return ha01s5;
    }

    public void setHa01s5(String ha01s5) {
        this.ha01s5 = ha01s5;
    }

    public String getHa0102() {
        return ha0102;
    }

    public void setHa0102(String ha0102) {
        this.ha0102 = ha0102;
    }

    // toString() method
    @Override
    public String toString() {
        return "PartNumber{" +
                "id=" + id +
                ", entryDate=" + entryDate +
                ", ha01s4='" + ha01s4 + '\'' +
                ", ha01s5='" + ha01s5 + '\'' +
                ", ha0102='" + ha0102 + '\'' +
                '}';
    }
}