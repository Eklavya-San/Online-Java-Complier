package com.app.service;

import com.app.dto.PassworChangedDto;
import com.app.entity.OTP;

public interface IOTPService {

	OTP getUserOTPbyUserName(String userName);

	String updatePassword(PassworChangedDto dto);

}
