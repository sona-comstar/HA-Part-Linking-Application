package com.Sona.HA_Packing_Backend.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Sona.HA_Packing_Backend.Entity.PartNumberLU01;
import com.Sona.HA_Packing_Backend.Service.PartNumberServiceLU01;

@RestController
@RequestMapping("/api/parts/part-numbersLU0101")
@CrossOrigin(origins = "*")
public class PartNumberControllerLU0101 {
private static final Logger logger = LoggerFactory.getLogger(PartNumberControllerLU0101.class);

    @Autowired
    private PartNumberServiceLU01 service;

    @PostMapping("/save")
    public ResponseEntity<?> savePart(@RequestBody PartNumberLU01 part) {
        // Validate part numbers
        if (!isValid(part.getLu0101(), "P11-P09082-01:S")) {
            
            logger.warn("Validation failed for part: {}", part);
            return ResponseEntity.badRequest().body("Invalid Part Number Format!");
        }

        try {
            // Check for duplicates before saving
            if (service.existsBylu0101(part.getLu0101())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Part lu0101 already exists: " + part.getLu0101());
            }

            if (!service.existsinGrindinglu0101(part.getLu0101())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Grinding Data Not Found: " + part.getLu0101());
            }
            

            PartNumberLU01 savedPart = service.savePart(part);
            logger.info("Part Saved Successfully: {}", savedPart);
            return ResponseEntity.ok(savedPart);
            
        } catch (DataIntegrityViolationException e) {
            logger.error("Duplicate part number detected: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                   .body("Duplicate part number detected");
        } catch (Exception e) {
            logger.error("Error saving part: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("Error saving part: " + e.getMessage());
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCountToday() {
        long count = service.getCountToday();
        logger.info("Total parts scanned today: {}", count);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/check-duplicate")
    public ResponseEntity<Boolean> checkDuplicate(
            @RequestParam String field,
            @RequestParam String value) {
        
        boolean exists = false;
        switch(field.toLowerCase()) {
            case "lu0101":
                exists = (service.existsBylu0101(value));
                break;
            default:
                return ResponseEntity.badRequest().body(false);
        }
        
        return ResponseEntity.ok(exists);
    }

    private boolean isValid(String part, String prefix) {
        return part != null && part.startsWith(prefix) && part.length() == 30;
    }
}
