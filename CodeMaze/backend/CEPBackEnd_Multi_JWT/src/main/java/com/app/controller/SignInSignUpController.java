package com.app.controller;

import java.io.IOException;
import java.util.Collection;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AdminSignupDto;
import com.app.dto.CreateStudentDto;
import com.app.dto.LogedInUserDto;
import com.app.entity.Admin;
import com.app.entity.Student;
import com.app.jwthelper.JwtUtils;
import com.app.model.JWTRequest;
import com.app.model.JwtResponse;
import com.app.service.IAdminService;
import com.app.service.IStudentService;

@RestController
@CrossOrigin
public class SignInSignUpController {

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private IAdminService adminService;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private IStudentService studentService;

	@PostMapping("/signinuser")
	public ResponseEntity<?> validateAdminCreateToken(@RequestBody JWTRequest request) {
		System.out.println(
				"asvdjyasgdyddvfyuwfvdyfvuhfadsgvsgv" + request.getUsername() + " dgdfhdg" + request.getPassword());

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) {
			Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
			for (GrantedAuthority authority : authorities) {
				System.out.println("hiiiii" + authority.getAuthority());
			}
		}
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getUsername(),
				request.getPassword());

		try {
			Authentication authenticationDetails = manager.authenticate(authToken);
			LogedInUserDto dto = adminService.getByUsername(request.getUsername());
			return ResponseEntity.ok(new JwtResponse(jwtUtils.generateJwtToken(authenticationDetails), dto));

		} catch (BadCredentialsException e) {
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}

	@PostMapping("/signupadmin")
	public ResponseEntity<?> userRegistration(@RequestBody AdminSignupDto user) {
		Admin admin = mapper.map(user, Admin.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.insertAdmin(admin));
	}

	@PostMapping("/signupstudent")
	public ResponseEntity<?> studentRegistration(@RequestBody CreateStudentDto studentDto) {
		Student student = mapper.map(studentDto, Student.class);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(studentService.insertStudent(student, studentDto.getBatchId()));
	}

	// import sudebt data by excel
	@PostMapping("/students/upload")
	public ResponseEntity<String> uploadExcelFile(@RequestParam("file") MultipartFile file) {
		try {
			studentService.processExcelFile(file);
			return ResponseEntity.status(HttpStatus.OK).body("File Uploaded Successfully!");
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Uploading file!");
		}
	}
}
