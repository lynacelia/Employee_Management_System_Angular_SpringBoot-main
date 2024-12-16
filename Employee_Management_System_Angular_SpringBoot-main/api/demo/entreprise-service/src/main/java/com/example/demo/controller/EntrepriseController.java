package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Entreprise;
import com.example.demo.repository.EntrepriseRepository;
import com.example.demo.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class EntrepriseController {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @GetMapping("/entreprises")
    public List<Entreprise> getAllEntreprises() {
        return entrepriseRepository.findAll();
    }

    @PostMapping("/entreprises")
    public Entreprise createEntreprise(@RequestBody Entreprise entreprise) {
        return entrepriseRepository.save(entreprise);
    }

    @GetMapping("/entreprises/{id}")
    public ResponseEntity<Entreprise> getEntrepriseById(@PathVariable Long id) {
        Entreprise entreprise = entrepriseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entreprise not exist with id :" + id));
        return ResponseEntity.ok(entreprise);
    }

    @PutMapping("/entreprises/{id}")
    public ResponseEntity<Entreprise> updateEntreprise(@PathVariable Long id, @RequestBody Entreprise entrepriseDetails) {
        Entreprise entreprise = entrepriseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entreprise not exist with id :" + id));

        entreprise.setNom(entrepriseDetails.getNom());  // Mettre à jour le nom de l'entreprise
        entreprise.setAdresse(entrepriseDetails.getAdresse());  // Mettre à jour l'adresse de l'entreprise

        Entreprise updatedEntreprise = entrepriseRepository.save(entreprise);
        return ResponseEntity.ok(updatedEntreprise);
    }

    @DeleteMapping("/entreprises/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEntreprise(@PathVariable Long id) {
        Entreprise entreprise = entrepriseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entreprise not exist with id :" + id));

        entrepriseRepository.delete(entreprise);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
