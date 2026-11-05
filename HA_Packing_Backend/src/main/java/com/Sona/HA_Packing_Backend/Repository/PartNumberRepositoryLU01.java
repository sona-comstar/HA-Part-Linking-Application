package com.Sona.HA_Packing_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.Sona.HA_Packing_Backend.Entity.PartNumberLU01;

@Repository
public interface PartNumberRepositoryLU01 extends JpaRepository<PartNumberLU01, Long>{
    @Query("SELECT COUNT(p) FROM PartNumberLU01 p WHERE CAST(p.entryDate AS DATE) = CURRENT_DATE")
    long countPartsToday();
    boolean existsBylu0101(String lu0101);
    
} 