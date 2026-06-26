package com.control.deudas.service;

import com.control.deudas.dto.DebtDTO;
import com.control.deudas.model.Debt;
import com.control.deudas.model.User;
import com.control.deudas.repository.DebtRepository;
import com.control.deudas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DebtService {

    @Autowired
    private DebtRepository debtRepository;

    @Autowired
    private UserRepository userRepository;

    public List<DebtDTO> getMyDebts(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return debtRepository.findByUserId(user.getId()).stream()
                .map(DebtDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<DebtDTO> getDebtsByUserId(Long userId) {
        return debtRepository.findByUserId(userId).stream()
                .map(DebtDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<DebtDTO> getAllDebts() {
        return debtRepository.findAll().stream()
                .map(DebtDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public DebtDTO createDebt(DebtDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Debt debt = Debt.builder()
                .user(user)
                .debtType(request.getDebtType())
                .description(request.getDescription())
                .amount(request.getOriginalAmount()) // Inicialmente igual al monto original
                .originalAmount(request.getOriginalAmount())
                .interestRate(request.getInterestRate())
                .issueDate(request.getIssueDate())
                .dueDate(request.getDueDate())
                .status(request.getStatus() != null ? request.getStatus() : "PENDIENTE")
                .build();

        return DebtDTO.fromEntity(debtRepository.save(debt));
    }

    public DebtDTO updateDebt(Long id, DebtDTO request) {
        Debt debt = debtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Debt not found"));

        debt.setDebtType(request.getDebtType());
        debt.setDescription(request.getDescription());
        debt.setOriginalAmount(request.getOriginalAmount());
        debt.setInterestRate(request.getInterestRate());
        debt.setIssueDate(request.getIssueDate());
        debt.setDueDate(request.getDueDate());
        
        // No actualizamos amount si ya hay pagos calculados, a menos que sea forzado
        if (request.getAmount() != null) {
            debt.setAmount(request.getAmount());
        }
        if (request.getStatus() != null) {
            debt.setStatus(request.getStatus());
        }

        return DebtDTO.fromEntity(debtRepository.save(debt));
    }
}
