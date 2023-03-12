package com.app.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class PassworChangedDto {

	public PassworChangedDto(String email, String otp, String newPassword) {
		super();
		this.email = email;
		this.otp = otp;
		this.newPassword = newPassword;
	}

	private String email;

	private String otp;

	private String newPassword;
}
