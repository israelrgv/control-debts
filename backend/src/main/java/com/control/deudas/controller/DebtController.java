package com.control.deudas.controller;

import com.control.deudas.dto.DebtDTO;
import com.control.deudas.service.DebtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debts")
public class DebtController {

    @Autowired
    private DebtService debtService;

    @GetMapping("/my-debts")
    public ResponseEntity<List<DebtDTO>> getMyDebts(Authentication authentication) {
        return ResponseEntity.ok(debtService.getMyDebts(authentication.getName()));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('CAJERO', 'ADMIN')")
    public ResponseEntity<List<DebtDTO>> getDebtsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(debtService.getDebtsByUserId(userId));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('CAJERO', 'ADMIN')")
    public ResponseEntity<List<DebtDTO>> getAllDebts() {
        return ResponseEntity.ok(debtService.getAllDebts());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CAJERO', 'ADMIN')")
    public ResponseEntity<DebtDTO> createDebt(@RequestBody DebtDTO request) {
        return ResponseEntity.ok(debtService.createDebt(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('CAJERO', 'ADMIN')")
    public ResponseEntity<DebtDTO> updateDebt(@PathVariable Long id, @RequestBody DebtDTO request) {
        return ResponseEntity.ok(debtService.updateDebt(id, request));
    }
}
