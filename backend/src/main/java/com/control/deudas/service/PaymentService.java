package com.control.deudas.service;

import com.control.deudas.dto.PaymentDTO;
import com.control.deudas.model.Debt;
import com.control.deudas.model.Payment;
import com.control.deudas.model.User;
import com.control.deudas.repository.DebtRepository;
import com.control.deudas.repository.PaymentRepository;
import com.control.deudas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private DebtRepository debtRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public PaymentDTO registerPayment(PaymentDTO request, String username) {
        Debt debt = debtRepository.findById(request.getDebtId())
                .orElseThrow(() -> new RuntimeException("Debt not found"));

        User recordedBy = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Payment payment = Payment.builder()
                .debt(debt)
                .user(recordedBy)
                .amount(request.getAmount())
                .paymentDate(request.getPaymentDate() != null ? request.getPaymentDate() : LocalDateTime.now())
                .paymentMethod(request.getPaymentMethod())
                .referenceNumber(request.getReferenceNumber())
                .notes(request.getNotes())
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        // Actualizar el saldo restante de la deuda
        // Para esto se asume que amount es lo que queda (se resta al momento de ver), 
        // pero podemos restar del originalAmount.
        // Segun requerimiento: "Calcular el saldo pendiente de cada deuda sumando los pagos y restando del monto total"
        // Actualizamos amount:
        BigDecimal totalPayments = paymentRepository.findByDebtIdOrderByPaymentDateDesc(debt.getId())
                .stream().map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal remaining = debt.getOriginalAmount().subtract(totalPayments);
        
        debt.setAmount(remaining);
        
        if (remaining.compareTo(BigDecimal.ZERO) <= 0) {
            debt.setStatus("PAGADA");
            debt.setAmount(BigDecimal.ZERO);
        } else if (remaining.compareTo(debt.getOriginalAmount()) < 0) {
            debt.setStatus("PARCIAL");
        }
        
        debtRepository.save(debt);

        return PaymentDTO.fromEntity(savedPayment);
    }

    public List<PaymentDTO> getPaymentsByDebt(Long debtId) {
        return paymentRepository.findByDebtIdOrderByPaymentDateDesc(debtId).stream()
                .map(PaymentDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
