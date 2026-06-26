package com.control.deudas.controller;

import com.control.deudas.dto.PaymentDTO;
import com.control.deudas.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    @PreAuthorize("hasAnyRole('CAJERO', 'ADMIN')")
    public ResponseEntity<PaymentDTO> registerPayment(@RequestBody PaymentDTO request, Authentication authentication) {
        return ResponseEntity.ok(paymentService.registerPayment(request, authentication.getName()));
    }

    @GetMapping("/debt/{debtId}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByDebt(@PathVariable Long debtId) {
        return ResponseEntity.ok(paymentService.getPaymentsByDebt(debtId));
    }
}
