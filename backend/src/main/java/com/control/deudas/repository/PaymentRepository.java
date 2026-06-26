package com.control.deudas.repository;

import com.control.deudas.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByDebtIdOrderByPaymentDateDesc(Long debtId);
}
