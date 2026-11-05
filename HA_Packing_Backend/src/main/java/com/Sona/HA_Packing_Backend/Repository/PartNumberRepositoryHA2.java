package com.Sona.HA_Packing_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Sona.HA_Packing_Backend.Entity.PartNumberHA2;

@Repository
public interface PartNumberRepositoryHA2 extends JpaRepository<PartNumberHA2, Long> {
    @Query("SELECT COUNT(p) FROM PartNumberHA2 p WHERE CAST(p.entryDate AS DATE) = CURRENT_DATE")
    long countPartsToday();
    boolean existsByHa01s4(String ha01s4);
    boolean existsByHa01s5(String ha01s5);
    boolean existsByHa0102(String ha0102);
}

