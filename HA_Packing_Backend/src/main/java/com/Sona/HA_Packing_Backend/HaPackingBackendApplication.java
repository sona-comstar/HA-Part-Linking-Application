package com.Sona.HA_Packing_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
public class HaPackingBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HaPackingBackendApplication.class, args);
	}

}
