package com.jpn2018.veservice.controller;

import com.jpn2018.veservice.client.GheClient;
import com.jpn2018.veservice.client.LichChieuClient;
import com.jpn2018.veservice.dto.VeDto;
import com.jpn2018.veservice.dto.VeFullResponse;
import com.jpn2018.veservice.entity.Ve;
import com.jpn2018.veservice.service.VeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ves")
@CrossOrigin(origins = "http://localhost:3000")
public class VeController {

    @Autowired
    private VeService veService;
    @Autowired
    private GheClient gheClient;
    @Autowired
    private LichChieuClient lichChieuClient;

    @PostMapping
    public Ve createVe(@RequestBody Ve ve) {
        return veService.saveVe(ve);
    }

    @GetMapping
    public List<Ve> getAllVes() {
        return veService.getAllVes();
    }

    @GetMapping("/{id}")
    public Ve getVeById(@PathVariable Long id) {
        return veService.getVeById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteVe(@PathVariable Long id) {
        veService.deleteVeById(id);
        return "Deleted Ve with ID: " + id;
    }

    @PutMapping("/{id}")
    public Ve updateVe(@PathVariable Long id, @RequestBody Ve ve) {
        return veService.updateVe(id, ve);
    }

    @GetMapping("/lichchieus/{lichChieuId}")
    public List<VeFullResponse> getVeByLichChieu(@PathVariable Long lichChieuId) {
        return veService.findVeByLichChieu(lichChieuId);
    }

    @GetMapping("/dtos")
    public ResponseEntity<?> getAllVeDtos() {
        return ResponseEntity.ok(veService.getAllVeDtos());
    }

    @GetMapping("/dtos/{id}")
    public ResponseEntity<VeDto> getVeDtoById(@PathVariable Long id) {
        return ResponseEntity.ok(veService.getVeDtoById(id));
    }
}
