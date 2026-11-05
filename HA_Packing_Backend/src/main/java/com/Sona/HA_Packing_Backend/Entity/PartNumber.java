package com.Sona.HA_Packing_Backend.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "HA0101Parts", 
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "HA01S2"),
           @UniqueConstraint(columnNames = "HA01S3"),
           @UniqueConstraint(columnNames = "HA0101")
       })
public class PartNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "EntryDate", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime entryDate = LocalDateTime.now();

    @Column(name = "HA01S2", length = 25, nullable = false, unique = true)
    private String ha01s2;

    @Column(name = "HA01S3", length = 25, nullable = false, unique = true)
    private String ha01s3;

    @Column(name = "HA0101", length = 25, nullable = false, unique = true)
    private String ha0101;

    // Constructors
    public PartNumber() {
    }

    public PartNumber(String ha01s2, String ha01s3, String ha0101) {
        this.ha01s2 = ha01s2;
        this.ha01s3 = ha01s3;
        this.ha0101 = ha0101;
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

    public String getHa01s2() {
        return ha01s2;
    }

    public void setHa01s2(String ha01s2) {
        this.ha01s2 = ha01s2;
    }

    public String getHa01s3() {
        return ha01s3;
    }

    public void setHa01s3(String ha01s3) {
        this.ha01s3 = ha01s3;
    }

    public String getHa0101() {
        return ha0101;
    }

    public void setHa0101(String ha0101) {
        this.ha0101 = ha0101;
    }

    // toString() method
    @Override
    public String toString() {
        return "PartNumber{" +
                "id=" + id +
                ", entryDate=" + entryDate +
                ", ha01s2='" + ha01s2 + '\'' +
                ", ha01s3='" + ha01s3 + '\'' +
                ", ha0101='" + ha0101 + '\'' +
                '}';
    }
}