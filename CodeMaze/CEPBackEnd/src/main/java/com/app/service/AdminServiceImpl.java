package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exception.ResourceNotFoundException;
import com.app.dto.ForgotPasswordAdminDto;
import com.app.dto.LoginDto;
import com.app.dto.UpdateAdminDto;
import com.app.entity.Admin;
import com.app.repository.IAdminRepository;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {
	@Autowired
	private IAdminRepository adminRepo;

	@Override
	public List<Admin> getAll() {
		return adminRepo.findAll();
	}

	@Override
	public Admin getByAdminId(Long id) {
		return adminRepo.findById(id).get();
	}

	@Override
	public Admin insertAdmin(Admin traAdmin) {
		return adminRepo.save(traAdmin);
	}

	@Override
	public String deleteAdmin(Long id) {
		if (adminRepo.existsById(id)) {
			adminRepo.deleteById(id);
			return "Admin Succesfully Deleted";
		}
		return "Admin Deletion Failed : Invalid Id";
	}

	@Override
	public Admin editAdmin(Long id, UpdateAdminDto detachedAdmin) {
		if (adminRepo.existsById(id)) {
			Admin upAdmin = getByAdminId(id);
			upAdmin.setAdminEmail(detachedAdmin.getAdminEmail());
			upAdmin.setAdminFirstname(detachedAdmin.getAdminFirstname());
			upAdmin.setAdminLastname(detachedAdmin.getAdminLastname());
			return adminRepo.save(upAdmin);
		}
		throw new ResourceNotFoundException("Invalid Admin Id : Updation Failed");
	}

	@Override
	public Admin authenticateAdmin(LoginDto logDtoAdmin) {
		return adminRepo.findByAdminEmailAndAdminPassword(logDtoAdmin.getEmail(), logDtoAdmin.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Admin Credentials !"));
	}

	@Override
	public Admin getAdminPassword(ForgotPasswordAdminDto adminDetails) {
		return adminRepo
				.findByAdminEmailAndAdminFirstnameAndAdminLastname(adminDetails.getEmail(), adminDetails.getFirstname(),
						adminDetails.getLastname())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Admin Credentials ! Admin Not Exist"));
	}

}
