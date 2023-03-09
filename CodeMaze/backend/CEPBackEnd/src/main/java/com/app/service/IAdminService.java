package com.app.service;

import java.util.List;

import com.app.dto.ForgotPasswordAdminDto;
import com.app.dto.LoginDto;
import com.app.dto.UpdateAdminDto;
import com.app.entity.Admin;

public interface IAdminService {

	List<Admin> getAll();
	
	Admin getByAdminId(Long id);

	Admin insertAdmin(Admin transientAdmin);

	String deleteAdmin(Long id);

	Admin editAdmin(Long adminId,UpdateAdminDto detachedAdmin);

	Admin authenticateAdmin(LoginDto logDtoAdmin);

	Admin getAdminPassword(ForgotPasswordAdminDto adminDetails);

}
