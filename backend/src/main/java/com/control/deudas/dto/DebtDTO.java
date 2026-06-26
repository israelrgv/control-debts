package com.control.deudas.dto;

import com.control.deudas.model.Debt;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DebtDTO {
    private Long id;
    private Long userId;
    private UserDTO user;
    private String debtType;
    private String description;
    private BigDecimal amount;
    private BigDecimal originalAmount;
    private BigDecimal interestRate;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static DebtDTO fromEntity(Debt debt) {
        if (debt == null) return null;
        return DebtDTO.builder()
                .id(debt.getId())
                .userId(debt.getUser() != null ? debt.getUser().getId() : null)
                .user(UserDTO.fromEntity(debt.getUser()))
                .debtType(debt.getDebtType())
                .description(debt.getDescription())
                .amount(debt.getAmount())
                .originalAmount(debt.getOriginalAmount())
                .interestRate(debt.getInterestRate())
                .issueDate(debt.getIssueDate())
                .dueDate(debt.getDueDate())
                .status(debt.getStatus())
                .createdAt(debt.getCreatedAt())
                .updatedAt(debt.getUpdatedAt())
                .build();
    }
}
