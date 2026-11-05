package com.Sona.HA_Packing_Backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Sona.HA_Packing_Backend.Entity.PartNumber;

@Repository
public interface PartNumberRepository extends JpaRepository<PartNumber, Long> {
    @Query("SELECT COUNT(p) FROM PartNumber p WHERE CAST(p.entryDate AS DATE) = CURRENT_DATE")
    long countPartsToday();
    boolean existsByHa01s2(String ha01s2);
    boolean existsByHa01s3(String ha01s3);
    boolean existsByHa0101(String ha0101);
}
