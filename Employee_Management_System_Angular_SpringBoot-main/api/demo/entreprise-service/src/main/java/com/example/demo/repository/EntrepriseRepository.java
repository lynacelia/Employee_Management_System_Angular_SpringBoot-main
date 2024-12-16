package com.example.demo.repository;

import com.example.demo.model.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {

    // Méthode pour récupérer une entreprise par son nom
    List<Entreprise> findByNom(String nom);  // Remplacer 'name' par 'nom'

    // Méthode pour récupérer une entreprise par son ID
    Entreprise findById(long id);

}


