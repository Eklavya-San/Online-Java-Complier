package com.app.entity;

import java.util.Random;

public class OTPGenerator {

	public static String OTP() {
		// Using numeric values
		String numbers = "0123456789";

		// Using random method
		Random rndm_method = new Random();

		String otp = "";

		for (int i = 0; i < 6; i++) {
			otp += numbers.charAt(rndm_method.nextInt(numbers.length()));
		}
		return otp;
	}

}
