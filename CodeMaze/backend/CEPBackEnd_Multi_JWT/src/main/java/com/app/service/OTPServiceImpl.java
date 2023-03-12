package com.app.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.PassworChangedDto;
import com.app.entity.Admin;
import com.app.entity.Login;
import com.app.entity.OTP;
import com.app.entity.Student;
import com.app.repository.IAdminRepository;
import com.app.repository.ILoginRepository;
import com.app.repository.IStudentRepository;
import com.app.repository.OTPRepository;

@Service
@Transactional
public class OTPServiceImpl implements IOTPService {

	@Autowired
	private OTPRepository otpRepo;

	@Autowired
	private ILoginRepository loginRepository;

	@Autowired
	private IAdminRepository adminRepository;

	@Autowired
	private IStudentRepository StudentRepository;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public OTP getUserOTPbyUserName(String userName) {
		return otpRepo.findById(userName).orElseThrow(() -> new UsernameNotFoundException("invalid user name"));
	}

	@Override
	public String updatePassword(PassworChangedDto dto) {
		OTP otp;
		try {
			otp = otpRepo.findById(dto.getEmail()).get();
		} catch (Exception e) {
			return " invalid email";
		}

		// orElseThrow(() -> new UsernameNotFoundException("invalid username"));
		if (dto.getOtp().equalsIgnoreCase(otp.getOtp())) {
			Login login = loginRepository.findById(dto.getEmail()).get();
			try {
				Admin admin = adminRepository.findByLogin(login).get();
				login.setPassword(encoder.encode(dto.getNewPassword()));
				admin.setAdminPassword(encoder.encode(dto.getNewPassword()));
				loginRepository.save(login);
				return "password changed sucessfully";
			} catch (NoSuchElementException e) {

			}
			Student student = StudentRepository.findByLogin(login).get();
			login.setPassword(encoder.encode(dto.getNewPassword()));
			student.setStdPassword(encoder.encode(dto.getNewPassword()));
			loginRepository.save(login);
			return "password changed sucessfully";
		} else
			return "OTP does not match";

	}
}
