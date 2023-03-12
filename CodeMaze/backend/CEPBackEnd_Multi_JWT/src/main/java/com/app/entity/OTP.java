package com.app.entity;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "one_time_password_table")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OTP {
	@Id
	private String userName;
	@Column(name = "one_time_password")
	private String otp;
	@Column(name = "otp_expiration_time")
	private LocalTime time;

	public OTP(String userName, String otp) {
		super();
		this.userName = userName;
		this.otp = otp;
		this.time = LocalTime.now().plusMinutes(1);
	}
}
