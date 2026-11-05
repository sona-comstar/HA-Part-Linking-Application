package com.Sona.HA_Packing_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Sona.HA_Packing_Backend.Entity.PartNumberHA2;
import com.Sona.HA_Packing_Backend.Service.PartNumberServiceHA2;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;

@RestController
@RequestMapping("/api/parts/part-numbersHA2")
@CrossOrigin(origins = "*")
public class PartNumberControllerHA2 {
    private static final Logger logger = LoggerFactory.getLogger(PartNumberControllerHA2.class);

    @Autowired
    private PartNumberServiceHA2 service;

    @PostMapping("/save")
    public ResponseEntity<?> savePart(@RequestBody PartNumberHA2 part) {
        // Validate part numbers
        if (!isValid(part.getHa01s4(), "P-00176913C.1M") ||
            !isValid(part.getHa01s5(), "P-00176834B.2M") ||
            !isValid(part.getHa0102(), "P-00176170D.1M")) {
            
            logger.warn("Validation failed for part: {}", part);
            return ResponseEntity.badRequest().body("Invalid Part Number Format!");
        }

        try {
            // Check for duplicates before saving
            if (service.existsByHa01s4(part.getHa01s4())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Part HA01S4 already exists: " + part.getHa01s4());
            }
            if (service.existsByHa01s5(part.getHa01s5())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Part HA01S5 already exists: " + part.getHa01s5());
            }
            if (service.existsByHa0102(part.getHa0102())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Part HA0102 already exists: " + part.getHa0102());
            }
            if (!service.existsinGrindingHa01s4(part.getHa01s4())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Grinding Data Not Found: " + part.getHa01s4());
            }
            if (!service.existsinGrindingHa01s5(part.getHa01s5())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Grinding Data Not Found: " + part.getHa01s5());
            }

            PartNumberHA2 savedPart = service.savePart(part);
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
            case "ha01s4":
                exists = (service.existsByHa01s4(value) || !service.existsinGrindingHa01s4(value));
                break;
            case "ha01s5":
                exists = (service.existsByHa01s5(value) || !service.existsinGrindingHa01s5(value));
                break;
            case "ha0102":
                exists = service.existsByHa0102(value);
                break;
            default:
                return ResponseEntity.badRequest().body(false);
        }
        
        return ResponseEntity.ok(exists);
    }

    private boolean isValid(String part, String prefix) {
        return part != null && part.startsWith(prefix) && part.length() == 23;
    }
}
