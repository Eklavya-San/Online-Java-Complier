package com.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ApiResponse;
import com.app.entity.Admin;
import com.app.entity.Login;
import com.app.entity.OTP;
import com.app.entity.OTPGenerator;
import com.app.entity.Student;
import com.app.repository.ILoginRepository;
import com.app.repository.IStudentRepository;
import com.app.repository.OTPRepository;

@Service
@Transactional
public class EmailService {

	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private IStudentRepository studentRepository;

	@Autowired
	private IAdminService adminService;

	@Autowired
	private ILoginRepository loginRepository;

	@Autowired
	private OTPRepository otpRepository;

	public void sendEmailsToStudents() {

		List<Student> students = studentRepository.findAll();
		for (Student student : students) {
			String email = student.getStdEmail();
			String password = student.getStdPassword();
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(email);
			message.setSubject("Login Credentials for Student of DACCODER.COM- IACSD Coding Exam Portal");
			String studentname = student.getStdFirstname();
			message.setText("Dear " + studentname + ",\n"
					+ "I am writing to provide you with your login Username and Password for User of DACCODER.COM- IACSD Coding Exam Portal. Please keep this information secure and do not share it with anyone.\n"
					+ "\n" + "Username/Login: " + email + "\n" + "Password: " + password + "\n" + "\n"
					+ "Please note that you may be required to change your password upon first login for security purposes. If you have any trouble logging in or accessing your account, please feel free to contact us for assistance.\n"
					+ "\n"
					+ "We recommend that you change your password periodically to ensure the security of your account.\n"
					+ "\n" + "Thank you for using our portal.\n" + "\n" + "Best regards," + "\n" + "The Developer Team"
					+ "\n" + "DACCODER.COM" + "\n" + "Durgesh, Siddhant, Eklavya");
			javaMailSender.send(message);
		}
	}

	public void sendEmailToAdmin() {
		List<Admin> admins = adminService.getAll();
		for (Admin admin : admins) {
			String email = admin.getAdminEmail();
			String password = admin.getAdminPassword();
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(email);
			message.setSubject("Login Credentials for Admin of DACCODER.COM- IACSD Coding Exam Portal");
			String adminname = admin.getAdminFirstname();
			message.setText("Dear " + adminname + ",\n\n"
					+ "I am writing to provide you with your login Username and Password for Admin of DACCODER.COM- IACSD Coding Exam Portal. Please keep this information secure and do not share it with anyone.\n"
					+ "\n" + "Username/Login: " + email + "\n" + "Password: " + password + "\n" + "\n"
					+ "Please note that you may be required to change your password upon first login for security purposes. If you have any trouble logging in or accessing your account, please feel free to contact us for assistance.\n"
					+ "\n"
					+ "We recommend that you change your password periodically to ensure the security of your account.\n"
					+ "\n" + "Thank you for using our portal.\n" + "\n" + "Best regards," + "\n" + "The Developer Team"
					+ "\n" + "Durgesh, Siddhant, Eklavya");
			javaMailSender.send(message);
		}
	}

	public ApiResponse sendPasswordChangeOTP(String username) {
		System.out.println(username);
		try {
			Login login = loginRepository.findById(username).get();
		} catch (NoSuchElementException e) {
			return new ApiResponse("Invalid Email ID!!!");
		}

		String otp = OTPGenerator.OTP();
		OTP otp1 = new OTP(username, otp);
		otpRepository.save(otp1);

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(username);
		message.setSubject("Password Reset OTP for DACCODER.COM- IACSD Coding Exam Portal");
		message.setText("Dear User,\n" + "\n"
				+ "We have received a request to reset the password for your account on DACCODER.COM. To verify your identity, please use the following One-Time Password (OTP): "
				+ otp + "\n"
				+ "Please enter this OTP code on the password reset page to complete the process. This OTP is valid for the next 10 minutes only.\n"
				+ "\n"
				+ "If you did not request a password reset, please ignore this email. If you have any concerns, please contact our support team at DACCODER.COM\n"
				+ "\n" + "Best regards," + "\n" + "The Developer Team" + "\n" + "DACCODER.COM" + "\n"
				+ "Durgesh, Siddhant, Eklavya");
		javaMailSender.send(message);
		System.out.println("Email Sent!");
		return new ApiResponse("OTP Sent to your Email ID!!!");

	}
}
