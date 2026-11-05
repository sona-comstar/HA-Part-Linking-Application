package com.Sona.HA_Packing_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Sona.HA_Packing_Backend.Entity.PartNumber;
import com.Sona.HA_Packing_Backend.Service.PartNumberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;

@RestController
@RequestMapping("/api/parts/part-numbers")
@CrossOrigin(origins = "*")
public class PartNumberController {
    private static final Logger logger = LoggerFactory.getLogger(PartNumberController.class);

    @Autowired
    private PartNumberService service;

    @PostMapping("/save")
    public ResponseEntity<?> savePart(@RequestBody PartNumber part) {
        // Validate part numbers
        if (!isValid(part.getHa01s2(), "P-00176874C.1M", 25079) ||
        !isValid(part.getHa01s3(), "P-00176928B.1M", 0) ||      // assuming no check on number for ha01s3
        !isValid(part.getHa0101(), "P-00176171C.1M", 25084)) {

        logger.warn("Validation failed for part: {}", part);
        return ResponseEntity.badRequest().body("Invalid Part Number Format!");
    }

        try {
            // Check for duplicates before saving
            if (service.existsByHa01s2(part.getHa01s2())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Part HA01S2 already exists: " + part.getHa01s2());
            }
            if (service.existsByHa01s3(part.getHa01s3())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Part HA01S3 already exists: " + part.getHa01s3());
            }
            if (service.existsByHa0101(part.getHa0101())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Part HA0101 already exists: " + part.getHa0101());
            }
             if (!service.existsinGrindingHa01s2(part.getHa01s2())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Grinding Data Not Found: " + part.getHa01s2());
            }
            if (!service.existsinGrindingHa01s3(part.getHa01s3())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                       .body("Grinding Data Not Found: " + part.getHa01s3());
            }
            PartNumber savedPart = service.savePart(part);
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
            case "ha01s2":
                exists = (service.existsByHa01s2(value) || !service.existsinGrindingHa01s2(value));
                break;
            case "ha01s3":
                exists = (service.existsByHa01s3(value) || !service.existsinGrindingHa01s3(value));
                break;
            case "ha0101":
                exists = service.existsByHa0101(value);
                break;
            default:
                return ResponseEntity.badRequest().body(false);
        }
        
        return ResponseEntity.ok(exists);
    }

    private boolean isValid(String part, String prefix, int minNumberAfterPrefix) {
        if (part == null || !part.startsWith(prefix) || part.length() != 23) {
            return false;
        }
    
        // Expected format length check (prefix + 5 digits at least)
        int prefixLength = prefix.length();
        if (part.length() < prefixLength + 5) {
            return false;
        }
    
        try {
            // Extract 5 digits after the prefix
            String numberPart = part.substring(prefixLength, prefixLength + 5);
    
            // Check if it's a number and greater than the minimum
            int numericValue = Integer.parseInt(numberPart);
            return numericValue > minNumberAfterPrefix;
    
        } catch (NumberFormatException | IndexOutOfBoundsException e) {
            return false;
        }
    }
    
}