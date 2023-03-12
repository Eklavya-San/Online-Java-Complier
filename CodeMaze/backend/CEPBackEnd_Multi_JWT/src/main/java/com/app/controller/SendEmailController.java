package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.PassworChangedDto;
import com.app.service.EmailService;
import com.app.service.IOTPService;

@RestController
public class SendEmailController {

	@Autowired
	private EmailService emailService;

	@Autowired
	private IOTPService otpService;

	@GetMapping("/sendemailToStudent")
	public String sendEmail() {
		try {
			emailService.sendEmailsToStudents();
			return "Email sent to students !";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Error sending Email !";
	}

	@GetMapping("sendEmailToAdmin")
	public String sendEmailToAdmin() {
		try {
			emailService.sendEmailToAdmin();
			return "Email sent to Admin !";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Error sending Email !";
	}

	@PostMapping("/generateotp")
	public String passwordOtpGenerator(@RequestBody String username) {
		try {
			emailService.sendPasswordChangeOTP(username);
			return "OTP Sent to Email ID!!!";
		} catch (RuntimeException ex) {
			ex.printStackTrace();
		}

		return "Error Sending OTP !";
	}

	@PostMapping("/submitotp")
	public String updatePassword(@RequestBody PassworChangedDto dto) {
		System.out.println(
				"email " + dto.getEmail() + "   otp   " + dto.getOtp() + "   newPassword   " + dto.getNewPassword());
		return otpService.updatePassword(dto);

	}
}
